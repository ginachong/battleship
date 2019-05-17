import React from 'react'
import styled from 'styled-components'
import SignUpForm from './SignUpForm'

const SignUpContainer = styled.div`
  text-align: center;
`

export default function SignUpPage() {
  return (
    <SignUpContainer>
      <SignUpForm></SignUpForm>
    </SignUpContainer>
  )
}
