import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore"
import { firebaseApp } from "../../../../../config"
import { Auth } from "../../../../containers/Auth"

const db = getFirestore(firebaseApp)

interface Props {
  userName: string
  photoURL: string
  uid: string
}

export const BlockedUserItem: React.FC<Props> = ({
  userName,
  photoURL,
  uid,
}) => {
  const { auth } = Auth.useContainer()
  const userDoc = doc(db, "users", auth.currentUser!.uid)
  const blockedCollection = collection(userDoc, "blocked")
  const unBlockUser = () => {
    deleteDoc(doc(blockedCollection, uid))
  }

  return (
    <div
      className="h-14 w-64 px-4 flex items-center hover:bg-stone-300 dark:hover:bg-stone-600 dark:text-stone-200 text-stone-900 dark:hover:text-stone-200 color-shift"
      style={{ direction: "ltr" }}
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col justify-center">
          <img src={photoURL} className="rounded-full w-4 h-4" />
        </div>
        <p className="flex flex-col justify-center">{userName}</p>
      </div>
      <div className="flex flex-col justify-center">
        <button onClick={unBlockUser} className="border rounded-md p-2">
          unblock
        </button>
      </div>
    </div>
  )
}
