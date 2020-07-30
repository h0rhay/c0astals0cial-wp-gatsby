const postTemplate = require.resolve('../src/templates/post.js');

const GET_POSTS = `
  query GET_POSTS($first:Int $after:String) {
    wpcontent {
      posts(
        first: $first
        after: $after
        # This will make sure to only get the parent nodes and no children
        where: {
          parent: null
         }
      ) {
        postInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          postId
          content
          uri
          isFrontPage
        }
      }
    }
  }
`

const allPosts = []
let postNumber = 0
const itemsPerPage = 10

/** This is the export which Gatbsy will use to process.
 * @param { actions, graphql }
 * @returns {Promise<void>} */
module.exports = async ({ actions, graphql, reporter }, options) => {

  /** This is the method from Gatsby that we're going
   * to use to create pages in our static site. */
  const { createPost } = actions
  /** Fetch pages method. This accepts variables to alter
   * the query. The variable `first` controls how many items to
   * request per fetch and the `after` controls where to start in
   * the dataset.
   * @param variables
   * @returns {Promise<*>} */
  const fetchPosts = async (variables) =>
    /** Fetch pages using the GET_PAGES query and the variables passed in. */
    await graphql(GET_POSTS, variables).then(({ data }) => {
      /** Extract the data from the GraphQL query results */
      const {
        wpcontent: {
          posts: {
            nodes,
            postInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      /** Map over the pages for later creation */
      nodes
      && nodes.map((posts) => {
        allPosts.push(posts)
      })

      /** If there's another page, fetch more
       * so we can have all the data we need. */
      if (hasNextPage) {
        pageNumber++
        reporter.info(`fetch post ${pageNumber} of posts...`)
        return fetchPosts({ first: itemsPerPage, after: endCursor })
      }

      /** Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand. */
      return allPosts
    })

  /** Kick off our `fetchPosts` method which will get us all
   * the pages we need to create individual pages. */
  await fetchPosts({ first: itemsPerPage, after: null }).then((wpPosts) => {

    wpPosts && wpPosts.map((post) => {
      let pagePath = `${post.uri}`

      /** If the page is the front page, the page path should not be the uri,
       * but the root path '/'. */
      if(post.isFrontPage) {
        postPath = '/'
      }

      createPost({
        path: postPath,
        component: postTemplate,
        context: {
          post: post,
        },
      })

      reporter.info(`post created: ${post.uri}`)
    })

    reporter.info(`# -----> POSTS TOTAL: ${wpPosts.length}`)
  })
}
