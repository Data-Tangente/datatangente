import React, { useState, useEffect } from 'react';

export default function Tags(props) {
    let tagRef = null;

    const handleSelectTag = (e) => {
        if(tagRef.classList.contains("active")) {
            tagRef.classList.remove("active");
        }else {
            tagRef.classList.add("active");
        }
        props.selectTag(props.tag);
    }
    useEffect(() => {
        if(props.selectedTags && props.selectedTags.includes(tagRef.innerHTML)) {
            tagRef.classList.add('active');
        }
    }, [props.selectedTags]);
    return(
        <div ref={ref=>tagRef = ref} className={"tags "+props.class} onClick={ props.class === 'dialog' && handleSelectTag || undefined} >
            {props.tag}
        </div>
    )
}