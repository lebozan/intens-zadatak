import {Button, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Popup from "reactjs-popup";
import React, {useState} from "react";

const RemoveSkillFromCandidate = (props) => {

    const [selectedSkill, setSelectedSkill] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSkill(event.target.value);
    };

    return (
        <div>
            <Popup
                trigger={<Button variant="contained" className="button"> Remove skill from candidate </Button>}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Remove skill </div>
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
                                    <MenuItem key={skill + index} value={skill}>{skill}</MenuItem>
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
                                    props.removeSkill(selectedSkill, props.candidateId);
                                    close();
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default RemoveSkillFromCandidate;