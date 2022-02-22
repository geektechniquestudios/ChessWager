import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import firebase from "firebase/compat"

import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { FiAward, FiUser, FiUsers } from "react-icons/fi"
import { BsGraphUp } from "react-icons/bs"
import { RiChat2Line } from "react-icons/ri"
import { RiNotification3Line } from "react-icons/ri"

export const Profile: React.FC = () => {
  const { user } = Auth.useContainer()
  const uploadImage = async (file: File) => {
    // upload image to firebase storage
    const storageRef = firebase.storage().ref()
    const imageRef = storageRef.child(`${user!.uid}/profile.jpg`)
    await imageRef.put(file)
  }

  return (
    <>
      <Menu
        menuItems={[
          <DropdownItem
            goToMenu="main"
            leftIcon={<BiArrowBack />}
            key={0}
            text="Profile"
          />,
          <div
            className="border-b-2 border-stone-400 dark:border-stone-600"
            key={1}
          />,
          <DropdownItem
            goToMenu="notifications"
            leftIcon={<RiNotification3Line />}
            key={2}
            text="Notifications"
          />,
          <DropdownItem
            goToMenu="friends"
            leftIcon={<FiUsers />}
            key={3}
            text="Friends"
          />,
          <DropdownItem
            goToMenu="messages"
            leftIcon={<RiChat2Line />}
            key={4}
            text="Messages"
          />,
          <DropdownItem leftIcon={<BsGraphUp />} key={5} text="Stats" />,
          <DropdownItem leftIcon={<FiAward />} key={6} text="Achievements" />,
          <DropdownItem leftIcon={<FiUser />} key={7} text="Display Name" />,
          <DropdownItem
            leftIcon={
              <button
                onClick={() => {
                  // uploadImage()
                }}
              >
                <AiOutlineCloudUpload />
              </button>
            }
            onClick={() => {}}
            rightIcon={
              <img
                src={user!.photoURL!}
                alt=""
                className="w-6 h-6 rounded-full mr-2"
              />
            }
            key={8}
            text="User Image"
          />,
        ]}
        thisMenu={"profile"}
      />
    </>
  )
}
