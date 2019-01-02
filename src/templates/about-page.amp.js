import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout.amp'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageAmpTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
  
}

AboutPageAmpTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPageAmp = ({ data }) => {
  const { markdownRemark: post } = data
  
  return (
    <Layout>
      <Helmet title={`About`}>
      </Helmet>
      <AboutPageAmpTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
  
}

AboutPageAmp.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPageAmp

export const aboutPageAmpQuery = graphql`
  query AboutPageAmp($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
