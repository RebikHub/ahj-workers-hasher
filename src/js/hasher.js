// import cryptoGraph from './crypto';
// import Worker from './web.worker';

export default class Hasher {
  constructor() {
    this.dnd = document.querySelector('.dnd');
    this.dndInput = document.querySelector('.dnd-input');
    this.choiceAlgor = document.querySelector('.choice-algor');
    this.listAlgor = document.querySelector('.list-algors');
    this.hashText = document.querySelector('.hash-calc-result');
    this.algor = 'MD5';
    this.hash = null;
    this.file = null;
  }

  events() {
    this.clickOnAlgorithms();
    this.inputFile();
    this.dropFile();
    this.clickChoiceAlgorithms();
    // Hasher.webWorker();
  }

  inputFile() {
    this.dndInput.addEventListener('input', (ev) => {
      const file = ev.target.files[0];
      this.file = file;
      // this.readFile(file);
    });
  }

  dropFile() {
    this.dndInput.addEventListener('dragover', (ev) => {
      ev.preventDefault();
    });
    this.dndInput.addEventListener('drop', (ev) => {
      ev.preventDefault();
      const files = Array.from(ev.dataTransfer.files);
      [this.file] = files;
      // this.readFile(files[0]);
    });
  }
  
  static webWorker(file, algor) {
    const worker = new Worker(new URL('./web.worker.js', import.meta.url));
    worker.addEventListener('message', (ev) => {
      console.log(ev);
    });

    worker.addEventListener('error', (ev) => {
      console.log(ev);
    });

    worker.postMessage({
      file,
      algor,
    });
  }

  // readFile(file) {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const buffer = Hasher.fileToArrayBuffer(e.target.result);
  //     this.hash = cryptoGraph(buffer, this.algor);
  //     this.renderCalcHash(this.hash);
  //   };
  //   reader.readAsText(file);
  // }

  // static fileToArrayBuffer(object) {
  //   const data = JSON.stringify(object);
  //   const buffer = new ArrayBuffer(data.length);
  //   const bufferView = new Uint8Array(buffer);

  //   for (let i = 0; i < data.length; i += 1) {
  //     bufferView[i] = data.charCodeAt(i);
  //   }

  //   const bufferArray = new Uint8Array(buffer);
  //   return bufferArray;
  // }

  renderCalcHash(hash) {
    this.hashText.textContent = hash;
  }

  renderChangeAlgor(algor) {
    this.choiceAlgor.textContent = `Hash Algorithm: ${algor}`;
  }

  clickOnAlgorithms() {
    this.choiceAlgor.addEventListener('click', () => {
      if (this.listAlgor.classList.contains('none')) {
        this.listAlgor.classList.remove('none');
      } else {
        this.listAlgor.classList.add('none');
      }
    });
  }

  clickChoiceAlgorithms() {
    this.listAlgor.addEventListener('click', (ev) => {
      for (const i of document.querySelectorAll('.algor-name')) {
        if (ev.target === i) {
          this.algor = ev.target.textContent.trim();
          this.listAlgor.classList.add('none');
          this.renderChangeAlgor(this.algor);
          Hasher.webWorker(this.file, this.algor);
        }
      }
    });
  }
}
