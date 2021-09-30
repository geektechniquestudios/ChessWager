import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "../../style/header.css"

interface HeaderProps {
    user: firebase.User | null | undefined
    auth: firebase.auth.Auth
}

const Header: React.FC<HeaderProps> = ({ user, auth }) => {
  return (
    <>
      <div id="auth-buttons">{user ? <SignOut auth={auth}/> : <SignIn auth={auth}/>}</div>
    </>
  )
}


interface SignInProps {
  auth: firebase.auth.Auth
}

const SignIn = ({auth}: SignInProps) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithRedirect(provider)
  }

  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

const SignOut = ({auth}: SignInProps) => {
  return (
    <>
      {auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </>
  )
}

export default Header
