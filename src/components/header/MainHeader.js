import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "../../style/header.css"


const Header = ({ user, auth }) => {
  return (
    <>
      <div id="auth-buttons">{user ? <SignOut auth={auth}/> : <SignIn auth={auth}/>}</div>
    </>
  )
}

function SignIn({auth}) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithRedirect(provider).then((_, error) => {
      console.log(error)
    })
  }

  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

function SignOut({auth}) {
  return (
    <>
      {auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </>
  )
}

export default Header
