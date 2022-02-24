import firebase from "firebase/compat"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { createContainer } from "unstated-next"
import { ethers } from "ethers"
const firestore = firebase.firestore()

declare let window: any

const userCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> =
  firestore.collection("users")

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

  const auth: firebase.auth.Auth = firebase.auth()
  const [user]: [
    firebase.User | null | undefined,
    boolean,
    firebase.auth.Error | undefined,
  ] = useAuthState(auth)

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
      userCollectionRef
        .doc(auth.currentUser?.uid)
        .update({ walletAddress: walletAddress })
      setIsWalletConnected(true)
      setWalletAddress(walletAddress)
      localStorage.setItem("walletAddress", walletAddress)
      localStorage.setItem("isWalletConnected", "true")
      setIsWalletConnecting(false)
    } catch (error) {
      console.error(error)
      alert("You need to install Metamask")
      setIsWalletConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setWalletAddress("")
    setIsWalletConnected(false)
    localStorage.setItem("walletAddress", "")
    localStorage.setItem("isWalletConnected", "false")
    userCollectionRef.doc(auth.currentUser?.uid).update({ walletAddress: "" })
  }

  const signInWithGoogle = async () => {
    const addToUsers = () => {
      if (auth.currentUser) {
        const usersCollectionRef = firestore.collection("users")
        const userDoc = usersCollectionRef.doc(auth.currentUser.uid)
        userDoc
          .get()
          .then((doc) => {
            if (!doc.exists) {
              userDoc
                .set({
                  betAcceptedCount: 0,
                  betFundedCount: 0,
                  blocked: [],
                  walletAddress: "",
                  photoURL: auth.currentUser!.photoURL,
                })
                .catch(console.error)
            }
            if (doc.data()!.walletAddress !== "") {
              setIsWalletConnected(true)
              localStorage.setItem("isWalletConnected", "true")
              setWalletAddress(doc.data()!.walletAddress)
              localStorage.setItem("walletAddress", doc.data()!.walletAddress)
            }
          })
          .catch(console.error)
      }
    }
    const provider = new firebase.auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then(() => {
        addToUsers()
      })
      .catch(console.error)
  }
  const signOutWithGoogle = async () => {
    auth.signOut()
    setIsWalletConnected(false)
    setWalletAddress("")
    localStorage.setItem("isWalletConnected", "false")
    localStorage.setItem("walletAddress", "")
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
  }
}

export const Auth = createContainer(useAuth)
