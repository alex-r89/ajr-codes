import React from 'react'
import { Link } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0c161d;
    color: #9cb6c9;
    font-family: 'Space Mono', monospace;
    margin-left: auto;
    margin-right: auto;
    max-width: 42rem;
    padding: 2.5rem 1.5rem;
  }
  a {
    color: #c9dbe8;
    transition: color .25s ease;

    :hover{
      color: #7d9db5
    }
  }
  h1 {
    font-size: 3.95285rem;
    line-height: 4.375rem;
    margin-bottom: 2.625rem;
    margin-top: 0px;
  }
  h3 {
    margin-top: 0;
  }
  blockquote {
    padding-left: 1.42188rem;
    border-left: 0.32813rem solid #5588af;
  }
  hr {
    border: 1px solid #5588af;
    border-radius: 0.25rem;
  }
  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.75rem;
  }
  small {
    color: #80c8ff
  }
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    )
  }
  return (
    <>
      <GlobalStyle />
      <header>{header}</header>
      <main>{children}</main>
      {location.pathname !== rootPath && (
        <footer>
          <Link to={`/`}>← Home</Link>
        </footer>
      )}
    </>
  )
}

export default Layout
