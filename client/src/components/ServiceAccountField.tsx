import {useState, type JSX} from "react";
import "../styles/ServiceAccountField.css";

const SERVICE_ACCOUNT_EMAIL = "alive-attendance-automation@mentorship-attendance-system.iam.gserviceaccount.com"

function ServiceAccountField(): JSX.Element {
    const [copied, setCopied] = useState<boolean>(false)
    const handleCopy = async() => {
        await navigator.clipboard.writeText(SERVICE_ACCOUNT_EMAIL)

        setCopied(true)
        setTimeout(() => {setCopied(false)}, 2000)
    }

    return (
        <div className="form-group-readonly">
            <label>Google Service Account Email</label>
            <div className="copy-field">
                <input 
                  className="service-account-input"
                  value={SERVICE_ACCOUNT_EMAIL}
                  readOnly
                />
                <button type="button" onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <p className="helper-text">
                Grant this email Editor-access to the Google Sheet before marking attendance.
            </p>
        </div>
    )
}

export default ServiceAccountField
