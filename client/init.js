export function init() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.style.color = 'red'
  modal.innerText = 'Let\'s do this! \n (Click to get started)';
  overlay.appendChild(modal)
  overlay.addEventListener('click', () => {
    document.getElementById('overlay').style.display = "none";
  });
  document.querySelector('body').appendChild(overlay);
}