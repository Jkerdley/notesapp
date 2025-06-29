import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../../sw.js')
    .then(() => console.log('Service worker registered'))
    .catch(() => console.log('Service worker registration failed'))
}
