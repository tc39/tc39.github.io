import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PageMenu from '../components/PageMenu'
import './index.css'

const Layout = ({children, data}) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {name: 'description', content: 'Sample'},
        {name: 'keywords', content: 'sample, something'},
        {name: 'charset', content: 'UTF-8"'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'theme-color', content: '#FA7C23'},
      ]}
      htmlAttributes={{
        lang: data.site.siteMetadata.lang,
      }}
    />
    <PageMenu />
    {children()}
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query siteMetadataQuery {
    site {
      siteMetadata {
        title,
        lang
      }
    }
  }
`
