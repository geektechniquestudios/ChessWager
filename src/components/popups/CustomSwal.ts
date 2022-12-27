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
      "bg-stone-700 bg-opacity-60 text-stone-200 backdrop-blur-2xl backdrop-filter",
    confirmButtonColor: "#0d9488",
    footer,
  })
}
