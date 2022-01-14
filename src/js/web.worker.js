import CryptoJS from 'crypto-js';

function fileToArrayBuffer(object) {
  const data = JSON.stringify(object);
  const buffer = new ArrayBuffer(data.length);
  const bufferView = new Uint8Array(buffer);

  for (let i = 0; i < data.length; i += 1) {
    bufferView[i] = data.charCodeAt(i);
  }

  const bufferArray = new Uint8Array(buffer);
  return bufferArray;
}

function cryptoGraph(data, algor) {
  const wordArray = CryptoJS.lib.WordArray.create(data);
  const hash = CryptoJS[algor](wordArray).toString(CryptoJS.enc.Hex);
  return hash;
}

function readFile(file, algor) {
  const reader = new FileReader();

  reader.onload = (e) => {
    const buffer = fileToArrayBuffer(e.target.result);
    const hash = cryptoGraph(buffer, algor);
    self.postMessage(hash);
  };
  reader.readAsText(file);
}

self.addEventListener('message', (ev) => {
  readFile(ev.data.file, ev.data.algor);
});
