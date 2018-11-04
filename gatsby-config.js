require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter Qiita',
    author: 'Takumon',
    authorDescription: 'Programmer',
    authorImageUrl: 'https://qiita-image-store.s3.amazonaws.com/0/49915/profile-images/1488080194',
    description: 'A starter blog demonstrating with your qiita post.',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-qiita/',
  },
  pathPrefix: '/gatsby-starter-qiita',
  plugins: [
    {
      resolve: `gatsby-source-qiita`,
      options: {
        accessToken: process.env.ACCESS_TOKEN,
        userName: process.env.USER_NAME,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Qiita`,
        short_name: `GatsbyStarterQiita`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
