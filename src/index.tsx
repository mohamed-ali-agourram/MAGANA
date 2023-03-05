import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AppContext } from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppContext>
      <App />
    </AppContext>
  </BrowserRouter>
)