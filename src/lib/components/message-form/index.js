// import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
  <style>${shadowStyles.toString()}</style>
  <form class="drop">
  <form>
  <div class="scroll" id="scroll">
    <div class = "messages" id="mess">
	<div class="friend">Доброе утро!</div>
    </div>
    </div>
    <form-input name="message_text" placeholder="Сообщение" slot="message-input">
      <span slot="icon" class="icons">
	<label id="fileLabel"><div id="attach"></div>
	<input type="file" style= "visibility: hidden" class="file"/>	
	</label>
	<label id="positionLabel"><div id="position" class="position"></div> 
	</label>
	</span>
    </form-input>
  </form>
  </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
  }

  static get observedAttributes() {
    return [
      'action',
      'method',
    ];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements() {
    const form = this.shadowRoot.querySelector('form');
    const message = this.shadowRoot.querySelector('.result');
    const otherMessage = this.shadowRoot.querySelector('.friend');
    const geoposition = this.shadowRoot.querySelector('.position');
    const drop = this.shadowRoot.querySelector('.drop');
    const file = this.shadowRoot.querySelector('.file');

    const img = '';
    const not_img = '';
    const pos = '';
    this._elements = {
      form: form,
      message: message,
      file: file,
      img: img,
      not_img: not_img,
      geoposition: geoposition,
      drop: drop,
      pos: pos,
    };
  }

  _addHandlers() {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
    this._elements.file.addEventListener('change', this._onFile.bind(this));
    this._elements.geoposition.addEventListener('click', this._onPositionClick.bind(this));
    this._elements.drop.addEventListener('dragover', MessageForm._onDrag.bind(this));
    this._elements.drop.addEventListener('dragenter', MessageForm._onDrag.bind(this));
    this._elements.drop.addEventListener('drop', this._onDrop.bind(this));
  }

  _onSubmit(event) {
    const elem = document.createElement('div');
    elem.className = 'result';
    let text = '';
    const ar = Array.from(this._elements.form.elements).map(
      el => el.value,
    );
    text = ar[ar.length - 1];
    if (this._elements.img != '') {
      const img = document.createElement('img');
      img.className = 'imgMessage';
      img.src = this._elements.img;
      elem.appendChild(img);
    }
    if (this._elements.not_img != '') {
      text = `${text}\n${this._elements.not_img}`;
      this._elements.not_img = '';
    }
    if (this._elements.pos != '') {
      text = this._elements.pos;
      this._elements.pos = '';
    }
    elem.appendChild(document.createTextNode(text));
    const mess = this.shadowRoot.querySelector('#mess');
    if ((text != '') || (this._elements.img != '')) {
    	mess.appendChild(elem);
      this.sendServer(text);
      this._elements.img = '';
    }
    const input = this.shadowRoot.querySelector('form-input');
    input.style.backgroundColor = 'white';
    for (let i = 0; i < this._elements.form.elements.length; i++) this._elements.form.elements[i].value = '';
    if (text == 'Как дела?') {
      const g = document.createElement('div');
      g.className = 'friend';
      g.innerText = 'Отлично)';
      mess.appendChild(g);
    }
    const scroll = this.shadowRoot.querySelector('#scroll');
    scroll.scrollTop = scroll.scrollHeight;
    event.preventDefault();
    return false;
  }

  _onFile(event) {
    const url = URL.createObjectURL(this.shadowRoot.querySelector('input[class=file]').files[0]);
    const tmp = this._elements.form.elements[0].value.split('.');
    const input = this.shadowRoot.querySelector('form-input');
    input.style.backgroundColor = 'green';
    const ext = tmp[tmp.length - 1];
    if ((ext == 'jpg') || (ext == 'png')) {
    	this._elements.img = url;
    } else {
      this._elements.not_img = url;
    }
    event.preventDefault();
    return false;
  }

  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }

  static _onDrag(event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  _onDrop(event) {
    const url = URL.createObjectURL(event.dataTransfer.files[0]);
    const input = this.shadowRoot.querySelector('form-input');
    input.style.backgroundColor = 'green';
    this._elements.img = url;
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  getPosition(option) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  }

  _onPositionClick(event) {
    if (navigator.geolocation) {
      const Promise = this.getPosition();
      Promise.then((position) => {
        this._elements.pos = `Latitude: ${
          position.coords.latitude} Longitude: ${position.coords.longitude}`;
          this._onSubmit();
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    event.preventDefault();
    return false;
  }

  sendServer(text)
  {
          var formData = new FormData();
          formData.append("user", "kate");
          formData.append("message", text);
          fetch('http://localhost:8081/message', {method: 'POST', body: formData})
               .then(result => console.log(result));      
  } 	
}

customElements.define('message-form', MessageForm);
