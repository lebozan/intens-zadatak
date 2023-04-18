import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import {Button, TextField} from "@mui/material";

const AddSkillPopup = (props) => {

    const [skillName, setSkillName] = useState('');

    return (
        <Popup
            trigger={<Button variant="contained" className="button"> Add skill </Button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Add new skill </div>
                    <div className="content">
                        <TextField
                            required
                            id="skillName"
                            label="Enter skill name"
                            variant="outlined"
                            value={skillName}
                            onChange={e => setSkillName(e.target.value)}
                        />
                    </div>
                    <div className="actions">
                        <Button
                            variant="contained"
                            className="button"
                            onClick={() => {
                                console.log('modal closed ');
                                close();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="button"
                            onClick={() => {
                                if (skillName === '') {
                                    alert('Skill name cannot be empty');
                                    return;
                                }
                                props.addNewSkill(skillName);
                                setSkillName('');
                                close();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default AddSkillPopup;