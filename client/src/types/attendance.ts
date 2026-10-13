export interface AttendanceFormData {
    zoomFile: File | null;
    classDate: string;
    urlSheetVal: string;
}

export interface AttendanceResponse {
    success: boolean;
    message: string;
}
