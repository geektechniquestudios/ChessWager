import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "../style/header.css"

const auth = firebase.auth()

const Header = ({ user }) => {
  return( 
    <>
    <div id="auth-buttons">
      {user ? <SignOut /> : <SignIn />}
    </div>
    </>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default Header
