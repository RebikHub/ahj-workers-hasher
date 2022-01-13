import CryptoJS from 'crypto-js';

export default function cryptoGraph(data, algor) {
  const wordArray = CryptoJS.lib.WordArray.create(data);
  const hash = CryptoJS[algor](wordArray).toString(CryptoJS.enc.Hex);
  return hash;
}
