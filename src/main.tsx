import { hydrate } from 'preact';
import { App } from './App';
import './styles/main.css';

// Hydrate in the browser
if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app')!);

  // Register service worker for offline support
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration.scope);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

// Prerender function for SSR
export async function prerender() {
  const { default: renderToString } = await import('preact-render-to-string');
  return {
    html: renderToString(<App />),
  };
}
