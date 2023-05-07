import { BigNumber, ethers, providers } from "ethers"
import { parseEther } from "ethers/lib/utils"
import {
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth"
import {
  DocumentReference,
  Timestamp,
  doc,
  getFirestore,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { createContainer } from "unstated-next"
import { firebaseApp } from "../../../firestore.config"
import ChessWager from "../../artifacts/contracts/ChessWager.sol/ChessWager.json"
import { Notification } from "../../interfaces/Notification"
import { User } from "../../interfaces/User"
import { CustomSwal } from "../popups/CustomSwal"

declare let window: any
const db = getFirestore(firebaseApp)

const globalContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const isMainnet = import.meta.env.IS_MAINNET

// Force page refreshes on network changes
{
  // The "any" network will allow spontaneous network changes
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    provider.on("network", (_newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        // Remove navigation prompt
        window.onbeforeunload = null
        window.location.reload()
      }
    })
  }
}

// Enable navigation prompt
// window.onbeforeunload = () => true

const useAuth = () => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") !== null
      ? localStorage.getItem("walletAddress")
      : "",
  )
  const [isWalletConnected, setIsWalletConnected] = useState(
    localStorage.getItem("isWalletConnected") !== null
      ? localStorage.getItem("isWalletConnected")! === "true"
      : false,
  )

  const auth = getAuth(firebaseApp)

  const [user, isLoading] = useAuthState(auth)
  const [isWalletConnecting, setIsWalletConnecting] = useState(false)

  const connectWallet = async () => {
    if (!user) {
      signInWithGoogle()
      return
    }
    if (typeof window.ethereum === undefined) {
      CustomSwal("error", "Error", "Metamask is not installed")
      return
    }
    try {
      setIsWalletConnecting(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const walletAddress = await signer.getAddress()
      const userDoc = doc(db, "users", auth.currentUser!.uid)
      updateDoc(userDoc, {
        walletAddress,
      })
        .then(() => {
          setIsWalletConnected(true)
          setIsWalletConnecting(false)
          setWalletAddress(walletAddress)
          localStorage.setItem("walletAddress", walletAddress)
          localStorage.setItem("isWalletConnected", "true")
        })
        .then(() => {
          CustomSwal("success", "Success", "Wallet connected")
        })
        .catch((error) => {
          console.error(error)
          CustomSwal("error", "Can't Place Bet", "Error connecting to wallet.")
          setIsWalletConnected(false)
        })
    } catch (error) {
      console.error(error)
      CustomSwal("error", "Can't Place Bet", "Error connecting to wallet.")
      setIsWalletConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    if (!auth.currentUser) return
    const userDoc = doc(db, "users", auth.currentUser!.uid)
    updateDoc(userDoc, {
      walletAddress: "",
    })
      .then(() => {
        setWalletAddress("")
        setIsWalletConnected(false)
        localStorage.setItem("walletAddress", "")
        localStorage.setItem("isWalletConnected", "false")
      })
      .catch(() => {
        CustomSwal("error", "Error", "Error disconnecting wallet")
      })
  }

  const signInWithGoogle = async (): Promise<void> => {
    const addToUsers = async (userCred: UserCredential | null) => {
      if (!userCred?.user?.uid || !auth.currentUser) return
      const userDoc = doc(
        db,
        "users",
        auth.currentUser!.uid,
      ) as DocumentReference<User>
      const notificationDoc = doc(
        userDoc,
        "notifications",
        auth.currentUser.uid + Timestamp.now(),
      ) as DocumentReference<Notification>
      runTransaction(db, async (transaction) => {
        const doc = await transaction.get(userDoc)
        if (!doc.exists()) {
          transaction.set(userDoc, {
            betAcceptedCount: 0,
            betFundedCount: 0,
            walletAddress: "",
            photoURL: auth.currentUser!.photoURL!,
            displayName: auth.currentUser!.displayName!,
            searchableDisplayName: auth.currentUser!.displayName!.toLowerCase(),
            id: auth.currentUser!.uid,
            amountBet: 0,
            amountWon: 0,
            betWinCount: 0,
            hasNewMessage: false,
            hasNewNotifications: true,
            blockedUsers: [],
            sentFriendRequests: [],
            redactedFriendRequests: [],
            friends: [],
            joinDate: serverTimestamp(),
            moderatorLevel: 0,
            isBanned: false,
          })
          transaction.set(notificationDoc, {
            uid: auth.currentUser!.uid,
            createdAt: serverTimestamp(),
            text: "Welcome to Chess Wager. Get started by making your first bet!",
            openToMenu: "howToPlay",
            isRead: false,
            clickedUserId: "",
          })
          if (!auth.currentUser) return
          CustomSwal(
            "warning",
            "Website Under Construction",
            "While betting is fully functional, this website is still undergoing core changes. Only the AVAX Fuji testnet is currently supported. Sending currency may result in loss of funds.",
            "Proceeding means you agree to our" +
              "<a href='https://github.com/geektechniquestudios/ChessWager/blob/main/guides/TOS.md' class='underline hover:text-slate-400 mx-2' target='_blank' rel='noreferrer'>terms of service</a>",
          )
        } else if (doc.data().walletAddress ?? "" !== "") {
          setIsWalletConnected(true)
          localStorage.setItem("isWalletConnected", "true")
          setWalletAddress(doc.data().walletAddress)
          localStorage.setItem("walletAddress", doc.data().walletAddress)
        }
      })
    }

    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then(addToUsers).catch(console.error)
  }

  const signOutWithGoogle = async () => {
    auth.signOut()
    setIsWalletConnected(false)
    setWalletAddress("")
    localStorage.setItem("isWalletConnected", "false")
    localStorage.setItem("walletAddress", "")
  }

  const doesUserHaveEnoughAvax = async (price: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const balance: BigNumber = await provider.getBalance(walletAddress!)
    return balance.gte(parseEther(price.toFixed(0)))
  }

  const callContract = async (
    contractCallFunction: (
      contract: ethers.Contract,
    ) => Promise<providers.TransactionResponse | void>,
    contractAddress?: string,
    postContractCallFunction?: (result?: providers.TransactionResponse) => void,
  ) => {
    const isCorrectBlockchain = async (
      provider: ethers.providers.Web3Provider,
    ) => {
      const { chainId } = await provider.getNetwork()
      if (chainId !== (isMainnet ? 43114 : 43113)) {
        const correctNetwork = isMainnet
          ? "Avalanche Mainnet"
          : "Avalanche Fuji Testnet"
        CustomSwal(
          "error",
          "Wrong network",
          `Switch your wallet to the ${correctNetwork}.`,
        )
        return false
      } else {
        return true
      }
    }

    const isMetamaskConnected = (): boolean => {
      if (typeof window.ethereum === undefined) {
        CustomSwal("error", "Error", "Connect MetaMask to place a bet.")
        return false
      }
      return true
    }

    if (!isMetamaskConnected()) return

    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    if (!(await isCorrectBlockchain(provider))) return

    const signer: ethers.providers.JsonRpcSigner = provider.getSigner()
    const contract = new ethers.Contract(
      contractAddress ?? globalContractAddress,
      ChessWager.abi,
      signer,
    )

    try {
      const result = await contractCallFunction(contract)
      result?.wait && (await result.wait().catch(console.error))
      postContractCallFunction && postContractCallFunction(result ?? undefined)
    } catch (err) {
      console.error(err)
    } finally {
      contract.removeAllListeners()
    }
  }

  return {
    user,
    auth,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    setIsWalletConnected,
    walletAddress,
    setWalletAddress,
    signInWithGoogle,
    signOutWithGoogle,
    isWalletConnecting,
    doesUserHaveEnoughAvax,
    isLoading,
    db,
    callContract,
  }
}

export const Auth = createContainer(useAuth)
