import './App.css'
import type {JSX} from "react";  // Imported React
import AttendanceForm from "./components/AttendanceForm.tsx";
import Header from "./components/Header.tsx";

function App(): JSX.Element {
  return (
    <main className="main-content">
      <Header />
      <AttendanceForm />
    </main>
  )
}

export default App
