import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import get from 'lodash/get'

import Author from '../components/Author'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

class QiitaPostTemplate extends React.Component {
  render() {
    const post = this.props.data.qiitaPost
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.fields.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout
        location={this.props.location}
        siteTitle={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.title} | ${siteTitle}`}
          link={[
            {
              rel: 'stylesheet',
              href :'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css'
            }
          ]}
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
          name={post.user.id}
          description={post.user.description}
          imageUrl={post.user.profile_image_url}
          />

        <div dangerouslySetInnerHTML={{ __html: post.rendered_body }} />
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
