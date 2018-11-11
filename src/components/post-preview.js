import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment';

import { rhythm } from '../utils/typography'

const DATE_FORMAT = 'YYYY/MM/DD'

class PostPreview extends React.Component {


  render() {
    const {
      title,
      date,
      excerpt,
      slug,
    } = this.props.post;

    const formattedDate  = moment(date).format(DATE_FORMAT)

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
        <small>{formattedDate}</small>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    )
  }
}

export default PostPreview
