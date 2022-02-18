import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { DropdownItem } from "../DropdownItem"
import firebase from "firebase/compat"

import { StaticDropdownItem } from "../StaticDropdownItem"
import { BiArrowBack } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { FiAward } from "react-icons/fi"
import { MdPeopleOutline } from "react-icons/md"
import { BsGraphUp } from "react-icons/bs"
import { FaUserTag } from "react-icons/fa"

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
          <div className="border-b-2" key={1}>
            {" "}
          </div>,
          <DropdownItem leftIcon={<MdPeopleOutline />} key={2}>
            Friends
          </DropdownItem>,
          <DropdownItem leftIcon={<BsGraphUp />} key={3}>
            Stats
          </DropdownItem>,
          <DropdownItem leftIcon={<FiAward />} key={4}>
            Achievements
          </DropdownItem>,
          <DropdownItem leftIcon={<FaUserTag />} key={5}>
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
            key={6}
          >
            User Image
          </StaticDropdownItem>,
        ]}
        thisMenu={"profile"}
      />
    </>
  )
}
