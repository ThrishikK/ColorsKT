import { getPalette } from "../services/storage.js";

const storedPallettes = JSON.parse(getPalette());
console.log(storedPallettes);
