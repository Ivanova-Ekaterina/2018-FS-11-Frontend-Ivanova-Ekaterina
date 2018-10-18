const say = function (name) {
  const elem = document.createElement('div');
  elem.className = 'box';
  elem.id = 'test';
  const text = document.createTextNode(`Hello ${name}`);
  document.body.appendChild(elem);
  elem.appendChild(text);
};
export default say;
