import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
if (container && container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else if (container) {
  createRoot(container).render(<App />);
}
