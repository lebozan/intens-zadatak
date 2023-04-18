import Popup from "reactjs-popup";
import {Button, InputLabel, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";


const AddSkillToCandidate = (props) => {


    const [selectedSkill, setSelectedSkill] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSkill(event.target.value);
    };


    return (
        <Popup
            trigger={<Button variant="contained" className="button"> Add skill to candidate </Button>}
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
                        <InputLabel id="skills-select-label">Select skill</InputLabel>
                        <Select
                            labelId="skills-select-label"
                            id="skills-select"
                            value={selectedSkill}
                            label="Select skill"
                            onChange={handleChange}
                        >
                            {props.skills.map((skill, index) => (
                                <MenuItem key={skill.skillName + index} value={skill.skillName}>{skill.skillName}</MenuItem>
                            ))}
                        </Select>
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
                                if (selectedSkill === '') {
                                    alert('Must select skill');
                                    return;
                                }
                                props.addNewSkillToCandidate(selectedSkill, props.candidateId);
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

export default AddSkillToCandidate;