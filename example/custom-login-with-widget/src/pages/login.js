import React, { useState, useEffect } from 'react'
import { OktaSignInWidget, config } from 'gatsby-plugin-okta'
import { Box } from '@chakra-ui/core'

const logo = 'https://www.gatsbyjs.com/Gatsby-Monogram.svg'
const widget = OktaSignInWidget({
  config,
  logo,
  title: 'Custom Login with Widget',
})

export default function Login() {
  const [renderWidget, setRenderWidget] = useState(false)
  useEffect(() => {
    if (!renderWidget) {
      widget.renderEl(
        { el: '#sign-in-widget' },
        () => {
          /**
           * In this flow, the success handler will not be called beacuse we redirect
           * to the Okta org for the authentication workflow.
           * but otherwise you can do something like `success(res)` and handle it appropriately
           */
        },
        (err) => {
          throw err
        }
      )
      setRenderWidget(true)
    }
  }, [renderWidget])

  useEffect(() => {
    return () => {
      if (renderWidget) {
        widget.remove()
        setRenderWidget(false)
      }
    }
  }, [renderWidget])

  return (
    <Box>
      <Box id="sign-in-widget" />
    </Box>
  )
}
