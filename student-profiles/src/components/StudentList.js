import React, {useState, useEffect} from 'react';
import axios from "axios";
const BASE_URL = "https://api.hatchways.io/assessment/students";


export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    // Get student profiles
    async function getStudentProfiles(){
        try {
            const response = await axios.get(`${BASE_URL}`);
            setStudents(response.data.students);
            return response;
        } catch (e) {
            console.log(e)
        }
    }



    // Calculate student's average grade
    const handleAverageGrade = (grades) => {
        const toNumber = grades.map(i => Number(i));
        const sum = toNumber.reduce((a, b) => a + b);
        const avg = sum / toNumber.length;
        return avg;
    }

    // Search by name
    const searchByName = (e) => {
        const input = e.target.value;
        setSearchTerm(input);
        const results = students.filter(({firstName = "", lastName = ""}) => [firstName, lastName,  `${firstName} ${lastName}`].some(el=> el.toLowerCase().includes(input.toLowerCase())));
        setSearchResults(results);
    }

    useEffect(()=>{      
        getStudentProfiles();
     },[searchTerm]);

    return (
        <div className="student-list-container">
            <input 
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={searchByName}
                className="search-bar"
                />
            {searchTerm !== "" ? searchResults.map(student => 
                <div className="student-list__item" key={student.id}>
                    <div style={{backgroundImage: `url(${student.pic})`}} className="student-list__img" />
                    <div className="student-list__info">
                    <h1 className="student-list__name">{`${student.firstName} ${student.lastName}`}</h1>
                        <p className="student-list__text">Email: {student.email}</p>
                        <p className="student-list__text">Company: {student.company}</p>
                        <p className="student-list__text">Skill: {student.skill}</p>
                        <p className="student-list__text">Average: {handleAverageGrade(student.grades)}%</p>
                    </div>
                </div>) : students.map(student => 
                <div className="student-list__item" key={student.id}>
                    <div style={{backgroundImage: `url(${student.pic})`}} className="student-list__img" />
                    <div className="student-list__info">
                    <h1 className="student-list__name">{`${student.firstName} ${student.lastName}`}</h1>
                        <p className="student-list__text">Email: {student.email}</p>
                        <p className="student-list__text">Company: {student.company}</p>
                        <p className="student-list__text">Skill: {student.skill}</p>
                        <p className="student-list__text">Average: {handleAverageGrade(student.grades)}%</p>
                    </div>
                </div>
                )}
        </div>
    )
}
