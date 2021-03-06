import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

const NotFoundPageAmp = () => (
  
  <Layout>
    <Helmet title={`404`}>
      {/*<link rel="amphtml" href={`/amp/404`} />
      <link rel="canonical" href={`404`} />*/} {/*⚡ Add canonical */}
    </Helmet>
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
  
)

export default NotFoundPageAmp
