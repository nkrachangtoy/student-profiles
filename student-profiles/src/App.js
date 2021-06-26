import React from 'react';
import './Styles/main.css';

// Import components
import StudentList from './components/StudentList';


function App(
  {handleGetAllStudents, handleAverageGrade, searchByName, searchByTag, addTag, toggleAccordion, students, tags, searchResults, searchTerm, searchTag, isActive}) {


  return (
    <div className="container">
      <StudentList 
        handleGetAllStudents={handleGetAllStudents}
        handleAverageGrade={handleAverageGrade}
        searchByName={searchByName}
        searchByTag={searchByTag}
        addTag={addTag}
        toggleAccordion={toggleAccordion}
        students={students}
        isActive={isActive}
        tags={tags}
        searchResults={searchResults}
        searchTerm={searchTerm}
        searchTag={searchTag}
      />
    </div>
  );
}

export default App;
