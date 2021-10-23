import { Auth } from "../../../containers/Auth"
import GoogleSignOut from "./GoogleSignOut"
import GoogleSignIn from "./GoogleSignIn"

const GoogleAuthButtons: React.FC = () => {
  const { user, auth } = Auth.useContainer()
  const photoURL: string = auth.currentUser?.photoURL!

  return (
    <>
      {user ? <GoogleSignOut /> : <GoogleSignIn />}
      <img src={photoURL} alt="" />
    </>
  )
}

export default GoogleAuthButtons
