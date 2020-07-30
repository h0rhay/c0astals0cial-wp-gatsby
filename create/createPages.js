const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      wpcontent {
        pages {
          nodes {
            uri
            content
          }
        }
      }
    }
  `)
  const pagesData = result.data.wpcontent.pages.nodes
  pagesData.forEach((page) => { 
    createPage({
      path: page.uri,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        page: page,
        slug: page.uri
      }
    })
  })
}
