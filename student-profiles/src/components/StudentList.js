import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Student from './Student';
import { getStudentProfiles } from '../api/studentsAPI';
import {handleAverageGrade} from '../utils/utils';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState({name: "", tag: ""});
    const [sortedStudents, setSortedStudents] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [tags, setTags] = useState([]);
    
    // Handle Fetch students
    const handleGetAllStudents = async () => {
        const results = await getStudentProfiles();
        setStudents(results.data.students);
    }

    // handle name search
    const handleSearchByName = (input) => {
        const results = students.filter(({firstName = "", lastName = ""}) => [firstName, lastName,  `${firstName} ${lastName}`].some(el => el.toLowerCase().includes(input.toLowerCase())));
        return results;
    }

    // handle tag search
    const handleSearchByTag = (input) => {
        let studentArr = [];
        const filteredTags = tags.filter(({tag = ""}) => [tag, `${tag}`].some(el => el.includes(input)));
        // Compare student id in findTags to student id in students array
        if(input !== ""){
            students.filter(student => {
                filteredTags.map(tag => {
                        if(tag.id === student.id){
                            studentArr.push(student);
                        }
                    return false;
                    })
                return false;
            });
            return studentArr;
        }else{
            students.map(student => {
                studentArr.push(student)
                return false;
            }
            )
            return studentArr;
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
       handleGetAllStudents();
     },[]);

    useEffect(() => {
        const nameResult = handleSearchByName(searchTerm.name);
        const tagResult = handleSearchByTag(searchTerm.tag);
        // Compare two arrays and filter out common object(s)
        const result = nameResult.filter(obj1 => tagResult.some(obj2 => obj1.id === obj2.id));
        setSortedStudents(result);
    } // eslint-disable-next-line
    , [students, searchTerm]) 


    return (
        <div className="student-list-container">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {sortedStudents.length > 0 ? 
            sortedStudents.map((student, index) => 
                <Student 
                    toggleAccordion={toggleAccordion}
                    handleAverageGrade={handleAverageGrade}
                    isActive={isActive}
                    student={student} 
                    index={index}
                    tags={tags}
                    setTags={setTags}
                />
            ): <div style={{margin: "2rem"}}>No Results Found</div>
            }
        </div>

    )
}

export default StudentList;