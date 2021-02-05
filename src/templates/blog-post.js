import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image";
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location, pageContext }) => {

  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = pageContext

  // console.log("data prop:", data)
  // console.log("previous var:", previous)
  // console.log("next var:", next)
  const firstRichContent = data.contentfulPost
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="heading1">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="heading2">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="heading3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="heading4">{children}</h4>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
        <img alt="car" src={`https:${node.data.target.fields.file["en-US"].url}`} />
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="copy">{children}</p>
      ),
    },
    renderMark: {},
  }
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

       {/* { console.log("post.description.json:",post.description.json.content[0].content[0].value)} */}
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.description.json.content[0].content[0].value}}
          itemProp="articleBody"
        /> */}
        
        {documentToReactComponents(firstRichContent.description.json, options)}
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