import { useMoralis } from "react-moralis"
import { Connect } from "./Connect"
import { Disconnect } from "./Disconnect"

export const MetamaskAuthButtons: React.FC = () => {
  const { isAuthenticated } = useMoralis()

  return <>{isAuthenticated ? <Disconnect /> : <Connect />}</>
}
