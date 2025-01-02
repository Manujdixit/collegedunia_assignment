import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store';
import "./index.css";
import App from "./App.tsx";

// Initialize theme from localStorage
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(savedTheme);
};

// Initialize theme before rendering
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
