import { Menu } from "../../models/Menu"
import { useState } from "react"
import { AuthState } from "../../../../../containers/AuthState"

interface Props {}

export const BanUserMenu: React.FC<Props> = ({}) => {
  const { callContract } = AuthState.useContainer()

  const [formValue, setFormValue] = useState<string>("")

  const handleAction = (action: "ban" | "unban") => {
    const method =
      action === "ban" ? "banUserByWalletAddress" : "unbanUserByWalletAddress"
    callContract((contract) =>
      contract[method](formValue.trim(), {
        gasLimit: 1000000,
      }),
    )
  }

  return (
    <Menu
      menuItems={[
        <div className="flex h-60 w-full justify-center rounded-md border-stone-300">
          <div className="flex h-60 w-60 flex-col items-center justify-evenly">
            <p className="text-xl text-center w-full">Contract Level Ban</p>
            <input
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              className="inline-block h-10 w-48 resize-none rounded-sm bg-stone-300 p-2 text-lg outline-none dark:bg-stone-800 dark:text-stone-50"
              placeholder="Wallet Address"
              autoComplete="off"
            />
            <div className="flex justify-evenly w-full">
              <button
                onClick={() => handleAction("ban")}
                className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
              >
                Ban
              </button>
              <button
                onClick={() => handleAction("unban")}
                className="color-shift clickable rounded-md border border-stone-500 bg-stone-200 px-2 py-1.5 font-bold text-stone-800 hover:border-black hover:bg-white hover:text-stone-800 dark:border-stone-500 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-300"
              >
                Unban
              </button>
            </div>
          </div>
        </div>,
      ]}
      thisMenu="banUser"
    />
  )
}
