const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  //Fetching data from Contentful in var result
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
              json
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

  // posts is an array of posts fetched from Contentful
  const posts = result.data.allContentfulPost.edges


  if (posts.length > 0) {
    // console.log("posts[0].node:", posts[0].node)
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

