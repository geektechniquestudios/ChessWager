import "../../../../style/dropdown.scss"
import { Auth } from "../../../containers/Auth"

import { useState, useEffect, useRef } from "react"
import { DropdownItem } from "../DropdownItem"
import { CSSTransition } from "react-transition-group"
import Toggle from "react-toggle"
import firebase from "firebase/compat"

import { ReactComponent as BellIcon } from "./icons/bell.svg"
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { ReactComponent as PlusIcon } from "./icons/plus.svg"
import { ReactComponent as CogIcon } from "./icons/cog.svg"
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg"
import { ReactComponent as ArrowIcon } from "../icons/arrow.svg"
import { ReactComponent as BoltIcon } from "../icons/bolt.svg"
import { StaticDropdownItem } from "../StaticDropdownItem"
import { CgProfile } from "react-icons/cg"
import { RiSettings5Line } from "react-icons/ri"
import { BsShare } from "react-icons/bs"
import { BiArrowBack, BiHelpCircle } from "react-icons/bi"
import { Menu } from "../Menu"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { ImStatsBars } from "react-icons/im"
import { FiAward } from "react-icons/fi"
import { MdPeopleOutline } from "react-icons/md"

interface Props {
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number>>
  heightMultiplier: number
}

export const Profile: React.FC<Props> = ({
  activeMenu,
  setActiveMenu,
  setMenuHeight,
  heightMultiplier,
}) => {
  const { user } = Auth.useContainer()
  const uploadImage = async (file: File) => {
    // upload image to firebase storage=
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
            setActiveMenu={setActiveMenu}
            key={0}
          >
            <h2>profile</h2>
          </DropdownItem>,
          <div className="border-b-2" key={1}> </div>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<MdPeopleOutline />}
            key={2}
          >
            friends
          </DropdownItem>,

          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<ImStatsBars />}
            key={3}
          >
            stats
          </DropdownItem>,
          <DropdownItem
            setActiveMenu={setActiveMenu}
            leftIcon={<FiAward />}
            key={4}
          >
            achievements
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
            key={5}
          >
            user image
          </StaticDropdownItem>,
        ]}
        thisMenu={"profile"}
        heightMultiplier={heightMultiplier}
        activeMenu={activeMenu}
        setMenuHeight={setMenuHeight}
      />
    </>
  )
}
