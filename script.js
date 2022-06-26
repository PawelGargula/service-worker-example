const body = document.querySelector('body');

const p = document.createElement('p');
p.textContent = 'Hello from script.js';

body.appendChild(p);

const folderName = 'service-worker-example';
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // path needs to be written relative to the origin, app's root directory
      const registration = await navigator.serviceWorker.register(`/${folderName}/sw.js`);
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();