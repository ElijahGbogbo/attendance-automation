import axios from "axios";
import type {AttendanceResponse} from "../types/attendance";

export async function markAttendance(
    file: File, 
    sheetUrl: string, 
    classDate: string
): Promise<AttendanceResponse> {
    const api = axios.create({
        baseURL: "http://localhost:5000/api", 
    })

    const formData = new FormData()
    formData.append("zoomFile", file)
    formData.append("sheetUrl", sheetUrl)
    formData.append("classDate", classDate)

    const response = await api.post<AttendanceResponse>(
        "/attendance/mark", 
        formData, 
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    return response.data
}
