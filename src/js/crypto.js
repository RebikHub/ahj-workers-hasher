import CryptoJS from 'crypto-js';

export default function cryptoGraph(data, algor) {
  const wordArray = CryptoJS.lib.WordArray.create(data);
  // console.log(wordArray);
  const hash = CryptoJS[algor](wordArray).toString(CryptoJS.enc.Hex);
  // const hash = CryptoJS.MD5(data);
  console.log(hash);
}
