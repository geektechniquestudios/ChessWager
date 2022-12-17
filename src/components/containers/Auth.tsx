import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { createContainer } from "unstated-next"
import { BigNumber, ethers } from "ethers"
import { parseEther } from "ethers/lib/utils"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth"
import { firebaseApp } from "../../../firestore.config"
import {
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
  runTransaction,
  DocumentReference,
} from "firebase/firestore"
import { User } from "../../interfaces/User"

declare let window: any
const db = getFirestore(firebaseApp)

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

  const [user] = useAuthState(auth)

  const [isWalletConnecting, setIsWalletConnecting] = useState(false)

  const connectWallet = async () => {
    if (!user) {
      signInWithGoogle()
      return
    }
    if (typeof window.ethereum === undefined) {
      alert("Metamask not installed")
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
          alert("Wallet connected")
        })
        .catch((error) => {
          console.error(error)
          alert("Error connecting to wallet")
          setIsWalletConnected(false)
        })
    } catch (error) {
      console.error(error)
      alert("Error connecting to wallet.")
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
        alert("Error disconnecting wallet")
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
            hasNewNotifications: false,
            blockedUsers: [],
            sentFriendRequests: [],
            redactedFriendRequests: [],
            friends: [],
            joinDate: serverTimestamp(),
            moderatorLevel: 0,
            isBanned: false,
            hasFirstBetBeenPlaced: false,
          })
        } else if (doc.data().walletAddress ?? "" !== "") {
          setIsWalletConnected(true)
          localStorage.setItem("isWalletConnected", "true")
          setWalletAddress(doc.data().walletAddress)
          localStorage.setItem("walletAddress", doc.data().walletAddress)
        }
      })
    }

    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(addToUsers)
      .catch(console.error)
      .finally(() => {
        if (!auth.currentUser) return
        alert(
          "This website is under development. Only the AVAX Fuji testnet is currently supported. Sending currency may result in loss of funds.",
        )
      })
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
    return balance.gte(parseEther(price.toString()))
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
  }
}

export const Auth = createContainer(useAuth)
