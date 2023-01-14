import { lazy } from "react";
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
import {FULL_COMPANY_DATA} from "./gqlQuery"

import ContactContent from "../../content/ContactContent.json";


const Container = lazy(() => import("../../common/Container"));
const ContactForm = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const FinancialTable = lazy(() => import("../../components/FinancialTable"));
const DcfTools = lazy(() => import("../../components/DcfTools"));

const Company = () => {
  const ticker = useParams().ticker
  const companyDataResponse = useQuery(FULL_COMPANY_DATA, {variables: { ticker }})
  return (
    <Container>
      <DcfTools companyDataResponse={companyDataResponse} ticker={ticker}/>

      <ContentBlock
        type="right"
        title={`${ticker} Fundamentals`}
        content={`Check out the Historical Fundamental Data for ${ticker} below...`}
        icon="product-launch.svg"
        id="mission"
      />
      <FinancialTable companyDataResponse={companyDataResponse}/>

      <ContactForm
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  )
}

export default Company