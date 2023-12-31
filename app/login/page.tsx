import Login from '@/components/login'
import React from 'react'
import type { Metadata } from 'next'
import { getProviders } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Login | Blog Site',
  description: 'Generated by create next app',
}

const SignIn = async() => {

  const providers = await getProviders();
  return (
    <div>
        <Login providers={providers}/>
    </div>
  )
}

export default SignIn