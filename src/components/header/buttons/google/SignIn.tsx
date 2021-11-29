import { Auth } from "../../../containers/Auth"

export const SignIn: React.FC = () => {
  const { signInWithGoogle } = Auth.useContainer()

  return (
    <button onClick={signInWithGoogle} className="header-button">
      Sign in with Google
    </button>
  )
}
