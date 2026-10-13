import {useRef, useState} from "react"
import {validateExcel} from "../utils/validateExcel"

export function useFileUpload(onFileSelect: (file: File | null) => void) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)

    function processFile(file: File, onFileSelect: (file: File | null) => void) {
        if (!validateExcel(file)) {
            setError("Please upload a valid Excel file (.xlsx or .xls).")
            return
        }
        setError(null)
        onFileSelect(file)
    }

    function closeError(): void {
        setError(null)
    }

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const zoomFile = event.target.files?.[0]
        if (!zoomFile) return
        processFile(zoomFile, onFileSelect)
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
        processFile(zoomFile, onFileSelect)
        setIsDragging(false)
    }

    return (
        {
            error, 
            closeError, 
            fileInputRef, 
            isDragging, 
            handleFileSelect, 
            handleDragOver, 
            handleDragLeave, 
            handleDrop
        }
    )
}
