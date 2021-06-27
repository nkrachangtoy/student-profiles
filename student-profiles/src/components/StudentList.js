import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Student from './Student';
import { getStudentProfiles } from '../api/studentsAPI';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState({name: "", tag: ""});
    const [searchResults, setSearchResults] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState([]);
    
    // Handle Fetch students
    const handleGetAllStudents = async () => {
        const results = await getStudentProfiles();
        setStudents(results.data.students);
    }

    // Calculate student's average grade
    const handleAverageGrade = (grades) => {
        const toNumber = grades.map(i => Number(i));
        const sum = toNumber.reduce((a, b) => a + b);
        const avg = sum / toNumber.length;
        return avg;
    }

    // Handle search input
    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchTerm({
            ...searchTerm,
            [e.target.name]: value
        });
    }


    // Search by name
    // const searchByName = (e) => {
    //     const input = e.target.value;
    //     setSearchTerm(input);
    //     if(searchTerm !== "" || searchTerm !== null){
    //         const results = students.filter(({firstName = "", lastName = ""}) => [firstName, lastName,  `${firstName} ${lastName}`].some(el=> el.toLowerCase().includes(input.toLowerCase())));
    //         setSearchResults(results);
    //     }
    // }

    // Search by tag
    // const searchByTag = (e) => {
    //     const input = e.target.value;
    //     setSearchTag(input);
    //     if(searchTag !== "" && searchTerm == ""){
    //         // Filter out tag
    //         const findTags = tags.filter(({tag = ""}) => [tag, `${tag}`].some(el => el.includes(input)));
    //         // Compare student id in findTags to student id in students array
    //         let studentArr = [];
    //         students.filter(student => {
    //         findTags.map(tag => {
    //             if(tag.id === student.id){
    //                 studentArr.push(student);
    //             }})
    //             });
    //         setSearchResults(studentArr);
    //         // setSearchResults(...searchResults, studentArr);
    //     }     
    // }

    // const handleSearchResults = (e) => {
    //     const value = e.target.value;
    //     setSearchTerm({
    //         ...searchTerm,
    //         [e.target.name]: value
    //     });

    //     // Search by name
    //     const results = students.filter(({firstName = "", lastName = ""}) => [firstName, lastName,  `${firstName} ${lastName}`].some(el=> el.toLowerCase().includes(searchTerm.name.toLowerCase())));
    //     console.log('Search by Name results: ',results);
    //     // setSearchResults(results);

    //     // Search by tag
    //     const findTags = tags.filter(({tag = ""}) => [tag, `${tag}`].some(el => el.includes(searchTerm.tag)));
    //     // Compare student id in findTags to student id in students array
    //     let studentArr = [];
    //     students.filter(student => {
    //     findTags.map(tag => {
    //         if(tag.id === student.id){
    //             studentArr.push(student);
    //         }})
    //         });
    //     console.log('Search by Tag results: ', studentArr);
    //     // setSearchResults(studentArr);
    // }

    // console.log('Search Results: ', searchResults);

    // Add tag to student's profile
    const addTag = (studentId, tag) => {
        setTags([...tags, {id: studentId, tag: tag}]);
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
       handleGetAllStudents();
     },[searchTerm]);

    return (
        <div className="student-list-container">
            <SearchBar 
                placeHolder="Seach by name"
                inputName="name"
                value={searchTerm.name}
                handleSearchInput={handleSearchInput}
            />
            <SearchBar 
                placeHolder="Seach by tag"
                inputName="tag"
                value={searchTerm.tag}
                handleSearchInput={handleSearchInput}
            />
            {/* {searchTerm.name !== "" ? 
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
            ) : 
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
            )} */}
            {students.map((student, index) => 
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

export default StudentList;