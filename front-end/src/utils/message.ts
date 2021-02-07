import './message.styl';

const close = (messageElement: HTMLElement) => {
  messageElement.className = messageElement.className.replace('move-in', '');
  messageElement.className += 'move-out';
  messageElement.addEventListener('animationend', () => {
    messageElement.remove();
  });
};

const containerId = 'message-container';
const containerElement = document.createElement('div');
containerElement.id = containerId;
document.body.appendChild(containerElement);

export const Message = (text: string, duration = 2000, type = 'success') => {
  let prefix = '';
  switch (type) {
    case 'success':
      prefix =
        '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M65.5 511.1a447.4 447.4 0 10894.8 0 447.4 447.4 0 10-894.8 0z" fill="#0EC469"/><path d="M257.8 493.6s62.9 146.8 160.8 146.8c94.4 0 381.1-333.7 381.1-333.7S521.1 761.6 427.9 761.6c-77.5 0-133.4-110.7-170.1-268z" fill="#FFF"/></svg>';
      break;
    case 'fail':
      prefix =
        '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M63.3 512.5a448 448 0 10896 0 448 448 0 10-896 0z" fill="#ED153F"/><path d="M277.9 742s167.9-294.1 465.3-465.3C575.7 577.8 277.9 742 277.9 742z" fill="#FFF"/><path d="M743.1 742S575.2 447.9 277.8 276.7C445.3 577.8 743.1 742 743.1 742z" fill="#FFF"/></svg>';
      break;
    case 'warning':
      prefix =
        '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1019.204 901.632L546.628 82.944c-15.36-26.112-52.736-26.112-68.096 0L5.444 901.632c-15.36 26.112 3.584 58.88 34.304 58.88H984.9c30.208 0 49.152-32.768 34.304-58.88z" fill="#E9994B"/><path d="M462.148 353.792h.512a46.98 46.98 0 0147.104-47.104h5.632a46.98 46.98 0 0147.104 47.104v254.464c0 26.112-21.504 47.616-48.128 47.104h-4.608c-26.112 0-47.616-20.992-47.616-47.104V353.792zm107.52 421.888c-5.12 26.112-20.48 41.984-46.592 47.616-6.144 1.536-12.288 1.536-18.432 0-27.136-5.632-43.52-20.992-49.152-46.592-1.536-6.656-1.536-13.312 0-19.456 5.632-25.6 22.016-40.96 49.152-46.08a55.68 55.68 0 0118.432 0c26.112 5.632 41.472 20.992 46.592 47.104 1.024 5.632 1.024 11.776 0 17.408z" fill="#FFF"/></svg>';
      break;
    default:
      break;
  }
  const messageElement = document.createElement('div');
  messageElement.className = 'message move-in';
  messageElement.innerHTML = `${prefix}<span>${text}</span>`;
  containerElement.appendChild(messageElement);
  setTimeout(() => {
    close(messageElement);
  }, duration);
};

Message.success = (text: string, duration = 2000) =>
  Message(text, duration, 'success');
Message.fail = (text: string, duration = 2000) =>
  Message(text, duration, 'fail');
Message.warning = (text: string, duration = 2000) =>
  Message(text, duration, 'warning');
