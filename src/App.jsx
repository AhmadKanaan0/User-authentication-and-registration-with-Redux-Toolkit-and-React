import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}
