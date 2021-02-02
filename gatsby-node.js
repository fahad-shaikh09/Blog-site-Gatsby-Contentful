const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(
    `
      {
        allContentfulPost{
          edges {
           node  {
             title
             slug
             createdAt
             description {
              raw
                    }
             author
             image {
               fluid {
               src
               }
             }
           }
         }
       }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return result
  }

  const posts = result.data.allContentfulPost.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    console.log("posts[0].node:", posts[0].node)
    posts.forEach((post, index) => {
      const previous = index === 0 ? null : posts[index - 1].node
      const next = index === posts.length - 1 ? null : posts[index + 1].node

      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })
  }
}

