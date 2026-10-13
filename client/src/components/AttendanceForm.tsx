import { useState, type JSX } from "react";
import "../styles/AttendanceForm.css";
import DatePickerField from "./DatePickerField.tsx";
import ServiceAccountField from "./ServiceAccountField.tsx";
import GoogleSheetInput from "./GoogleSheetInput.tsx";
import FileUpload from "./FileUpload.tsx";
import ErrorDialog from "./ErrorDialog";
import SuccessDialog from "./SuccessDialog";
import { useAttendanceForm } from "../hooks/useAttendanceForm.ts";


function AttendanceForm(): JSX.Element {
    const [zoomFile, setZoomFile] = useState<File | null>(null);    // This matches the file type for the Zoom file upload
    const [classDate, setClassDate] = useState<string>("");
    const [urlSheetVal, setSheetUrl] = useState<string>("");

    const {
        error, 
        success, 
        closeError, 
        closeSuccess, 
        loading, 
        submitAttendance
    } = useAttendanceForm()

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        const result = await submitAttendance(event, {zoomFile, classDate, urlSheetVal});
        if (result) {
            setZoomFile(null);
            setClassDate("");
            setSheetUrl("");
        }
    }
    
    return (
        <>
            {success && <SuccessDialog message={success} onClose={closeSuccess} />}
            {error && <ErrorDialog message={error} onClose={closeError} />} 
            <form onSubmit={handleSubmit} className="attendance-form" noValidate>
                <FileUpload selectedFile={zoomFile} onFileSelect={setZoomFile} />
                <DatePickerField dateValue={classDate} onDateChange={setClassDate} />
                <GoogleSheetInput sheetUrl={urlSheetVal} onSheetUrlChange={setSheetUrl} />
                <ServiceAccountField  />
                <button className="mark-button" type="submit" disabled={loading}>
                    { loading ? "Marking Attendance..." : "Mark Attendance" }
                </button>
            </form>
        </>
    )
}

export default AttendanceForm
