import { Auth } from "../../containers/Auth"

export const SignInButton: React.FC = () => {
  const { signInWithGoogle } = Auth.useContainer()
  const { user } = Auth.useContainer()

  return (
    <>
      {!user && (
        <div className="flex flex-col justify-center mx-2">
          <button
            onClick={signInWithGoogle}
            className="cw-button color-shift p-2 hover:bg-stone-300"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </>
  )
}
