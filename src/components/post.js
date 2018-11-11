import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import moment from 'moment';

import Author from './author'
import { rhythm, scale } from '../utils/typography'


const DATE_FORMAT = 'YYYY/MM/DD'

class Post extends React.Component {

  render() {
    const {
      fields,
      html,
      siteTitle,
      user,
      pageContext: {
        previous,
        next
      }
    } = this.props


    const formattedDate  = moment(fields.date).format(DATE_FORMAT)


    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'ja' }}
          meta={[{ name: 'description', content: fields.excerpt }]}
          title={`${fields.title} | ${siteTitle}`}
          link={[
            {
              rel: 'stylesheet',
              href :'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css'
            }
          ]}
        />

        <h1>{fields.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {formattedDate}
        </p>

        {(() => {
          return !!user
            ? <Author name={user.id}
                      description={user.description}
                      imageUrl={user.profile_image_url}/>
            : null
        })()}

        <div dangerouslySetInnerHTML={{ __html: html }} />
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
      </div>
    )
  }
}

export default Post
