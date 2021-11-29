import { Auth } from "../../../containers/Auth"

export const SignOut: React.FC = () => {
  const { user, signOutWithGoogle } = Auth.useContainer()

  return (
    <>
      {user && (
        <button onClick={signOutWithGoogle} className="header-button">
          Sign Out
        </button>
      )}
    </>
  )
}
