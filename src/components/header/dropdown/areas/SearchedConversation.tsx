import firebase from "firebase/compat/app"
import { useRef } from "react"
import { ChatBody } from "../../../chat/ChatBody"
import { ChatForm } from "../../../chat/ChatForm"
import { Auth } from "../../../containers/Auth"
import { ChatFormData } from "../../../containers/ChatFormData"
import { UserMenuState } from "../../../containers/UserMenuState"
import "../../../../style/scrollbar.scss"

const firestore = firebase.firestore()

interface Props {}

export const SearchedConversation: React.FC<Props> = ({}) => {
  const { auth } = Auth.useContainer()
  const { searchedUser } = UserMenuState.useContainer()
  const docId = [auth.currentUser?.uid, searchedUser?.id].sort().join("-")

  const conversationsCollectionRef = firestore
    .collection("conversations")
    .doc(docId)
    .collection("messages")

  const dummy = useRef<HTMLInputElement>(null)

  const { convoFormValue, setConvoFormValue } = ChatFormData.useContainer()
  return (
    // <>
    //   <div className="">
    //     {(messages?.length ?? 0) > 0 &&
    //       !isLoading &&
    //       messages?.map((message: Message) => <p>{message.text}</p>)}
    //   </div>
    //   <div className="">chat field</div>
    // </>

    <div className="flex flex-col-reverse h-72 ">
      <ChatForm
        dummy={dummy}
        messagesRef={conversationsCollectionRef}
        formValue={convoFormValue}
        setFormValue={setConvoFormValue}
      />
      <span ref={dummy} />
      <ChatBody messagesRef={conversationsCollectionRef} />
    </div>
  )
}
