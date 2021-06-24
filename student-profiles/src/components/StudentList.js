import React, {useState, useEffect} from 'react';
import axios from "axios";
const BASE_URL = "https://api.hatchways.io/assessment/students";


export default function StudentList() {
    const [students, setStudents] = useState([]);
    
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

    useEffect(()=>{
       getStudentProfiles();
    },[])

    function handleAverageGrade(grades){
        const toNumber = grades.map(i => Number(i));
        const sum = toNumber.reduce((a, b) => a + b);
        const avg = sum / toNumber.length;
        return avg;
    }
    return (
        <div>
            {students.map(student => 
                <div key={student.id}>
                    <img src={student.pic} alt={student.firstName}/>
                    <h1>{`${student.firstName} ${student.lastName}`}</h1>
                    <p>Email: {student.email}</p>
                    <p>Company: {student.company}</p>
                    <p>Skill: {student.skill}</p>
                    <p>Average: {handleAverageGrade(student.grades)}</p>
                </div>
                )}
        </div>
    )
}

