//src/templates/posts/index.js

import React  from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Post = ({ pageContext }) => {
  const { title, content } = pageContext.post
  return (
    <Layout>
      <SEO title={title} />

      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}} />

    </Layout>
  )
}

export default Post