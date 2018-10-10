const say = function (name) {
  const elem = document.createElement('div');
  elem.style.backgroundColor = 'red';
  elem.style.height = '100px';
  elem.style.fontSize = '100px';
  elem.style.width = '500px';
  const text = document.createTextNode(`Hello ${name}`);
  document.body.appendChild(elem);
  elem.appendChild(text);
};
export default say;
