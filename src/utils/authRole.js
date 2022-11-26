import CryptoJS from "crypto-js";
import { key } from "../config";

export const authorizationCheck = (role) => {
  let cipherRole = localStorage.getItem("jabatan").toString();
  let bytes = CryptoJS.AES.decrypt(cipherRole, key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};
