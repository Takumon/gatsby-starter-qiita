const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const striptags = require('striptags')

const unified = require('unified')
const remarkParse = require('remark-parse')
const remark2rehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')


const POST_TYPE = {
  ORIGINAL: 'original',
  QIITA: 'qiita'
}


// onCreateNodeより後に実行される
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createNodeField } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const qiitaPost = path.resolve('./src/templates/qiita-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    title
                    date
                    excerpt
                  }
                  frontmatter {
                    title
                    date
                  }
                  rawMarkdownBody
                }
              }
            }
            allQiitaPost(sort: { fields: [created_at], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    title
                    date
                    excerpt
                  }
                  id
                  title
                  rendered_body
                  body
                  comments_count
                  created_at
                  likes_count
                  reactions_count
                  tags {
                    name
                  }
                  updated_at
                  url
                  user {
                    id
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // オリジナル記事とQiitaの記事を日付降順で並び替え
        const originalPosts = result.data.allMarkdownRemark.edges.map(p => {
          return {
            type: POST_TYPE.ORIGINAL,
            date: new Date(p.node.frontmatter.date),
            node: p.node
          }
        })

        const qiitaPosts = result.data.allQiitaPost.edges.map(p => {
          return {
            type: POST_TYPE.QIITA,
            date: new Date(p.node.created_at),
            node: p.node
          }
        })

        const posts = [...originalPosts, ...qiitaPosts].sort((a,b) => {
          if( a.date < b.date ) return 1
          if( a.date > b.date ) return -1
          return 0
        })

        // ページ生成
        _.each(posts, ({type, node}, index) => {
          if (type === POST_TYPE.ORIGINAL) {
            createPage({
              path: node.fields.slug,
              component: blogPost,
              context: {
                slug: node.fields.slug,
                ...previouseAndNext(posts, index)
              },
            })
          } else if (type === POST_TYPE.QIITA) {
            createPage({
              path: `/${node.id}/`,
              component: qiitaPost,
              context: {
                slug: `/${node.id}/`,
                ...previouseAndNext(posts, index)
              },
            })
          } else {
            throw new Error(`Unexpected post type = ${type}`)
          }

        })

      })
    )
  })
}

function previouseAndNext(posts, index) {
  return {
    previous: index === posts.length - 1 ? null : posts[index + 1].node,
    next: index === 0 ? null : posts[index - 1].node
  }
}


// createPagesより先に実行される
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type !== `MarkdownRemark` && node.internal.type !== `QiitaPost`) {
    return
  }

  const [slug, title, date, excerpt] =
    node.internal.type === `MarkdownRemark`
      ? [
        createFilePath({ node, getNode }),
        node.frontmatter.title,
        node.frontmatter.date,
        _excerptMarkdown(node.rawMarkdownBody, 120)
      ]
      :[
        `/${node.id}/`,
        node.title,
        node.created_at,
        _excerptHtml(node.rendered_body, 120)
      ]


  createNodeField({
    name: `slug`,
    node,
    value: slug,
  })

  createNodeField({
    name: `title`,
    node,
    value: title,
  })

  createNodeField({
    name: `date`,
    node,
    value: date,
  })

  createNodeField({
    name: `excerpt`,
    node,
    value: excerpt,
  })
}

function _excerptMarkdown(markdown, length) {
  const { contents: html } =
  unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypeStringify)
    .processSync(markdown)

  return _excerptHtml(html, length)
}

function _excerptHtml(html, length) {
  const postContent = striptags(html).replace(/\r?\n/g, '').trim();
  return postContent.length <= length
    ? postContent
    : postContent.slice(0, length) + '...';
}

