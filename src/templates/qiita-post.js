import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Post from '../components/post'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class QiitaPostTemplate extends React.Component {
  render() {
    const post = this.props.data.qiitaPost
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}>
        <Post
          fields={post.fields}
          html={post.rendered_body}
          siteTitle={siteTitle}
          user={post.user}
          pageContext={this.props.pageContext}
        />
      </Layout>
    )
  }
}

export default QiitaPostTemplate

export const pageQuery = graphql`
  query QiitaPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    qiitaPost(fields: { slug: { eq: $slug } }) {
      rendered_body
      fields {
        slug
        title
        excerpt
        date
      }
      user {
        id
        profile_image_url
        description
      }
    }
  }
`
