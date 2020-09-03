import React from 'react'
import { Box, Text, Textarea } from '@chakra-ui/core'

export default function TextArea({ name, padding, children }) {
  return (
    <>
      <Text as="h4" fontWeight="bold">
        {name}
      </Text>
      <Box
        display="flex"
        bg="blue.800"
        position="relative"
        padding={padding}
        borderRadius={10}
        boxSizing="border-box"
        overflow="auto hidden"
        whiteSpace="pre"
        margin="1em 1.5em"
      >
        <Textarea
          border={0}
          bg="gray.700"
          position="absolute"
          whiteSpace="pre-wrap"
          wordBreak="keep-all"
          overflowWrap="break-word"
          left={0}
          top={0}
          right={0}
          bottom={0}
          height="100%"
          color="white"
          paddingTop="1em"
        >
          {children}
        </Textarea>
      </Box>
    </>
  )
}
