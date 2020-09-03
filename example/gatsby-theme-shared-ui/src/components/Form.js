import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/core'

export default function Form(authService) {
  const { handleSubmit, errors, register, formState } = useForm()
  const [sessionToken, setSessionToken] = useState()

  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error || true
  }

  function onSubmit(values) {
    console.log(authService)
    authService
      .login({ values })
      .then((res) => {
        const sessionToken = res.sessionToken
        setSessionToken(sessionToken)
        // sessionToken is a one-use token, so make sure this is only called once
        authService.redirect({ sessionToken })
      })
      .catch((err) => console.log('Found an error', err))
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
    }, 1000)
  }

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Username:</FormLabel>
        <Input
          name="name"
          placeholder="name"
          ref={register({ required: true, validate: validateName })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl itemType="password" isInvalid={errors.password}>
        <FormLabel htmlFor="name">Password:</FormLabel>
        <Input
          name="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        variantColor="teal"
        isLoading={formState.isSubmitting}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
