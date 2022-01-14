export default class Hasher {
  constructor(worker) {
    this.worker = worker;
    this.dnd = document.querySelector('.dnd');
    this.dndInput = document.querySelector('.dnd-input');
    this.choiceAlgor = document.querySelector('.choice-algor');
    this.listAlgor = document.querySelector('.list-algors');
    this.hashText = document.querySelector('.hash-calc-result');
    this.algor = null;
    this.hash = null;
    this.file = null;
  }

  events() {
    this.clickOnAlgorithms();
    this.inputFile();
    this.dropFile();
    this.clickChoiceAlgorithms();
  }

  inputFile() {
    this.dndInput.addEventListener('input', (ev) => {
      const file = ev.target.files[0];
      this.file = file;
      this.resultCalcHash();
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
      this.resultCalcHash();
    });
  }

  webWorker(file, algor) {
    this.worker.addEventListener('message', (ev) => {
      this.renderCalcHash(ev.data);
    });

    this.worker.addEventListener('error', (ev) => {
      console.log(ev);
    });

    this.worker.postMessage({
      file,
      algor,
    });
  }

  resultCalcHash() {
    if (this.file !== null && this.algor !== null) {
      this.webWorker(this.file, this.algor);
    }
  }

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
          this.resultCalcHash();
        }
      }
    });
  }
}
