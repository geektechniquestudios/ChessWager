import Swal from "sweetalert2"

export const CustomSwal = (
  icon: "error" | "success" | "warning" | "info" | "question",
  title: string,
  text: string,
  footer?: string,
) => {
  Swal.fire({
    icon,
    title,
    text,
    customClass: {
      container: "swal-container",
      popup: "swal-popup",
    },
    confirmButtonColor: "#0d9488",
    footer,
  })
}
