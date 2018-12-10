import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Home`}>
          <link rel="canonical" href={`Home`} /> // ⚡ Add canonical
        </Helmet>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Hi people</h1>
              <p>
                This is an example site integrating Netlify’s form handling with Gatsby
              </p>

              <h2>Test123</h2>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
