import React, {useState} from 'react';

function Tags({tags, studentId, addTag}) {
    const [tag, setTag] = useState("");

    const handleSubmit = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            addTag(studentId, tag);
            setTag("");
        }
    }

    const handleChange = (e) => {
        setTag(e.target.value);
    }
    return (
        <>
            {tags.filter(t => t.id === studentId).length > 0 ? 
            <div className="tags">
                {tags.filter(t => t.id === studentId).map((tag, index) => 
                    <span key={index} className="tag">{tag.tag}</span>
                )}
            </div> : null}
            <form onKeyDown={handleSubmit}>
                <input 
                    type="text" 
                    className="input-tag" 
                    placeholder="Add a tag"
                    value={tag}
                    onChange={handleChange}
                />
            </form>
        </>
    )
}

export default Tags;
