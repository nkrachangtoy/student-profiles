import React from 'react'

function Tags({tags, studentId, addTag}) {
    return (
        <>
            {tags.filter(t => t.id === studentId).length > 0 ? 
            <div className="tags">
                {tags.filter(t => t.id === studentId).map((tag, index) => 
                    <span key={index} className="tag">{tag.tag}</span>
                )}
            </div> : null}
            <input 
                type="text" 
                className="input-tag" 
                placeholder="Add a tag" 
                onKeyDown={(e)=>addTag(studentId, e)}/>
        </>
    )
}

export default Tags
