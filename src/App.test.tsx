import { AppWithProviders } from "./AppWithProviders"
import { MainHeader } from "./components/header/MainHeader"
import { GameResultPopup } from "./components/game/popup/GameResultPopup"
import renderer from "react-test-renderer"
import { HeaderMiddle } from "./components/header/HeaderMiddle"

test("jest is working", () => {
  expect(true).toBe(true)
})

test("jest can render a simple component", () => {
  renderer.create(<HeaderMiddle />)
})

export {}
