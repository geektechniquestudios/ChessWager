import { useMoralis } from "react-moralis"
import { ConnectMetamask } from "./ConnectMetamask"
import { DisconnectMetamask } from "./DisconnectMetamask"

export const MetamaskAuthButtons: React.FC = () => {
  const { isAuthenticated } = useMoralis()

  return <>{isAuthenticated ? <DisconnectMetamask /> : <ConnectMetamask />}</>
}
