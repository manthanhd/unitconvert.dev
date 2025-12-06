import { hydrate, render } from 'preact';
import { App } from './App';
import './styles/main.css';

// Render or hydrate in the browser
if (typeof window !== 'undefined') {
  const app = document.getElementById('app')!;
  // Use hydrate in production (when HTML is pre-rendered), render in dev
  if (import.meta.env.PROD && app.children.length > 0) {
    hydrate(<App />, app);
  } else {
    render(<App />, app);
  }

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
