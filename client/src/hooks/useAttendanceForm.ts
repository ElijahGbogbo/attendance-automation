import { useState } from "react";
import { markAttendance } from "../services/attendanceApi.ts";
import type { AttendanceFormData } from "../types/attendance.ts";
import { assertsDefined } from "../utils/nonNullValidator.js";
import axios from "axios";

interface APIErrorResponse {
    success: boolean;
    message: string;
}

export function useAttendanceForm() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function closeError(): void {
        setError(null)
    }

    function closeSuccess(): void {
        setSuccess(null)
    }

    function validateForm({zoomFile, classDate, urlSheetVal}: AttendanceFormData): boolean {
        if (!zoomFile) {
            setError("Please upload the Zoom attendance file.")
            return false;
        }
        if (!classDate) {
            setError("Please select the class date.")
            return false;
        }
        if (!urlSheetVal.trim()) {
            setError("Please paste the Google Sheet link.")
            return false;
        }
        return true;
    }

    async function submitAttendance(
        event: React.SubmitEvent<HTMLFormElement>, 
        {zoomFile, classDate, urlSheetVal}: AttendanceFormData
    ) {
        event.preventDefault()
        closeError();
        closeSuccess();
        if (!validateForm({zoomFile, classDate, urlSheetVal})) {
            return;
        }

        try {
            assertsDefined(zoomFile, "Please upload the Zoom attendance file");
            setLoading(true)

            const result = await markAttendance(
                zoomFile, 
                classDate, 
                urlSheetVal
            )
            setSuccess("Attendance Marked Successfully!")
            console.log(result)
            return result;
        } catch (error) {
            if (axios.isAxiosError<APIErrorResponse>(error)) {
                setError(error.response?.data?.message ?? "An unexpected error occurred.")
            } else if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred.")
            }
            console.error("Error marking attendance:", error)
            return null;
        } finally {
            setLoading(false)
        }
    }

    return ({
        error, 
        success, 
        setSuccess, 
        closeError, 
        closeSuccess, 
        loading, 
        submitAttendance
    })
}
