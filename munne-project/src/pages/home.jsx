import { useEffect } from "react";
import { getDifficults } from "../services/gameServices";

export default function Home() {
  useEffect(() => {
    getDifficults()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // se ejecuta una sola vez al montar

  return (
    <>
      <h1>hola</h1>
    </>
  );
}
