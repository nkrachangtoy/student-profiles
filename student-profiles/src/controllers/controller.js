import {useState, useEffect} from 'react';
import {getStudentProfiles} from '../api/studentsAPI';

export default function controller () {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState([]);

    // Handle Fetch students
    const handleGetAllStudents = async () => {
        const results = await getStudentProfiles();
        setStudents(results);
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

}