import { useMoralis } from "react-moralis"
import MetamaskSignIn from "./MetamaskSignIn"
import MetamaskSignOut from "./MetamaskSignOut"

const MetamaskAuthButtons = () => {
  const { isAuthenticated } = useMoralis()
  return <>{isAuthenticated ? <MetamaskSignOut /> : <MetamaskSignIn />}</>
}

export default MetamaskAuthButtons
