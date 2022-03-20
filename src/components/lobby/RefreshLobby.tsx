interface Props {

}


export const RefreshLobby: React.FC<Props> = ({
  
}) => {
  return (
    <>
      {/* {user &&
        bets
          ?.filter(
            (bet) =>
              bet.user1Id === user.uid &&
              bet.gameId !== "" &&
              bet.status !== "funded",
          )
          .map((bet, index) => (
            <Bet
              key={bet.id + index}
              {...bet}
              timestamp={bet.timestamp?.seconds}
              selectedBetMap={selectedBetMap}
              setSelectedBetMap={setSelectedBetMap}
            />
          ))}
      {interactableLobby?.map((bet, index) => (
        <Bet
          key={bet.id + index}
          {...bet}
          timestamp={bet.timestamp?.seconds}
          selectedBetMap={selectedBetMap}
          setSelectedBetMap={setSelectedBetMap}
          index={index}
          isLobbyEnabled={isLobbyEnabled}
        />
      ))} */}
    </>
  )
}
