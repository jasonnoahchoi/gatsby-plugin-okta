# gatsby-theme-shared-ui
- A local gatsby theme that allows the example projects to have access to a shared repo of components. For more information on how to use Gatsby themes, please go to https://www.gatsbyjs.com/docs/themes/.

Custom Login with Widget takes advantage of [shadowing](https://www.gatsbyjs.com/docs/themes/shadowing/) which allows a project to override the component in the gatsby theme. 

This can be found in this [folder source](../custom-login-with-widget/src/gatsby-theme-shared-ui/) 


## Project Layout
```text
├── gatsby-theme-shared-ui
│   ├── src
│       ├── components
│           ├── Form.js
│           ├── Header.js
│           ├── layout.js
│           ├── Link.js
│           ├── PrivateRoute.js
│           ├── Table.js
│           ├── TextArea.js
│   ├── index.js
│   ├── README.md
│   ├── package.json
```

## Dependencies
- @chakra-ui/core
- @emotion/core
- emotion-theming
- gatsby
- gatsby-plugin-chakra-ui
- gatsby-plugin-okta
- react
- react-dom
- react-hook-form