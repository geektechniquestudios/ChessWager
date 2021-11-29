import { Auth } from "../../../containers/Auth"

export const Disconnect: React.FC = () => {
  const { disconnectWallet } = Auth.useContainer()

  return (
    <>
      <button onClick={disconnectWallet} className="header-button">
        Disconnect Metamask
      </button>
    </>
  )
}
