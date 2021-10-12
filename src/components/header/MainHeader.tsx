import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"
import { AuthContainer } from "../containers/Auth"

const firestore = firebase.firestore()

const Header: React.FC = () => {
  const {user, auth} = AuthContainer.useContainer()
  const photoURL: string = auth.currentUser?.photoURL!
  return (
    <>
      {/* @todo: logo, metamaks login */}
      <div id="auth-buttons">
        <span>
          {user ? <SignOut auth={auth} /> : <SignIn auth={auth} />}
          <img src={photoURL} alt="" />
        </span>
      </div>
    </>
  )
}

interface SignInProps {
  auth: firebase.auth.Auth
}

const SignIn = ({ auth }: SignInProps) => {
  const addToUsers = () => {
    if (auth.currentUser) {
      const usersCollectionRef = firestore.collection("users")
      const userDoc = usersCollectionRef.doc(auth.currentUser.uid)
      userDoc.get().then(docSnapshot => {
        if (!docSnapshot.data()) {
          userDoc.set({
            followThrough: [0, 0],
            blocked: [],
          }).catch(console.error)
        }
      })
    }
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider).then(() => {addToUsers()})
      .catch(console.error)
  }

  return <button onClick={signInWithGoogle}>Sign in with Google</button>
}

const SignOut = ({ auth }: SignInProps) => {
  return (
    <>
      {auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </>
  )
}

export default Header
