import AddNumbers from '@components/AddNumbers.tsx'
import ThemeTest from '@components/ThemeTest.tsx' // ← ADD THIS

function App() {
  return (
    <>
      <ThemeTest />
      <hr className="my-8" />
      <AddNumbers />
    </>
  )
}

export default App
