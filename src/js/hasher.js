import cryptoGraph from './crypto';

export default class Hasher {
  constructor() {
    this.dnd = document.querySelector('.dnd');
    this.dndInput = document.querySelector('.dnd-input');
    this.choiceAlgor = document.querySelector('.choice-algor');
    this.listAlgor = document.querySelector('.list-algors');
    this.algor = 'MD5';
  }

  events() {
    this.clickOnAlgorithms();
    this.inputFile();
    this.clickChoiceAlgorithms();
  }

  inputFile() {
    this.dndInput.addEventListener('input', (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const buffer = Hasher.fileToArrayBuffer(e.target.result);
        cryptoGraph(buffer, this.algor);
      };
      reader.readAsText(file);
    });
  }

  static fileToArrayBuffer(object) {
    const data = JSON.stringify(object);
    const buffer = new ArrayBuffer(data.length);
    const bufferView = new Uint8Array(buffer);
    for (let i = 0; i < data.length; i += 1) {
      bufferView[i] = data.charCodeAt(i);
    }

    const bufferArray = new Uint8Array(buffer);
    // console.log(ArrayBuffer.isView(bufferArray));
    return bufferArray;
    // return JSON.parse(String.fromCharCode(...bufferArray));
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
        }
      }
      console.log(this.algor);
    });
  }

  dndClick(ev) {
    const files = Array.from(ev.currentTarget.files);
    const url = URL.createObjectURL(files[0]);
  }

  drop() {
    this.dndInput.addEventListener('dragover', (ev) => {
      ev.preventDefault();
    });
    this.dndInput.addEventListener('drop', (ev) => {
      ev.preventDefault();
      const files = Array.from(ev.dataTransfer.files);
      const url = URL.createObjectURL(files[0]);
      this.update = true;
      this.addBlockWithImg(url, files[0].name, files[0]);
    });
  }
}
