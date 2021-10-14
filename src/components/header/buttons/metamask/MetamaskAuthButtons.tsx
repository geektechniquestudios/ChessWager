import { useMoralis } from "react-moralis"
import MetamaskSignIn from "./MetamaskSignIn"
import MetamaskSignOut from "./MetamaskSignOut"

const MetamaskAuthButtons: React.FC = () => {
  const { isAuthenticated } = useMoralis()

  return <>{isAuthenticated ? <MetamaskSignOut /> : <MetamaskSignIn />}</>
}

export default MetamaskAuthButtons
