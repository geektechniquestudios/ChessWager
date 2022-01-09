import Button from "@mui/material/Button"
interface Props {}

export const PlaceBet: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-col-reverse">
      <Button
        type="submit"
        variant="outlined"
        size="small"
      >
        Place Bet
      </Button>
    </div>
  )
}
