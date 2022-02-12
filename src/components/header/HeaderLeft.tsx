import { ChessWagerLogo } from "./ChessWagerLogo"

export const HeaderLeft: React.FC = () => {
  return (
    <div className="flex-auto">
      <div className="flex justify-start h-full mx-3 p-0.5 ">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center align-middle p-1 border-1 rounded-full w-8 h-8">
            <ChessWagerLogo
              className="h-full"
              color="teal"
              stroke="teal"
              strokeWidth={2}
              height="2.5em"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
