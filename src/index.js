import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import 'semantic-ui-less/semantic.less'
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";
import * as serviceWorker from "./serviceWorker";
import SERVER_URI from "./utils/config.ts"

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: SERVER_URI,
  })
})

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </I18nextProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
