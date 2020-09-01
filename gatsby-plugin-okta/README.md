<h1 align="center">gatsby-plugin-okta</h1>

<p align="center">
  <strong>A Gatsby theme for adding Okta to your application.</strong>
</p>

## Quick Start

```shell
mkdir my-site
cd my-site
yarn init
# install gatsby-plugin-okta and it's dependencies
yarn add gatsby react react-dom gatsby-plugin-okta
```

Then add the theme to your `gatsby-config.js`. We'll use the long-form
here for educational purposes.

```javascript
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-okta",
      options: {},
    },
  ],
}
```

That's it, you can now run your gatsby site using

```shell
yarn gatsby develop
```

Note that this site doesn't _do_ anything, so you're seeing a missing
resources error. Create a simple page in `src/pages/index.js` to see a
page on the root url.

```jsx
import React from "react"

export default function Home() {
  return <div>My Site!</div>
}
```