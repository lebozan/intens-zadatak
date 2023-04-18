import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import {Button, TextField} from "@mui/material";

const AddJobCandidatePopup = (props) => {
    
    const [candidateName, setCandidateName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');


    return (
        <Popup
            trigger={<Button variant="contained" className="button"> Add candidate </Button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Add new skill </div>
                    <div className="content" style={{justifyContent:'space-around'}}>
                        <TextField
                            id="candidateName"
                            label="Enter candidate name"
                            variant="outlined"
                            value={candidateName}
                            onChange={e => setCandidateName(e.target.value)}
                        />
                        <TextField
                            id="email"
                            label="Enter candidate email"
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            id="contactNumber"
                            label="Enter contact number"
                            variant="outlined"
                            value={contactNumber}
                            onChange={e => setContactNumber(e.target.value)}
                        />
                        <TextField
                            id="dateOfBirth"
                            label="Enter date of birth (yyyy-mm-dd)"
                            variant="outlined"
                            value={dateOfBirth}
                            onChange={e => setDateOfBirth(e.target.value)}
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
                                let errorString = '';
                                if (candidateName === '') {
                                    errorString += 'Candidate name cannot be empty!\n';
                                }
                                if (email === '') {
                                    errorString += 'Email cannot be empty!\n';
                                }
                                if (contactNumber === '') {
                                    errorString += 'Contact number cannot be empty!\n';
                                }
                                if (dateOfBirth === '') {
                                    errorString += 'Date of birth cannot be empty!\n';
                                }
                                if (errorString !== '') {
                                    alert(errorString);
                                    return;
                                }
                                const newCandidate = {
                                    name: candidateName,
                                    email: email,
                                    contactNumber: contactNumber,
                                    dateOfBirth: dateOfBirth
                                }
                                props.addNewJobCandidate(newCandidate);
                                setCandidateName('');
                                setEmail('');
                                setContactNumber('');
                                setDateOfBirth('');
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

export default AddJobCandidatePopup;