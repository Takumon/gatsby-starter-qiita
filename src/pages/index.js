import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Author from '../components/Author'
import Layout from '../components/layout'
import PostPreview from '../components/post-preview'
import { rhythm } from '../utils/typography'


class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    // マージして降順で並び替え
    // gatsby-node.jsで2つのノードに共通のfieldsを追加しているため条件分岐なし
    const posts = [...get(this, 'props.data.allMarkdownRemark.edges'), ...get(this, 'props.data.allQiitaPost.edges')].sort((a,b) => {
      if( a.node.fields.date < b.node.fields.date ) return 1
      if( a.node.fields.date > b.node.fields.date ) return -1
      return 0
    })

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}
        >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Author
          name={this.props.data.site.siteMetadata.author}
          description={this.props.data.site.siteMetadata.authorDescription}
          imageUrl={this.props.data.site.siteMetadata.authorImageUrl}
          />
        {posts.map(({ node }) => {
          // gatsby-node.jsで2つのノードに共通のfieldsを追加しているため条件分岐なし
          const post = {
            title: node.fields.title || node.fields.slug,
            date: node.fields.date,
            slug: node.fields.slug,
            excerpt: node.fields.excerpt,
          }
          return <PostPreview key={node.fields.slug} post={post} />
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        authorDescription
        authorImageUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            title
            date
            excerpt
          }
        }
      }
    }
    allQiitaPost(sort: { fields: [created_at], order: DESC }) {
      edges {
        node {
          fields {
            slug
            title
            date
            excerpt
          }
        }
      }
    }
  }
`
