
import { Auth } from "../../../../containers/Auth"
import { DropdownItem } from "../../DropdownItem"
import { BiArrowBack, BiUserCircle } from "react-icons/bi"
import { Menu } from "../../Menu"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { FiAward, FiUser } from "react-icons/fi"
import { BsGraphUp } from "react-icons/bs"
import { RiChat2Line, RiUserHeartLine } from "react-icons/ri"
import { RiNotification3Line } from "react-icons/ri"
import { MenuLine } from "../../MenuLine"

export const Profile: React.FC = () => {
  const { user } = Auth.useContainer()
  const uploadImage = async (file: File) => {
    // upload image to firebase storage
    // const storageRef = firebase.storage().ref()
    // const imageRef = storageRef.child(`${user!.uid}/profile.jpg`)
    // await imageRef.put(file)
  }

  return (
    <Menu
      menuItems={[
        <DropdownItem
          goToMenu="main"
          leftIcon={<BiArrowBack />}
          key={0}
          text="Profile"
        />,
        <MenuLine key={1} />,
        // <DropdownItem
        //   goToMenu="persona"
        //   leftIcon={<BiUserCircle />}
        //   key={2}
        //   text="Persona"
        // />,
        // <DropdownItem
        //   goToMenu="notifications"
        //   leftIcon={<RiNotification3Line />}
        //   key={3}
        //   text="Notifications"
        // />,
        // <DropdownItem
        //   goToMenu="following"
        //   leftIcon={<RiUserHeartLine />}
        //   key={4}
        //   text="Following"
        // />,
        // <DropdownItem
        //   goToMenu="messages"
        //   leftIcon={<RiChat2Line />}
        //   key={5}
        //   text="Messages"
        // />,
        // <DropdownItem
        //   goToMenu="stats"
        //   leftIcon={<BsGraphUp />}
        //   key={6}
        //   text="Stats"
        // />,
        // <DropdownItem
        //   goToMenu="achievements"
        //   leftIcon={<FiAward />}
        //   key={7}
        //   text="Achievements"
        // />,
        <DropdownItem
          goToMenu="displayName"
          leftIcon={<FiUser />}
          key={8}
          text="Display Name"
        />,
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
          key={9}
          text="User Image"
        />,
      ]}
      thisMenu={"profile"}
    />
  )
}
