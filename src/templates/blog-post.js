import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Author from '../components/Author'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.fields.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}
        >
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.fields.title} | ${siteTitle}`}
        />
        <h1>{post.fields.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.fields.date}
        </p>
        <Author
          name={this.props.data.site.siteMetadata.author}
          description={this.props.data.site.siteMetadata.authorDescription}
          imageUrl={this.props.data.site.siteMetadata.authorImageUrl}
          />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {
              previous &&
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.fields.title}
              </Link>
            }
          </li>
          <li>
            {
              next &&
              <Link to={next.fields.slug} rel="next">
              {next.fields.title} →
              </Link>
            }
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author
        authorDescription
        authorImageUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        title
        excerpt
        date
      }
    }
  }
`
