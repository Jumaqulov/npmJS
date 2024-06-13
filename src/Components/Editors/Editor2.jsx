import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor2() {
    const [value, setValue] = useState('')
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            [{ 'align': [] }],
            [{ font: [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [
                {list: 'ordered'},
                {list: 'bullet'},
                {indent: '-1'},
                {indent: '+1'}
            ]
        ]
    }

    return (
        <>
            <div>
                <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: value }} />
        </>
    )
}