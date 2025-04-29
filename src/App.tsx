import { ToastContainer } from 'react-toastify';

import { GlobalStyles } from './styles/GlobalStyles';

import { Header, Orders } from './components';

export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer position="bottom-center" />
    </>
  );
}
