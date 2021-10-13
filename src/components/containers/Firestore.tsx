import { createContainer } from "unstated-next"
import firebase from "firebase/compat/app"

const useFirestore = () => {
  const firestore = firebase.firestore()
  return { firestore }
}

export const Firestore = createContainer(useFirestore)
