import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import firebase from "firebase/compat"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { FiAward, FiUser, FiUsers } from "react-icons/fi"
import { BsGraphUp } from "react-icons/bs"
import { RiChat2Line } from "react-icons/ri"

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
          <DropdownItem goToMenu="main" leftIcon={<BiArrowBack />} key={0}>
            <h2>Profile</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1} />,
          <DropdownItem goToMenu="messages" leftIcon={<RiChat2Line />} key={2}>
            Messages
          </DropdownItem>,
          <DropdownItem goToMenu="friends" leftIcon={<FiUsers />} key={3}>
            Friends
          </DropdownItem>,
          <DropdownItem leftIcon={<BsGraphUp />} key={4}>
            Stats
          </DropdownItem>,
          <DropdownItem leftIcon={<FiAward />} key={5}>
            Achievements
          </DropdownItem>,
          <DropdownItem leftIcon={<FiUser />} key={6}>
            Display Name
          </DropdownItem>,
          <StaticDropdownItem
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
            key={7}
          >
            User Image
          </StaticDropdownItem>,
        ]}
        thisMenu={"profile"}
      />
    </>
  )
}
