import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image";
// import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location, pageContext }) => {

  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext



  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.description}
      />
      <Img fluid={post.image.fluid} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
        </header>


        {documentToReactComponents(post.description.json)}
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li >
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate


export const pageQuery = graphql`
  query ContentfulPostBySlug($slug: String!)
   {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: {eq : $slug}){
      title
      author
      image{
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      description {
        json
      }
    }
  }
`