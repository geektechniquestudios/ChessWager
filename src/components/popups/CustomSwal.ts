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
    customClass:
      "bg-stone-700 text-stone-200 bg-opacity-80 backdrop-filter backdrop-blur-2xl",
    confirmButtonColor: "#0d9488",
    footer,
  })
}
