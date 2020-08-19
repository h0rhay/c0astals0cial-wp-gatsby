//src/templates/pages/index.js

import React  from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Page = ({ pageContext }) => {
  const { title, content } = pageContext.page
  return (
    <Layout>
      <SEO title={title} />

      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}} />

    </Layout>
  )
}

export default Page