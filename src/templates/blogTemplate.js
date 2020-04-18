import React from "react"
import { graphql } from "gatsby"

// https://www.gatsbyjs.org/docs/adding-markdown-pages/#create-a-page-template-for-the-markdown-files

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

// https://www.gatsbyjs.org/docs/adding-markdown-pages/
// The result of the query is injected by Gatsby into the Template component as data. markdownRemark is the property that you’ll find has all the details of the Markdown file. You can use that to construct a template for your blog post view. Since it’s a React component, you could style it with any of the recommended styling systems in Gatsby.
// https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/#writing-the-graphql-query
// The underlying query name BlogPostByPath (note: these query names need to be unique!) will be injected with the current path, e.g. the specific blog post we are viewing. This path will be available as $path in your query.
// markdownRemark will be the injected property available via the prop data, as named in the GraphQL query. Each property you pull via the GraphQL query will be available under this markdownRemark property. For example, to access the transformed HTML, you would access the data prop via data.markdownRemark.html.
// frontmatter, is of course the data structure we provided at the beginning of the Markdown file. Each key you define there will be available to be injected into the query.
// the GraphQL query takes place at build time. The component is injected with the data prop that is seeded by the GraphQL query. Unless anything dynamic (e.g. logic in componentDidMount, state changes, etc.) occurs, this component will be pure, rendered HTML generated via the React rendering engine, GraphQL, and Gatsby

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
