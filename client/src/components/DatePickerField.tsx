import type {JSX} from "react";


type DatePickerFieldProps = {
    dateValue: string;
    onDateChange: (newDate: string) => void;
}

function DatePickerField({dateValue, onDateChange}: DatePickerFieldProps): JSX.Element {
    return (
        <div className="form-group">
            <label htmlFor="classDate">Please Select the Class Date</label>
            <input 
              id="classDate"
              type="date"
              value={dateValue}
              onChange={(e) => onDateChange(e.target.value)} 
              required
            />
        </div>
    )
}

export default DatePickerField
