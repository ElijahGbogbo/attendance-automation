import type {JSX} from "react";
import "../styles/GoogleSheetInput.css";

type GoogleSheetInputProps = {
    sheetUrl: string;
    onSheetUrlChange: (newUrl: string) => void;
}

function GoogleSheetInput({sheetUrl, onSheetUrlChange}: GoogleSheetInputProps): JSX.Element {
    return (
        <div className="form-group-url">
            <label htmlFor="sheetUrl">Please Paste The  Attendance Google Sheet Link</label>
            <input 
              id="sheetUrl"
              type="url" 
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => onSheetUrlChange(e.target.value)} 
              required
            />
        </div>
    )
}

export default GoogleSheetInput
