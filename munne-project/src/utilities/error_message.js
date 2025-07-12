export const errorMessage = (error) =>
  error.response?.data?.message || "No se recibio respuesta del servidor";
