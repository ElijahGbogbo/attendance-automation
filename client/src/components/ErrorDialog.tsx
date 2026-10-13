import "../styles/ErrorDialog.css"
import type {JSX} from "react"
import type {DialogBoxProps} from "../types/dialogBox"

function ErrorDialog({message, onClose}: DialogBoxProps): JSX.Element {
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
