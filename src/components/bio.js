/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          description
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social, description } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: '4.375rem'
      }}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: '0.875rem',
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`
        }}
        imgStyle={{
          borderRadius: `50%`
        }}
      />
      <div>
        <p
          style={{
            margin: 0
          }}>
          A blog by <a href={`https://twitter.com/${social.twitter}`}>{author.name}</a>.
        </p>
        <p
          style={{
            margin: 0
          }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default Bio
