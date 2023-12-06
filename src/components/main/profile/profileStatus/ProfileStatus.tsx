import React, {useState} from 'react';
import {useSelector} from "react-redux";

export const ProfileStatus = () => {
    const [editMode, setEditMode] = useState(false)
    return (
        <div>
            <div>
                <span>text</span>
            </div>
            <div>
                <input type="text"/>
            </div>
        </div>
    );
};