import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import { CgUnblock } from "react-icons/cg"
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
  const userRef = doc(db, "users", auth.currentUser!.uid)
  const blockedCollection = collection(userRef, "blocked")
  const unBlockUser = () => {
    deleteDoc(doc(blockedCollection, uid))
    setDoc(userRef, { blockedUsers: arrayRemove(uid) }, { merge: true })
  }

  return (
    <div
      className="color-shift flex h-14 w-64 items-center px-4 text-stone-900 hover:bg-stone-300 dark:text-stone-200 dark:hover:bg-stone-600 dark:hover:text-stone-200"
      style={{ direction: "ltr" }}
    >
      <div className="flex w-full gap-3">
        <div className="flex flex-col justify-center">
          <img src={photoURL} className="h-4 w-4 rounded-full" />
        </div>
        <p className="flex flex-col justify-center">{userName}</p>
      </div>
      <div className="flex flex-col justify-center">
        <button
          onClick={unBlockUser}
          className="color-shift clickable grid h-9 w-9 place-content-center rounded-md border border-stone-800 text-stone-800 hover:border-black hover:bg-stone-100 hover:text-black dark:border-stone-300 dark:text-stone-300 dark:hover:border-white dark:hover:bg-stone-700 dark:hover:text-white"
          title="Unblock"
        >
          <CgUnblock className="text-green-600" />
        </button>
      </div>
    </div>
  )
}
