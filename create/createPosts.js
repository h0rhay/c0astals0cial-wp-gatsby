const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      wpcontent {
        posts {
          nodes {
            id
            uri
            title
            content
          }
        }
      }
    }
  `)
  const postsData = result.data.wpcontent.posts.nodes
  postsData.forEach((post) => { 
    createPage({
      path: post.uri,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        post: post,
        slug: post.uri
      }
    })
  })
}
