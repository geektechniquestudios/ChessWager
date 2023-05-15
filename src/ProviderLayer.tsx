import { App } from "./App"
import { Auth } from "./components/containers/Auth"
import { BetsState } from "./components/containers/BetsState"
import { ChatFormData } from "./components/containers/ChatFormData"
import { ChatToggle } from "./components/containers/ChatToggle"
import { ConversationsState } from "./components/containers/ConversationsState"
import { DarkMode } from "./components/containers/DarkMode"
import { DropdownState } from "./components/containers/DropdownState"
import { GameState } from "./components/containers/GameState"
import { GlobalChatState } from "./components/containers/GlobalChatState"
import { LobbyHeaderState } from "./components/containers/LobbyHeaderState"
import { LobbyState } from "./components/containers/LobbyState"
import { Price } from "./components/containers/Price"
import { UserDataState } from "./components/containers/UserDataState"
import { UserMenuState } from "./components/containers/UserMenuState"
import { WindowSize } from "./components/containers/WindowSize"

type Provider = React.ComponentType<{
  children: React.ReactNode
}>

interface CombineProvidersProps {
  providers: Provider[]
  children: React.ReactNode
}

const CombineProviders: React.FC<CombineProvidersProps> = ({
  providers,
  children,
}) => {
  const wrappedChildren = providers.reduceRight(
    (wrappedChildren, Provider) => <Provider>{wrappedChildren}</Provider>,
    children,
  )

  return <>{wrappedChildren}</>
}

export const ProviderLayer: React.FC = () => {
  const providers = [
    ChatToggle.Provider,
    WindowSize.Provider,
    LobbyState.Provider,
    Auth.Provider,
    GameState.Provider,
    Price.Provider,
    ChatFormData.Provider,
    DarkMode.Provider,
    DropdownState.Provider,
    LobbyHeaderState.Provider,
    UserMenuState.Provider,
    ConversationsState.Provider,
    UserDataState.Provider,
    GlobalChatState.Provider,
    BetsState.Provider,
  ]

  return (
    <CombineProviders providers={providers}>
      <App />
    </CombineProviders>
  )
}
