# Gatsby Theme Okta Example

A usage of
[gatsby-plugin-okta](https://github.com/jasonnoahchoi/gatsby-plugin-okta)
that does nothing but use the theme. As a result you will see `Error: Missing resources for /` when navigating to `http://localhost:8000`. To get
rid of that, create a page in `src/pages/index.js`.


## Getting Started

```sh
cp .env.development.example .env.development
```

Fill in your information from the Okta admin dashboard. Steps can be found here:

[Create Okta Application](https://developer.okta.com/docs/guides/sign-into-spa/react/create-okta-application/)

Instead of `http://localhost:8080` as written in the directions, use `http://localhost:8000` since this is what gatsby typically runs on. Same goes for the `http://localhost:xxxx/implicit/callback`.

## Goals

Surprisingly, there are not many tutorials out there that show you how to setup Okta + Gatsby. I hope that this is a decent starting point to help jump start this movement. Okta is used frequently for in-house employees, but I foresee a huge uptick in consumer app users that will be using Okta login as awareness picks up more.

