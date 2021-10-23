import firebase from "firebase/compat/app"
import { useAuthState } from "react-firebase-hooks/auth"
import { createContainer } from "unstated-next"

const useAuth = () => {
  const auth: firebase.auth.Auth = firebase.auth()
  const [user]: [
    firebase.User | null | undefined,
    boolean,
    firebase.auth.Error | undefined
  ] = useAuthState(auth)
  return { user, auth }
}

export const Auth = createContainer(useAuth)
