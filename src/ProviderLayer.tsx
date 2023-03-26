import { App } from "./App"
import { Auth } from "./components/containers/Auth"
import { GameState } from "./components/containers/GameState"
import { Price } from "./components/containers/Price"
import { ChatFormData } from "./components/containers/ChatFormData"
import { ChatToggle } from "./components/containers/ChatToggle"
import { DarkMode } from "./components/containers/DarkMode"
import { DropdownState } from "./components/containers/DropdownState"
import { LobbyHeaderState } from "./components/containers/LobbyHeaderState"
import { UserMenuState } from "./components/containers/UserMenuState"
import { LobbyState } from "./components/containers/LobbyState"
import { BetsState } from "./components/containers/BetsState"
import { ConversationsState } from "./components/containers/ConversationsState"
import { UserDataState } from "./components/containers/UserDataState"
import { WindowSize } from "./components/containers/WindowSize"
import { GlobalChatState } from "./components/containers/GlobalChatState"

export const ProviderLayer: React.FC = () => {
  return (
    <ChatToggle.Provider>
      <WindowSize.Provider>
        <LobbyState.Provider>
          <Auth.Provider>
            <GameState.Provider>
              <Price.Provider>
                <ChatFormData.Provider>
                  <DarkMode.Provider>
                    <DropdownState.Provider>
                      <LobbyHeaderState.Provider>
                        <UserMenuState.Provider>
                          <ConversationsState.Provider>
                            <UserDataState.Provider>
                              <GlobalChatState.Provider>
                                <BetsState.Provider>
                                  <App />
                                </BetsState.Provider>
                              </GlobalChatState.Provider>
                            </UserDataState.Provider>
                          </ConversationsState.Provider>
                        </UserMenuState.Provider>
                      </LobbyHeaderState.Provider>
                    </DropdownState.Provider>
                  </DarkMode.Provider>
                </ChatFormData.Provider>
              </Price.Provider>
            </GameState.Provider>
          </Auth.Provider>
        </LobbyState.Provider>
      </WindowSize.Provider>
    </ChatToggle.Provider>
  )
}
