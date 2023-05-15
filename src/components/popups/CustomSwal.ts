import Swal from "sweetalert2"

export const CustomSwal = (
  icon: "error" | "success" | "warning" | "info" | "question",
  title: string,
  html: string,
  footer?: string,
  preConfirm?: (value: any) => any,
  allowOutsideClick = true,
) => {
  Swal.fire({
    icon,
    title,
    html,
    customClass: {
      container: "swal-container",
      popup: "swal-popup",
    },
    confirmButtonColor: "#0d9488",
    footer,
    preConfirm,
    allowOutsideClick,
  })
}

export const FirstLoginSwal = () => {
  CustomSwal(
    "info",
    "Welcome to ChessWager",
    `
    <div class='flex flex-col gap-3'>
      <div class='text-lg font-bold'>Bet on real-time master-level chess with instant payout</div>
      <div class='text-sm text-stone-400'>We can't legally accept a mainnet currency yet, but we will soon. You can play right now on the Avalanche Fuji Testnet. <span class='text-green-400 font-bold'>Placing a bet before our mainnet launch will earn you a special badge at the time of launch.</span> Read the help section for more information.</div>
    </div>
    `,
    `
    <div class='text-xs text-stone-400 text-center'>
      <span>By continuing, you are setting up a ChessWager account and agree to our</span>
      <a href='https://github.com/geektechniquestudios/ChessWager/blob/main/guides/TOS.md' class='underline hover:text-slate-400' target='_blank' rel='noreferrer'>
        Terms of Service
      </a>
    </div>
    `,
    undefined,
    false,
  )
}

// version with required checkbox ackn. tos in case of legal requirement
// export const FirstLoginSwal = () => {
//   CustomSwal(
//     "info",
//     "Welcome to ChessWager",
//     `
//     <div class='flex flex-col gap-3'>
//       <div class='text-lg font-bold'>Bet on real-time master-level chess with instant payout</div>
//       <div class='text-sm text-stone-400'>We can't legally accept a mainnet currency yet, but we will soon. If you want to play now, we support the AVAX Fuji testnet. Placing a bet before we launch on a mainnet will earn you a special badge at the time of launch. Read the help section for more information.</div>
//     </div>
//   `,
//     `
//     <div>
//       <label class='flex items-center'>
//         <input type='checkbox' id='tos-checkbox' class='form-checkbox h-4 w-4' />
//         <span class='ml-2'>
//           I have read and agree to the
//           <a href='https://github.com/geektechniquestudios/ChessWager/blob/main/guides/TOS.md' class='underline hover:text-slate-400 mx-0.5' target='_blank' rel='noreferrer'>
//             terms of service
//           </a>
//         </span>
//       </label>
//     </div>
//   `,
//     () => {
//       const checkbox = document.getElementById(
//         "tos-checkbox",
//       ) as HTMLInputElement
//       if (!checkbox.checked) {
//         Swal.showValidationMessage(
//           "You need to agree to the terms of service to continue",
//         )
//       }
//     },
//     false,
//   )
// }
