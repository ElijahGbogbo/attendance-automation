import {useRef, useState} from "react"
import {validateExcel} from "../utils/validateExcel"

export function useFileUpload() {
    const [error, setError] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function closeError(): void {
        setError(null)
    }

    function processFile(file: File) {
        if (!validateExcel(file)) {
            setError("Please upload a valid Excel file (.xlsx or .xls).")
            return
        }
        setError(null)
        setSelectedFile(file)
    }

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const zoomFile = event.target.files?.[0]
        if (!zoomFile) return
        processFile(zoomFile)
    }
    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        setIsDragging(true)
    }
    function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        setIsDragging(false)
    }
    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        const zoomFile = event.dataTransfer.files[0]
        if (!zoomFile) return
        processFile(zoomFile)
        setIsDragging(false)
    }

    return (
        {
            error, 
            fileInputRef,
            selectedFile,
            isDragging, 
            closeError, 
            handleFileSelect, 
            handleDragOver, 
            handleDragLeave, 
            handleDrop
        }
    )
}
