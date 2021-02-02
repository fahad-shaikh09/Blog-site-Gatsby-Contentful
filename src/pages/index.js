import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image";
import styled from "styled-components";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"


const Post = styled.div`
  display: flex;
`
const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`
const PostText = styled.div`
  flex: 75%;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title || post.node.slug
          console.log("post var:", post)
          return (
            <Post >
              <PostImage>
                <Img fluid={post.node.image.fluid} />
              </PostImage>

              <PostText>
                <li key={post.node.slug} style={{margin: 50}}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2 style={{marginTop: -30,marginLeft: -30}}>
                        <Link to={post.node.slug} itemProp="url" >
                          <span itemProp="headline"  >{title.toUpperCase() }</span>
                        </Link>
                      </h2>
                    </header>
                    <section>

                    </section>
                  </article>
                </li>
              </PostText>
            </Post>)
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost{
      edges {
       node  {
         title
         slug
         createdAt
         author
         image {
           fluid {
           ...GatsbyContentfulFluid
           }
         }
       }
     }
   }
  }
`
