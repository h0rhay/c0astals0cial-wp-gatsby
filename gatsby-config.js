module.exports = {
  siteMetadata: {
    title: `Coastal Social WP Gatsby Starter`,
    description: `A lovely starter for a marketing website with a WP backend`,
    author: `@h0rhay`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-helmet`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: `gatsby-plugin-sharp`
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#1E90FF`,
        theme_color: `#1E90FF`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpcontent`,
        // GraphQL endpoint, relative to your WordPress home URL.
        url: `http://c0astals0cial.atwebpages.com/graphql`,
        // GraphQL endpoint using env variable
       // url: "${process.env.WORDPRESS_URL}/graphql",
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
