import "../styles/FileUpload.css";
import type {JSX} from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import {useFileUpload} from "../hooks/useFileUpload";

function FileUpload(): JSX.Element {
    const {
        fileInputRef,
        selectedFile,
        isDragging,  
        handleFileSelect, 
        handleDragOver, 
        handleDragLeave, 
        handleDrop
    } = useFileUpload()
    
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
