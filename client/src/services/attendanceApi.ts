import axios from "axios";
import type {AttendanceResponse} from "../types/attendance";

export async function markAttendance(
    file: File,  
    classDate: string, 
    sheetUrl: string
): Promise<AttendanceResponse> {
    const api = axios.create({
        baseURL: "http://localhost:3000/api", 
    })

    const formData = new FormData()
    formData.append("zoomFile", file)
    formData.append("classDate", classDate)
    formData.append("sheetUrl", sheetUrl)

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
