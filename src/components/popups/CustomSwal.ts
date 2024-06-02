import Swal from "sweetalert2"

export const CustomSwal = (
  icon: "error" | "success" | "warning" | "info" | "question",
  title: string,
  html: string,
  footer?: string,
  preConfirm?: (inputValue: any) => false | any | undefined,
  allowOutsideClick = false,
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
