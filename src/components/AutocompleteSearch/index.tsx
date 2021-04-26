import _ from 'lodash'
import React from 'react'
import { Search } from 'semantic-ui-react'
import { gql, useQuery } from '@apollo/client'
import {useHistory} from 'react-router-dom'

const ALL_SNAPSHOTS = gql`
query {
  allSnapshots{
    ticker
    name
  }
}
`

const initialState = {
  loading: false,
  results: [],
  value: '',
}

enum ActionType {
  "CLEAN_QUERY" = 0,
  "START_SEARCH" = 1,
  "FINISH_SEARCH" = 2,
  "UPDATE_SELECTION" = 3
}

interface CompanyResultType {
  title: string
  description: string
}

interface ReducerActionBase {
  type: ActionType;
}

interface ReducerActionCleanQuery extends ReducerActionBase {
  type: ActionType.CLEAN_QUERY;
}

interface ReducerActionStartSearch extends ReducerActionBase {
  type: ActionType.START_SEARCH;
  query: string;
}

interface ReducerActionFinishSearch extends ReducerActionBase {
  type: ActionType.FINISH_SEARCH;
  results: Array<CompanyResultType>;
}

interface ReducerActionUpdateSelection extends ReducerActionBase {
  type: ActionType.UPDATE_SELECTION;
  selection: string;
}

type ReducerAction = ReducerActionStartSearch | ReducerActionFinishSearch | ReducerActionUpdateSelection | ReducerActionCleanQuery;


interface ReducerState {
  loading: boolean;
  results: Array<CompanyResultType>;
  value: string;
}

let savedCompanySnapshots:CompanyResultType[] = []

function exampleReducer(state: ReducerState, action: ReducerAction) {
  switch (action.type) {
    case ActionType.CLEAN_QUERY:
      return initialState
    case ActionType.START_SEARCH:
      return { ...state, loading: true, value: action.query }
    case ActionType.FINISH_SEARCH:
      return { ...state, loading: false, results: action.results }
    case ActionType.UPDATE_SELECTION:
      console.log(`Selecton ${action.selection}`)
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function AutocompleteSearch() {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState)
  const allSnapshotsResult = useQuery(ALL_SNAPSHOTS)
  const history = useHistory()
  let snapshotErrorLogged = false
  const { loading, results, value } = state
  

  if ((savedCompanySnapshots.length === 0) && !allSnapshotsResult.loading)
  {
    if (allSnapshotsResult.error){
      if (!snapshotErrorLogged)
      {
        console.log(`Couldn't fetch company snapshots. Error ${allSnapshotsResult.error.message}`)
        snapshotErrorLogged = true
      }
    }
    else{
      savedCompanySnapshots = allSnapshotsResult.data.allSnapshots.map((c:any) => ({title:c.ticker, description:c.name}))
    }
  }

  const timeoutRef = React.useRef<number>()
  const handleSearchChange = React.useCallback((_e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: ActionType.START_SEARCH, query: data.value })

    timeoutRef.current = window.setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: ActionType.CLEAN_QUERY })
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result : any) => re.test(result.title)

      dispatch({
        type: ActionType.FINISH_SEARCH,
        results: _.filter(savedCompanySnapshots, isMatch),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  

  // Request company snapshots when component first loaded
  React.useEffect(() => {
    //Load Data Here
  }, [])

  return (
    <Search
      loading={loading}
      onResultSelect={(_e, data) =>
        {
          history.push(`/company/${data.result.title}`)
          return dispatch({ type: ActionType.UPDATE_SELECTION, selection: data.result.title })
        }
        
      }
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  )
}

export default AutocompleteSearch