import React from "react"
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"
import { withPrefix } from "gatsby"

export default function BlogPost({ data, pageContext, location }) {
  const { previousPost, nextPost } = pageContext
  const post = data.markdownRemark
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null
  const hero = data.site.siteMetadata.siteUrl && withPrefix(image.src)

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={image}
        pathname={location.pathname}
      />
      <main
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Link
          to="/blog/"
          css={css`
            margin-bottom: ${rhythm(1)};
          `}
        >
          ← Back
        </Link>
        <article>
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.date}</h2>
          <img src={hero}></img>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>  
      </main>
      <nav
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: ${rhythm(3)};
          margin-bottom: ${rhythm(3)};
        `}
      >
        <div>
          {previousPost && (
            <Link
              to={`/blog${previousPost.slug}`}
              rel="prev"
              style={{ marginRight: 20 }}
            >
              ← {previousPost.title}
            </Link>
          )}
        </div>
        <div>
          {nextPost && (
            <Link to={`/blog${nextPost.slug}`} rel="next">
              {nextPost.title} →
            </Link>
          )}
        </div>
      </nav>
      <Helmet>
        <script async>
            var childs = document.getElementsByClassName('task-list-item');
            var parentElement = childs[0].parentNode;
            parentElement.classList.add('task-list');
        </script>
      </Helmet>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        image: featured {
          childImageSharp {
            resize(width: 1200, height: 630, jpegQuality: 100) {
              src
              height
              width
            }
          }
        }
      }
    } 
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`