module.exports = {
  siteMetadata: {
    title: 'Joshua Schmidt',
    description: 'This blog / portfolio website was built with Gatsby, and Netlify CMS. It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            }
          }
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-purgecss', // must be after other CSS plugins
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: [
          "Content-Security-Policy: object-src 'none'; font-src 'self'; report-uri https://joshuaschmidt.report-uri.com/r/d/csp/enforce;",
          "Referrer-Policy: same-origin",
          "Feature-Policy: camera 'none'; geolocation 'none';",
          "Cache-Control: public, max-age=604800",
        ],
      },
    },
    { // PWA STUFF
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Joshua Schmidt',
        short_name: 'Joshua',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icon: 'static/img/app_icon_512.png', // This path is relative to the root of the site.
        legacy: true, // for apple touch icons < iOS 11.3
      },
    },
    'gatsby-plugin-offline',
    { // AMP.
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['*.html', '/blog/*.html', '/about/*.html', '/404/*.html', '/blog/*.html', '/projects/*.html', '/tags/*.html',],
        dist: 'public/amp'
      }
    }
  ],
}
