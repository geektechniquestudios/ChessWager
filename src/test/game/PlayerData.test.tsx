import { render, screen } from "@testing-library/react"
import { PlayerData } from "../../components/game/PlayerData"

test("basic presence test", () => {
  render(
    <>
      <p>title</p>
      <PlayerData
        title={"title"}
        name={""}
        time={0}
        rating={0}
        fen={""}
        side={""}
      />
    </>,
  )
  expect(screen.getByText("title")).toBeInTheDocument()
})
