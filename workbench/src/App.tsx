import './App.css';
import AppRoutes from './AppRoutes.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import AddNumbers from '@components/AddNumbers.tsx';

function App() {
  return (
    <>
      <AddNumbers />
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
