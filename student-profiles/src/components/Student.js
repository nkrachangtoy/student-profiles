import React from 'react';
import Grades from './Grades';
import Tags from './Tags';

function student({student, index, toggleAccordion, handleAverageGrade, isActive, tags, setTags}) {
    return (
        <div className="student-list__item" key={index}>
                <div style={{backgroundImage: `url(${student.pic})`}} className="student-list__img" />
                <div className="student-list__info">
                    <div className="student-list__header-container">
                        <h1 className="student-list__header">{`${student.firstName} ${student.lastName}`}</h1>
                        <div onClick={()=>toggleAccordion(student.id)} key={student.id}>
                            <span className="student-list__icon">{isActive === student.id ? '-' : '+'}</span>
                        </div>
                    </div>
                    <p className="student-list__text">Email: {student.email}</p>
                    <p className="student-list__text">Company: {student.company}</p>
                    <p className="student-list__text">Skill: {student.skill}</p>
                    <p className="student-list__text">Average: {handleAverageGrade(student.grades)}%</p>
                    <Grades 
                        isActive={isActive}
                        studentId={student.id}
                        grades={student.grades}
                        />
                    <Tags 
                        tags={tags}
                        studentId={student.id}
                        setTags={setTags}
                        />
                </div>
            </div>
    )
}

export default student;
