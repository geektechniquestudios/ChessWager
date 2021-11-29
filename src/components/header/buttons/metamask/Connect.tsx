import { Auth } from "../../../containers/Auth"

export const Connect: React.FC = () => {
  const { connectWallet } = Auth.useContainer()

  return (
    <>
      <button
        onClick={() => {
          connectWallet()
        }}
        className="header-button"
      >
        Connect Metamask
      </button>
    </>
  )
}
