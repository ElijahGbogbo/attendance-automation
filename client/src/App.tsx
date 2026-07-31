import {useRef, useState} from "react"  // Imported React
import './App.css'

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  } 
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const zoomFile = event.target.files?.[0]
    console.log(zoomFile);
  }
  return (
    <main className="main-content">
      <div className="logo-title-container">
        <img src="./img/Alive-Mentorship-School-Logo.jpg" alt="Alive Mentorship School Logo" />
        <h1>Attendance Automation</h1>
      </div>
      <input 
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleFileSelect}
        hidden
      />
      <div
        className="upload-section"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >
          <p>Drag & Drop your Zoom attendance file here</p>
          <p>or click to browse</p>
      </div>
    </main>
  )
}

export default App
