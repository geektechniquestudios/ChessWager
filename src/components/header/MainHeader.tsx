import React from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "../../style/header.css"

const firestore = firebase.firestore()

interface HeaderProps {
  user: firebase.User | null | undefined
  auth: firebase.auth.Auth
}

const Header: React.FC<HeaderProps> = ({ user, auth }) => {
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
          console.log("new user, creating db entry")
          userDoc.set({
            followThrough: [0, 0],
            blocked: [],
          })
        } else {
          console.log("user already in db")
        }
      })

      // const query = userRef.where("userId", "==", auth.currentUser?.uid)
    }
  }

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth
      .signInWithRedirect(provider)
      .catch(console.log) //@todo make better message in prod
    //addToUsers() @todo this isn't working. Might scrap
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
