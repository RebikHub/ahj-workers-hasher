export default class Hasher {
  constructor() {
    this.dnd = document.querySelector('.dnd');
    this.dndInput = document.querySelector('.dnd-input');
  }

  events() {
    this.renderImages();
    this.dndInput.addEventListener('input', this.dndClick.bind(this));
  }

  sendImage() {
    const formData = new FormData();

    if (this.img.file) {
      formData.append('file', this.img.file);
      formData.append('name', this.img.name);
      formData.append('url', this.img.url);
      this.memory.save(formData);
    } else {
      formData.append('name', this.img.name);
      formData.append('url', this.img.url);
      this.memory.save(formData);
    }
    this.update = false;
    this.img.url = null;
    this.img.name = null;
    this.img.file = null;
  }

  addBlockWithImg(url, name, file) {
    if (url) {
      const image = document.createElement('img');
      image.src = url;
      image.alt = name;
      this.img.url = url;
      this.img.name = name;
      this.img.file = file;

      image.onerror = () => this.verifyUrl();
      image.onload = () => this.addImage(image);
    }
    this.inputName.value = null;
    this.inputSrc.value = null;
    this.textName = null;
    this.textSrc = null;
  }

  addImage(image) {
    const divImg = document.createElement('div');
    const span = document.createElement('span');
    divImg.classList.add('image');
    span.classList.add('close-image');
    divImg.appendChild(image);
    divImg.appendChild(span);
    this.imgsList.appendChild(divImg);
    if (this.update) {
      this.sendImage();
    }
    this.removeImage();
  }

  dndClick(ev) {
    const files = Array.from(ev.currentTarget.files);
    const url = URL.createObjectURL(files[0]);
    this.update = true;
    this.addBlockWithImg(url, files[0].name, files[0]);
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
