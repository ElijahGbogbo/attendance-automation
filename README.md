# Attendance Automation

A full-stack attendance automation application that compares Zoom meeting attendance records against a master student list stored in Google Sheets and automatically records each student's attendance as **Present** or **Absent**.

The application was developed to reduce the manual effort involved in processing attendance for recurring online mentorship classes.

---

## Features

* Upload Zoom attendance Excel files (`.xlsx` / `.xls`).
* Select the class date for which attendance should be recorded.
* Connect attendance processing to a master Google Sheet.
* Compare Zoom attendee names against registered student names.
* Automatically determine each student's attendance status.
* Update the corresponding date column in the master Google Sheet.
* Provide the Google service-account email required for spreadsheet access.
* Validate user inputs before attendance processing.
* Display custom validation, error, loading, and success feedback through application modals.
* Process uploaded Excel files in memory without requiring permanent server-side file storage.

> **Note:** Additional functionality for marking the processed attendance directly in the uploaded Zoom workbook and providing the updated workbook for download is under development.

---

## How It Works

The application follows this general workflow:

```text
Zoom Attendance Excel File
            │
            ▼
      Upload to Client
            │
            ▼
        Express API
            │
            ▼
   Read Excel File Buffer
            │
            ▼
   Extract Zoom Attendee Names
            │
            ▼
 Compare Against Master Student List
            │
            ▼
    Determine Present / Absent
            │
            ▼
      Update Google Sheet
            │
            ▼
     Return Processing Result
            │
            ▼
        Client Feedback
```

The backend processes the uploaded workbook in memory using SheetJS rather than permanently storing the uploaded file on disk.

---

## Project Structure

This repository is organized as a monorepo containing separate frontend and backend applications.

```text
Attendance-Automation/
│
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── ...
│
├── server/                 # Express backend
│   ├── src/
│   ├── package.json
│   └── ...
│
├── package.json            # Root monorepo scripts
├── package-lock.json
└── README.md
```

### Client

The client is responsible for:

* Collecting attendance-processing inputs.
* Uploading the Zoom attendance file.
* Validating user input.
* Displaying loading and feedback states.
* Communicating with the backend API.

### Server

The server is responsible for:

* Receiving the uploaded Excel file.
* Processing the Zoom attendance data.
* Communicating with Google Sheets.
* Determining and recording attendance.
* Returning processing results to the client.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* TypeScript
* Multer
* SheetJS (`xlsx`)
* Google Sheets API

### Development Tools

* Git
* GitHub
* npm
* ESLint
* TypeScript

---

## Requirements

Before running the project locally, make sure you have:

* Node.js installed
* npm installed
* Git installed
* A Google Cloud project with the Google Sheets API enabled
* A Google service account with access to the target Google Sheet

---

## Installation

Clone the repository:

```bash
git clone https://github.com/ElijahGbogbo/attendance-automation.git
```

Navigate into the project:

```bash
cd attendance-automation
```

Install the root dependencies:

```bash
npm install
```

Install client dependencies:

```bash
cd client
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

Return to the project root:

```bash
cd ..
```

---

## Environment Variables

The backend and frontend requires environment variables for configuration.

Create a `.env` file inside the `server` and `client` directory:

```text
server/
└── .env
```

```text
client/
└── .env
```
 

Add the following `server/.env` required configuration values:

```env
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=your_own_credentials
```

Add the following `client/.env` required configuration values:

```
VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email
```

Use  the environment variable names defined in the server's and client's current configuration when setting up your local environment.

### Credentials

Google service-account credentials and other secrets must **not** be committed to Git.

Keep credential files and `.env` files excluded through `.gitignore`.

---

## Running the Application

From the project root, run:

```bash
npm run dev
```

The root development script starts both applications.

The frontend is available at:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

The backend health endpoint can be checked at:

```text
http://localhost:3000/health
```

---

## Using the Application

1. Open the frontend in your browser.
2. Select the Zoom attendance Excel file.
3. Select the class date.
4. Provide the master Google Sheet URL.
5. Ensure the Google Sheet has been shared with the application's Google service account where required.
6. Submit the attendance form.
7. The backend processes the Zoom attendance data.
8. Attendance is recorded against the appropriate students and date in the master Google Sheet.
9. The application displays the processing result to the user.

---

## Attendance Processing

The application compares names from the Zoom attendance file with the registered student names in the master Google Sheet.

For each registered student, the system determines whether the student attended the Zoom session.

The resulting attendance status is:

```text
Present
```

or:

```text
Absent
```

The status is then written to the appropriate date column in the master Google Sheet.

---

## API

### Health Check

```http
GET /health
```

Used to verify that the backend server is running.

### Attendance Processing

```http
POST /api/attendance/mark
```

Receives the attendance-processing form data and performs the attendance operation.

The request includes the uploaded Zoom attendance Excel file together with the required attendance-processing information.

---

## Development Workflow

The project uses a Git branching workflow separating production, integration, and feature development.

```text
main
  │
  └── develop
        │
        ├── feature/*
        ├── feature/*
        └── feature/*
```

### Branches

* `main` — production-ready code.
* `develop` — integration branch for completed features.
* `feature/*` — branches used for individual features or significant changes.

Feature branches are merged into `develop` through pull requests. Once `develop` contains the intended production-ready changes, it is merged into `main`.

---

## Current Development Status

### Completed

* Full-stack attendance processing workflow.
* Zoom Excel attendance file upload.
* Excel file processing.
* Google Sheets integration.
* Automatic Present/Absent determination.
* Master Google Sheet attendance updates.
* Client-side validation.
* Custom validation and feedback modals.
* Loading and success/error feedback.
* Local full-stack testing.

### In Development

* Updating the originally uploaded Zoom attendance workbook with the calculated attendance status.
* Inserting the attendance status beside each student's name in the Zoom workbook.
* Returning the updated workbook to the frontend.
* Allowing the secretary to download the processed Zoom attendance workbook.

---

## Security Considerations

The application handles Google service-account credentials and uploaded attendance data.

For development:

* Do not commit `.env` files.
* Do not commit Google service-account credentials.
* Keep credential files outside version control.
* Use environment variables for sensitive configuration.
* Do not not store secret information in `client/.env` , instead they should be stored in `server/.env` 
* Limit Google Sheet permissions to the required resources.

---

## Future Improvements

Potential future improvements include:

* Improved attendance-name matching.
* Additional Excel formatting preservation.
* Improved reporting and attendance summaries.
* Deployment of the complete frontend and backend application.
* Additional administrative features for attendance management.

---

## Author

**Elijah Gbogbo**

Mechanical Engineering graduate and full-stack developer interested in building practical software solutions that improve operational efficiency.

---

## License

This project is currently intended as a personal/portfolio project.
