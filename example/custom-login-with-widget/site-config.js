const path = require('path')
const packageJson = require('./package.json')

module.exports = {
  appName: `${packageJson.name}`,
  appVersion: `${packageJson.version}`,
  siteTitle: 'Custom Login with Widget',
  siteTitleShort: 'Custom login',
  siteDescription: '',
  siteUrl: '',
  sourceUrl:
    'https://github.com/jasonnoahchoi/gatsby-plugin-okta/tree/master/example/custom-login-with-widget',
  themeColor: '#252729',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'src/images/icons/logo-black.svg'),
  social: {
    twitter: 'jasonnoahchoi',
  },
}
