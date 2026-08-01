import { ALLOWED_EXCEL_TYPES, ALLOWED_EXCEL_EXTENSIONS} from "../types/file"

export function validateExcel(file: File): boolean {
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."))
    const isValidType = ALLOWED_EXCEL_TYPES.includes(file.type)
    const isValidExtension = ALLOWED_EXCEL_EXTENSIONS.includes(fileExtension)

    return isValidType && isValidExtension
}

