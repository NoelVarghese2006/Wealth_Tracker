import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div>
        <Link to={"/signup"}>
            Create an account?
        </Link>
    </div>
  )
}

export default LoginPage