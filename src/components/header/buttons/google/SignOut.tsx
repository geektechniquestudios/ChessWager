import { Auth } from "../../../containers/Auth"

export const SignOut: React.FC = () => {
  const { user, auth } = Auth.useContainer()
  return (
    <>
      {user && (
        <button onClick={() => auth.signOut()} className="header-button">
          Sign Out
        </button>
      )}
    </>
  )
}
