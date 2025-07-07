import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES } from "./constants";
import Home from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
