import React, {useState, useEffect} from 'react';
import Student from './Student';
import axios from "axios";
const BASE_URL = "https://api.hatchways.io/assessment/students";


export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState([]);
    
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

    // Search by tag
    const searchByTag = (e) => {
        const input = e.target.value;
        setSearchTag(input);
        if(input !== ""){
            // Filter out tag
            const findTags = tags.filter(({tag = ""}) => [tag, `${tag}`].some(el => el.includes(input)));
            // Compare student id in findTags to student id in students array
            let studentArr = [];
            students.filter(student => {
            findTags.map(tag => {
                if(tag.id === student.id){
                    studentArr.push(student);
                }})
                });
            setSearchResults(studentArr);
            // setSearchResults(...searchResults, studentArr);
        }     
    }

    // Search by Name and Tag
    // const searchNameAndTag = ({searchTerm}) => {
    //     const name = searchTerm.name;
    //     const tag = searchTerm.tag;
    // }

    // Add tag to student's profile
    const addTag = (studentId, e) => {
        let input = e.target.value;
        if(e.key === 'Enter'){
            setTags([...tags, {id: studentId, tag: input}]);
            // if(!tags.filter(t => t.id === studentId) && !tags.filter(t => t.tag === input)){
            //     setTags([...tags, {id: studentId, tag: input}]);
            // } else {
            //     console.log(`${input} already exist in Student id: ${studentId}`);
            // }

            // students.forEach(student => {
            //     if(student.id === studentId){
            //         const newStudentObj = {
            //             ...student,
            //             tagArr: []
            //         };
            //         return Object.assign(student, newStudentObj);
            //     }
            // })
        }
    }
    
    // Toggle Accordion
    const toggleAccordion = (index) => {
        if(isActive === index){
            // if it's already active, then close it
            return setIsActive(null);
        }
        setIsActive(index);
    }

    useEffect(()=>{      
        getStudentProfiles();
     },[searchTerm, searchTag]);

    return (
        <div className="student-list-container">
            <input 
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={searchByName}
                className="search-bar"
                />
            <input 
                type="text"
                placeholder="Search by tag"
                value={searchTag}
                onChange={searchByTag}
                className="search-bar"
                />
            {searchTerm !== "" ? 
            searchResults.map((student, index) => 
                <Student 
                    toggleAccordion={toggleAccordion}
                    handleAverageGrade={handleAverageGrade}
                    addTag={addTag}
                    isActive={isActive}
                    student={student} 
                    index={index}
                    tags={tags}
                />
            ):
            students.map((student, index) => 
                <Student 
                    toggleAccordion={toggleAccordion}
                    handleAverageGrade={handleAverageGrade}
                    addTag={addTag}
                    isActive={isActive}
                    student={student} 
                    index={index}
                    tags={tags}
                />
            )}
        </div>
    )
}

