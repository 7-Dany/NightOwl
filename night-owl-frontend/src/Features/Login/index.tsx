import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { useState } from 'react'

function Login() {
  const [login, setLogin] = useState(false)
  return (
    <div>
      {login ? <SignUp setLogin={setLogin} /> : <SignIn setLogin={setLogin} />}
    </div>
  )
}

export default Login