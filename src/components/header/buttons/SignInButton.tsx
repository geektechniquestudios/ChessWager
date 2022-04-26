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
            className="color-shift p-2 h-9 rounded-md grid place-content-center color-shift clickable border hover:bg-stone-300 dark:hover:bg-stone-900 hover:text-black hover:border-black dark:hover:text-white dark:hover:border-white border-stone-400 dark:border-stone-500 text-stone-800 dark:text-stone-300"
          >
            Sign in with Google
          </button>
        </div>
      )}
    </>
  )
}
