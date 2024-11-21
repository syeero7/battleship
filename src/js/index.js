import { buttonClickHandler, boardClickHandler } from "./dom.js";
import "../style.css";

document.querySelector("#buttons").addEventListener("click", buttonClickHandler);
document.querySelector("#computerBoard").addEventListener("click", boardClickHandler);
