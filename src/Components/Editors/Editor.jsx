import React, { useState } from "react";
import JoditEditor from "jodit-react";

const MyEditor = () => {
    const [content, setContent] = useState("");

    const handleSave = () => {
        // console.log(content);
    };

    const handleEditorBeforeCommand = (args) => {
        // Hodisa ro'y berishni to'xtatish
        // args.preventDefault();
        // args.stopPropagation();
    };

    return (
        <div>
            <JoditEditor
                value={content}
                onChange={newContent => setContent(newContent)}
                config={{
                    // JoditEditor sozlamalari
                    events: {
                        // beforeCommand hodisasi
                        beforeCommand: handleEditorBeforeCommand
                    }
                }}
            />
            <button onClick={handleSave}>Save</button>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default MyEditor;
