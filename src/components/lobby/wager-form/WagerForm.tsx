import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { Auth } from "../../containers/Auth"
import { BetsState } from "../../containers/BetsState"
import { GameState } from "../../containers/GameState"
import { UserDataState } from "../../containers/UserDataState"
import { WindowSize } from "../../containers/WindowSize"
import { CustomSwal } from "../../popups/CustomSwal"
import { Multiplier } from "./Multiplier"
import { PlaceBet } from "./PlaceBet"
import { QuickBet } from "./QuickBet"
import { SideChooser } from "./SideChooser"
import { TheirBet } from "./TheirBet"
import { Total } from "./Total"
import { WagerFormHeader } from "./WagerFormHeader"
import { YourBet } from "./YourBet"

interface Props {
  bettingLobbyRef: React.MutableRefObject<any>
}

export const WagerForm: React.FC<Props> = ({ bettingLobbyRef }) => {
  const { gameId } = GameState.useContainer()
  const {
    walletAddress,
    isWalletConnected,
    auth,
    connectWallet,
    doesUserHaveEnoughAvax,
    db,
  } = Auth.useContainer()
  const { showWagerForm, setShowWagerForm } = BetsState.useContainer()

  const wagerFormRef = useRef<any>(null)

  const CloseMenuListener = (
    selfRef: MutableRefObject<any>,
    bettingLobbyRef: MutableRefObject<any>,
  ) => {
    useEffect(() => {
      const handleClickOutside = (event: Event) => {
        if (
          !selfRef.current?.contains(event.target) &&
          bettingLobbyRef.current?.contains(event.target)
        )
          setShowWagerForm(false)
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [selfRef])
  }

  CloseMenuListener(wagerFormRef, bettingLobbyRef)

  const user1Metamask = walletAddress

  const [betSide, setBetSide] = useState<"white" | "black">("white")
  const [betAmount, setBetAmount] = useState(0.0)
  const [multiplier, setMultiplier] = useState(1.0)
  const [sliderVal, setSliderVal] = useState(0.0)

  const [localAvaxAmount, setLocalAvaxAmount] = useState("")
  const [localUsdAmount, setLocalUsdAmount] = useState("")
  const [isAmountEmpty, setIsAmountEmpty] = useState(false)

  const lobbyRef = collection(db, "lobby")

  const { userData } = UserDataState.useContainer()

  const createWager = async (e: React.FormEvent<HTMLFormElement>) => {
    const canUserBet: () => Promise<boolean> = async () => {
      if (!auth.currentUser) {
        CustomSwal(
          "error",
          "Authentication Required!",
          "You must be logged in to bet.",
        )
        return false
      } else if (gameId === "") {
        CustomSwal(
          "error",
          "Can't Connect to Lichess",
          "Your browser can't fetch the current game from Lichess.",
        )
        return false
      } else if (betAmount === 0) {
        setIsAmountEmpty(true)
        return false
      } else if (!isWalletConnected) {
        connectWallet()
        return false
      } else if (!(await doesUserHaveEnoughAvax(betAmount))) {
        CustomSwal(
          "error",
          "Insufficient Funds",
          "Deposit more Avax to place this bet.",
        )
        return false
      }
      return true
    }

    e.preventDefault()

    if (!(await canUserBet())) return
    setShowWagerForm(false)

    const { uid, photoURL, displayName } = auth.currentUser!

    addDoc(lobbyRef, {
      amount: betAmount,
      betSide: betSide,
      createdAt: serverTimestamp(),
      timestamp: serverTimestamp(),
      localCreatedAt: Timestamp.now(), // this has to be timestamp.now() instead of serverTimestamp because predictive rendering leaves "createdAt" as null, causing sorting problems, so we fallback to this
      gameId: gameId,
      multiplier: multiplier,
      status: "ready",
      user1Id: uid,
      user1Metamask: user1Metamask,
      user1PhotoURL: photoURL,
      user1DisplayName: displayName,
      user1FollowThrough: [
        userData!.betFundedCount,
        userData!.betAcceptedCount,
      ],
      //@ts-ignore
      contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
      hasUser1SeenUpdate: false,
      hasUser2SeenUpdate: false,
    }).catch(console.error)
  }

  const [isFirstAnimation, setIsFirstAnimation] = useState<boolean>(true)

  useEffect(() => {
    setIsFirstAnimation(false)
  }, [])

  const { width } = WindowSize.useContainer()
  const formWidth = width >= 768 ? "21rem" : "19rem"

  return (
    <AnimatePresence>
      {showWagerForm && (
        <motion.div
          className="absolute bottom-0 left-0 top-0 z-50 h-full select-none overflow-clip border-r border-stone-400 dark:border-stone-600"
          layout
          ref={wagerFormRef}
          initial={isFirstAnimation ? false : { width: 0 }}
          animate={{ width: formWidth }}
          exit={{ width: 0 }}
          transition={{
            type: "spring",
            duration: 0.45,
            bounce: 0,
          }}
        >
          <motion.fieldset
            className="h-full"
            style={{ width: formWidth }}
            transition={{
              type: "spring",
              duration: 0.45,
              bounce: 0,
            }}
            animate={{ width: formWidth }}
            layout
          >
            <motion.form
              layout
              onSubmit={createWager}
              className="flex h-full flex-col justify-between rounded-bl-lg bg-stone-100 p-2 dark:bg-stone-900"
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault()
              }}
            >
              <div className="flex h-full flex-col justify-around gap-4 pt-4">
                <WagerFormHeader />
                <SideChooser betSide={betSide} setBetSide={setBetSide} />
                <QuickBet
                  setBetAmount={setBetAmount}
                  setLocalAvaxAmount={setLocalAvaxAmount}
                  setLocalUsdAmount={setLocalUsdAmount}
                  setIsAmountEmpty={setIsAmountEmpty}
                />
                <YourBet
                  betAmount={betAmount}
                  setBetAmount={setBetAmount}
                  localAvaxAmount={localAvaxAmount}
                  setLocalAvaxAmount={setLocalAvaxAmount}
                  localUsdAmount={localUsdAmount}
                  setLocalUsdAmount={setLocalUsdAmount}
                  isAmountEmpty={isAmountEmpty}
                  setIsAmountEmpty={setIsAmountEmpty}
                />
                <TheirBet multiplier={multiplier} betAmount={betAmount} />
                <Multiplier
                  multiplier={multiplier}
                  setMultiplier={setMultiplier}
                  sliderVal={sliderVal}
                  setSliderVal={setSliderVal}
                />
              </div>
              <div className="mt-4 flex flex-row justify-between gap-2">
                <Total betAmount={betAmount} multiplier={multiplier} />
                <PlaceBet />
              </div>
            </motion.form>
          </motion.fieldset>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
