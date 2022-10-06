import Swal from "sweetalert2";

export const SwalLoading = (message) => {
  return Swal.fire({
    title: message,
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
