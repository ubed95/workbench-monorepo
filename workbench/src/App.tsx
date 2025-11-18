import AddNumbers from '@components/AddNumbers.tsx'
import AppRoutes from './AppRoutes.tsx'
import Footer from './components/Footer/Footer.tsx'
import Header from './components/Header/Header.tsx'
import './App.css'

function App() {
  return (
    <>
      <AddNumbers />
      <Header />
      <AppRoutes />
      <Footer />
    </>
  )
}

export default App
