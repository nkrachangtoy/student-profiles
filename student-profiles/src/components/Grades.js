import React from "react";

function Grades({ isActive, studentId, grades }) {
  return (
    <>
      {isActive === studentId && (
        <div key={studentId}>
          {grades.map((grade, index) => (
            <p
              key={index}
              className="student-list__text student-list__text--grade"
            >
              Test{index + 1}: {grade}%
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default Grades;
