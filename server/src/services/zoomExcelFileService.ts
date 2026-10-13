// import type { UpdateZoomAttendanceProps } from "../types/attendanceProcessingTypes.ts";
// import { insertAttendanceColumn } from "../utils/insertAttendanceColumn.ts";

// export function updateZoomAttendanceExcelFile({
//     worksheet, studentNames, attendeeSet
// }: UpdateZoomAttendanceProps) {
//     const attendanceStatus: string[][] = [];
//     attendeeSet.forEach((rowVal) => {
//       const nameVal = rowVal.toLowerCase().trim().replace(/\s+/g, ' ') ?? ''
//       if (nameVal === '') {
//         attendanceStatus.push([nameVal]);
//         return
//       }
//       const sampleArray = nameVal.split(' ')

//       let studentNameIsPresent = false;
//       studentNames.forEach((elemArr) => {
//         const arrVal = elemArr[0]?.toLowerCase().trim().replace(/\s+/g, ' ') ?? ''
//         if (arrVal === nameVal) {
//           studentNameIsPresent = true;
//           attendanceStatus.push(['Present']);
//           return
//         }
//       })
//       if (studentNameIsPresent) return;

//       let isPresent = false;
//       for (const arrNameVal of studentNames) {
//         let trueCount = 0;
//         const arrNameElem = arrNameVal[0]?.toLowerCase().trim().replace(/\s+/g, ' ') ?? ''
//         const referenceArray = arrNameElem.split(' ')
//         for (const sampleUnit of sampleArray) {
//           const boolArray = referenceArray.map((elem) => {
//             return elem === sampleUnit
//           })
//           const trueLength = boolArray.filter((boolVal) => boolVal === true).length;
//           if (trueLength === 0) {
//             continue
//           }
//           trueCount++
//         }
//         if (trueCount >= 2) {
//           isPresent = true;
//           break
//         } else {
//           continue
//         }
//       }
//       const statusVal = isPresent ? ['Present'] : ['Absent']
//       attendanceStatus.push(statusVal);
//       return
//     })
//     insertAttendanceColumn(worksheet, attendanceStatus)
//   }
