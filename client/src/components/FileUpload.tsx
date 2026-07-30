import "../styles/FileUpload.css";
import type {JSX} from "react";
import {useRef, useState} from "react"
import { FiUploadCloud } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

function FileUpload(): JSX.Element {
    const [isDragging, setIsDragging] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const processFile = (file: File) => {
        const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "application/vnd.ms-excel", // .xls
        ]
        const allowedExtensions = [".xlsx", ".xls"]
        const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."))
        const isValidType = allowedTypes.includes(file.type)
        const isValidExtension = allowedExtensions.includes(fileExtension)
        if (!isValidType && !isValidExtension) {
            alert("Please upload a valid Excel file (.xlsx or .xls).")
            return
        }
        setSelectedFile(file)
    }
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
        const zoomFile = event.dataTransfer.files[0]
        if (!zoomFile) return
        processFile(zoomFile)
        setIsDragging(false)
    }
    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const zoomFile = event.target.files?.[0]
        if (!zoomFile) return
        processFile(zoomFile)
    }
    return (
        <>
            <input 
              type="file"
              accept=".xlsx, .xls"
              ref={fileInputRef}
              onChange={handleFileSelect}
              aria-label="Upload attendance file"
              hidden
            />
            <div
              className={`upload-section ${isDragging ? "dragging" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
                {
                selectedFile ?
                (<p><FaCheckCircle className="success-icon" /> {selectedFile.name}</p>) :
                (<>
                <FiUploadCloud className="upload-icon" />
                <h3>Drag & Drop your Zoom attendance (.xlsx, .xls) file here</h3>
                <p>or click to browse</p>
                </>)
                }
            </div>
        </>
    )
}

export default FileUpload
