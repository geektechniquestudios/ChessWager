import { Auth } from "../../containers/Auth"
import firebase from "firebase/compat"
import { MdThumbDown } from "react-icons/md"
const firestore = firebase.firestore()

interface Props {
  user1Id: string
  user2Id: string
  status: string
  betId: string
}

export const BlockButton: React.FC<Props> = ({ user1Id, user2Id, status, betId }) => {
  const { auth, user } = Auth.useContainer()

  const kick = () => {
    const kickUser = firebase.functions().httpsCallable("kickUser")
    kickUser({
      betId: betId,
    }).catch(console.error)
  }

  const block = () => {
    const userCollectionRef = firestore.collection("users")
    const userDocRef = userCollectionRef.doc(auth.currentUser?.uid)
    userDocRef.set(
      {
        blocked: firebase.firestore.FieldValue.arrayUnion(user2Id),
      },
      { merge: true },
    )
    kick()
  }
  return (
    <>
      {user &&
        auth.currentUser &&
        user1Id === auth.currentUser.uid &&
        status === "pending" && (
          <div className="flex flex-col justify-center">
            <button
              className="rounded-full h-8 w-8 opacity-100 z-0 grid place-content-center border-2 mx-2 transform hover:scale-110 ease duration-100"
              onClick={block}
            >
              <MdThumbDown color="red" />
            </button>
          </div>
        )}
    </>
  )
}
