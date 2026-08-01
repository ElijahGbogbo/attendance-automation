import "../styles/ErrorDialog.css"
import type {JSX} from "react"
import type {ErrorDialogProps} from "../types/error"

function ErrorDialog({message, onClose}: ErrorDialogProps): JSX.Element {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h2>Error</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    )
}

export default ErrorDialog
