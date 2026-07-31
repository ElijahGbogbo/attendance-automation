import './App.css'
import type {JSX} from "react";  // Imported React
import FileUpload from "./components/FileUpload.tsx";
import Header from "./components/Header.tsx";

function App(): JSX.Element {
  return (
    <main className="main-content">
      <Header />
      <FileUpload />
    </main>
  )
}

export default App
