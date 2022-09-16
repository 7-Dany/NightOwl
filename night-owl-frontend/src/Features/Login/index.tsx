import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { useState } from 'react'

function LoginMain() {
  /** TODO: Making forget password works
   *  TODO: After new user get created adding way to verify his email or skip for later
   */
  const [login, setLogin] = useState(true)
  return (
    <div>
      {login ? <SignIn setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
    </div>
  )
}

export default LoginMain