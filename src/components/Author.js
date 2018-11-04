import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Author extends React.Component {
  render() {
    const {
      name,
      description,
      imageUrl,
    } = this.props

    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            borderRadius: rhythm(1),
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <div>
          <div style={{
            marginTop: rhythm(0.1),
            fontSize: rhythm(0.6),
            lineHeight: rhythm(0.6)
          }}>{name}</div>
          <div style={{
            fontSize: rhythm(0.5),
            marginTop: '4px',
            lineHeight: rhythm(0.5),
            opacity: '0.5',
          }}>{description}</div>
        </div>
      </div>
    )
  }
}

export default Author
