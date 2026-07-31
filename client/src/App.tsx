import './App.css'
import type {JSX} from "react";  // Imported React
import FileUpload from "./components/FileUpload.tsx";

function App(): JSX.Element {
  return (
    <main className="main-content">
      <div className="logo-title-container">
        <img src="./img/Alive-Mentorship-School-Logo.jpg" alt="Alive Mentorship School Logo" className="school-logo" />
        <h1>Attendance Automation</h1>
      </div>
      <FileUpload />
    </main>
  )
}

export default App
