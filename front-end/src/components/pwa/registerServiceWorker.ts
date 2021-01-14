import { register } from 'register-service-worker';

const emit = (name: string, event?: any) => {
  window.dispatchEvent(new CustomEvent(name, event));
};

register('/service-worker.js', {
  registrationOptions: {},
  ready() {
    console.log('Service worker is active.');
  },
  registered() {
    console.log('Service worker has been registered.');
  },
  cached() {
    console.log('Content has been cached for offline use.');
  },
  updatefound() {
    console.log('New content is downloading.');
  },
  updated() {
    emit('sw-updated');
    console.log('New content is available; please refresh.');
  },
  offline() {
    console.log(
      'No internet connection found. App is running in offline mode.'
    );
  },
  error(error) {
    console.error('Error during service worker registration:', error);
  },
});
