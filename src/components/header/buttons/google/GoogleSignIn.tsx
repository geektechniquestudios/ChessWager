import { Auth } from "../../../containers/Auth"
import { Firestore } from "../../../containers/Firestore"
import firebase from "firebase/compat/app"

const SignIn: React.FC = () => {
  const { firestore } = Firestore.useContainer()
  const { auth } = Auth.useContainer()

  const addToUsers = () => {
    if (auth.currentUser) {
      const usersCollectionRef = firestore.collection("users")
      const userDoc = usersCollectionRef.doc(auth.currentUser.uid)
      userDoc.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          userDoc
            .set({
              betAcceptedCount: 0,
              betFundedCount: 0,
              blocked: [],
            })
            .catch(console.error)
        }
      })
    }
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then(() => {
        addToUsers()
      })
      .catch(console.error)
  }

  return <button onClick={signInWithGoogle} className="header-button">Sign in with Google</button>
}

export default SignIn
