import { App } from "./App"
import { AuthState } from "./containers/AuthState"
import { BetsState } from "./containers/BetsState"
import { ChatFormState } from "./containers/ChatFormState"
import { ChatToggleState } from "./containers/ChatToggleState"
import { ConversationsState } from "./containers/ConversationsState"
import { DarkModeState } from "./containers/DarkModeState"
import { DropdownState } from "./containers/DropdownState"
import { GameState } from "./containers/GameState"
import { GameStreamState } from "./containers/GameStreamState"
import { GlobalChatState } from "./containers/GlobalChatState"
import { LobbyHeaderState } from "./containers/LobbyHeaderState"
import { LobbyState } from "./containers/LobbyState"
import { PriceState } from "./containers/PriceState"
import { UserDataState } from "./containers/UserDataState"
import { UserMenuState } from "./containers/UserMenuState"
import { WindowSizeState } from "./containers/WindowSizeState"

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
    ChatToggleState.Provider,
    WindowSizeState.Provider,
    LobbyState.Provider,
    AuthState.Provider,
    GameState.Provider,
    PriceState.Provider,
    ChatFormState.Provider,
    DarkModeState.Provider,
    DropdownState.Provider,
    LobbyHeaderState.Provider,
    UserMenuState.Provider,
    ConversationsState.Provider,
    UserDataState.Provider,
    GlobalChatState.Provider,
    BetsState.Provider,
    GameStreamState.Provider,
  ]

  return (
    <CombineProviders providers={providers}>
      <App />
    </CombineProviders>
  )
}
