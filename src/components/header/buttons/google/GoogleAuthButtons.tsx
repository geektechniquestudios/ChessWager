import { Auth } from "../../../containers/Auth"
import { SignOut } from "./SignOut"
import { SignIn } from "./SignIn"

export const GoogleAuthButtons: React.FC = () => {
  const { user, auth } = Auth.useContainer()
  const photoURL: string = auth.currentUser?.photoURL!

  return (
    <>
      {user ? <SignOut /> : <SignIn />}
      <img src={photoURL} alt="" className="user-img" />
    </>
  )
}
