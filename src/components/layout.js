import React from 'react'
import { Link } from 'gatsby'

import '../css/qiita-code-block.css';
import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children, siteTitle } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            minHeight: `8rem`,
            fontSize: `3rem`,
            padding: `1rem`,
            margin: `-1rem -1rem 2rem -1rem`,
            background: '#55c500',
            borderRadius: '4px',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              color: 'white',
              textDecoration: 'none',
            }}
            to={'/'}
          >
            {siteTitle}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
          {siteTitle}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <a href="https://github.com/Takumon/gatsby-starter-qiita">
          <img
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 0
            }}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
            alt="Fork me on GitHub" />
        </a>
        {header}
        {children}
      </div>
    )
  }
}

export default Template
