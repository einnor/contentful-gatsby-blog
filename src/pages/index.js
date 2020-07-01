import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image";
import styled from "styled-components";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Post = styled.div`
  display: flex;
`;

const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`;

const PostText = styled.div`
  flex: 75%;
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulPost.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        return (
          <article key={node.slug}>
            <Post>
              <PostImage>
                <Img fluid={node.image.fluid} />
              </PostImage>
              <PostText>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.slug}>
                    {title}
                  </Link>
                </h3>
                {/* <small>{node.date}</small> */}
                <p>{node.subtitle}</p>
              </PostText>
            </Post>
            <section>
              {/* <p
                dangerouslySetInnerHTML={{
                  __html: node.subtitle,
                }}
              /> */}
            </section>
          </article>
        )
      })}
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
    allContentfulPost {
      edges {
        node {
          id
          slug
          title
          subtitle
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
