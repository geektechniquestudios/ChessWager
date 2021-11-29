import { Auth } from "../../../containers/Auth"
import { Connect } from "./Connect"
import { Disconnect } from "./Disconnect"

export const MetamaskAuthButtons: React.FC = () => {
  const { isWalletConnected } = Auth.useContainer()

  return <>{isWalletConnected ? <Disconnect /> : <Connect />}</>
}
