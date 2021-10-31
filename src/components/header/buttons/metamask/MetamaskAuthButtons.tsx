import { useMoralis } from "react-moralis"
import MetamaskSignIn from "./MetamaskSignIn"
import MetamaskSignOut from "./MetamaskSignOut"

const MetamaskAuthButtons: React.FC = () => {
  const { isAuthenticated } = useMoralis()

  return <div>{isAuthenticated ? <MetamaskSignOut /> : <MetamaskSignIn />}</div>
}

export default MetamaskAuthButtons
