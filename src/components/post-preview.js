import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'

class PostPreview extends React.Component {
  render() {
    const {
      title,
      date,
      excerpt,
      slug,
    } = this.props.post;

    return (
      <div key={slug}>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: 'none' }} to={slug}>
            {title}
          </Link>
        </h3>
        <small>{date}</small>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    )
  }
}

export default PostPreview
