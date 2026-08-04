import {useState, type JSX} from "react";
import "../styles/AttendanceForm.css";
import DatePickerField from "./DatePickerField.tsx";
import ServiceAccountField from "./ServiceAccountField.tsx";
import GoogleSheetInput from "./GoogleSheetInput.tsx";
import FileUpload from "./FileUpload.tsx";
import {markAttendance} from "../services/attendanceApi.ts";

function AttendanceForm(): JSX.Element {
    const [zoomFile, setZoomFile] = useState<File | null>(null);    // This matches the file type for the Zoom file upload
    const [classDate, setClassDate] = useState<string>("");         // This manages the state for Class Date
    const [urlSheetVal, setSheetUrl] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    
    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!zoomFile) {
            return
        }
        if (!classDate) {
            return
        }
        if (!urlSheetVal) {
            return
        }

        try {
            setLoading(true)

            const result = await markAttendance(zoomFile, classDate, urlSheetVal)
            console.log(result)
        } catch (error) {
            console.error("Error marking attendance:", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="attendance-form">
            <FileUpload onFileSelect={setZoomFile} />
            <DatePickerField dateValue={classDate} onDateChange={setClassDate} />
            <GoogleSheetInput sheetUrl={urlSheetVal} onSheetUrlChange={setSheetUrl} />
            <ServiceAccountField  />
            <button className="mark-button" type="submit" disabled={loading}>
                { loading ? "Marking Attendance..." : "Mark Attendance" }
            </button>
        </form>
    )
}

export default AttendanceForm
