import { render, screen, fireEvent } from "@testing-library/react";
import FileUpload from "./FileUpload";
import userEvent from "@testing-library/user-event";

import { vi, beforeEach } from "vitest";
const mockOnFileSelect = vi.fn();

describe("FileUpload", () => {
    beforeEach(() => {
        mockOnFileSelect.mockClear();
    });

    it("renders the upload instructions", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} />);

        expect(screen.getByText(/drag & drop your zoom attendance/i)).toBeInTheDocument();

        expect(screen.getByText(/or click to browse/i)).toBeInTheDocument();
    })

    it("accepts a valid Excel file", async () => {
        const user = userEvent.setup();
        render(<FileUpload onFileSelect={mockOnFileSelect} />);

        const input = screen.getByLabelText(/upload attendance file/i) as HTMLInputElement;
        const file = new File(["dummy content"], "ZoomAttendance.xlsx", {
            type:  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })

        await user.upload(input, file);

        expect(screen.getByText("ZoomAttendance.xlsx")).toBeInTheDocument();
    })

    it("rejects non-Excel files", async () => {
        const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

        const user = userEvent.setup();
        render(<FileUpload onFileSelect={mockOnFileSelect} />);

        const input = screen.getByLabelText(/upload attendance file/i) as HTMLInputElement;
        const file = new File(["hello world"], "notes.pdf", {
            type:  "application/pdf"
        });

        await user.upload(input, file);

        expect(alertSpy).toHaveBeenCalledWith("Please upload a valid Excel file (.xlsx or .xls).")
        alertSpy.mockRestore();
    })

    it("adds dragging class while dragging", () => {
        const {container} = render(<FileUpload onFileSelect={mockOnFileSelect} />);

        const uploadZone = container.querySelector(".upload-section")!;

        fireEvent.dragOver(uploadZone);

        expect(uploadZone).toHaveClass("dragging");
    })

    it("removes dragging class on drag leave", () => {
        const {container} = render(<FileUpload onFileSelect={mockOnFileSelect} />);

        const uploadZone = container.querySelector(".upload-section")!;

        fireEvent.dragOver(uploadZone);
        fireEvent.dragLeave(uploadZone);

        expect(uploadZone).not.toHaveClass("dragging");
    })

    it("accepts a dropped Excel file", () => {
        render(<FileUpload onFileSelect={mockOnFileSelect} />);

        const uploadZone = screen.getByText(/drag & drop/i).closest(".upload-section")!

        const file = new File(["dummy content"], "ZoomAttendance.xlsx", {
            type:  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
        fireEvent.drop(uploadZone, {
            dataTransfer: {
                files: [file]
            }
        })
        expect(screen.getByText("ZoomAttendance.xlsx")).toBeInTheDocument();
    })
})
