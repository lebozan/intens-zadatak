import {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    FormControl, Grid,
    InputLabel, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import {SelectChangeEvent} from "@mui/material";
import AddSkillToCandidate from "./AddSkillToCandidate";
import RemoveSkillFromCandidate from "./RemoveSkillFromCandidate";

const SearchCandidates = (props) => {


    const [skills, setSkills] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('all');
    const [searchField, setSearchField] = useState('');
    const [filteredCandidates, setFilteredCandidates] = useState([]);


    useEffect(() => {
        if (candidates.length === 0) {
            axios.get('http://localhost:8080/api/job-candidates')
                .then(
                    response => {
                        setCandidates(response.data)
                        if (filteredCandidates.length === 0) {
                            setFilteredCandidates(response.data)
                        }
                    },
                    reason => {
                        alert(reason)
                    }
                );
        }

        if (skills.length === 0) {
            axios.get('http://localhost:8080/api/skills')
                .then(
                    response => {
                        setSkills(response.data)
                    },
                    reason => {
                        alert(reason)
                    }
                );
        }
    }, [selectedSkill, searchField]);


    const candidatesFilter = (candidates) => {
        let filtered = candidates;
        if (selectedSkill !== 'all') {
            filtered = filtered.filter((row) => row.skills.includes(selectedSkill));
        }
        if (searchField !== '') {
            filtered = filtered.filter((row) => row.name.includes(searchField));
        }
        return filtered;
    }

    const addSkillToCandidateRequest = (skillName, candidateId) => {
        axios.put('http://localhost:8080/api/job-candidates/' + candidateId, {skillName: skillName})
            .then(
              response => {
                  if (response.status === 200) {
                      alert('Skill added to candidate!')
                  }
              },
                reason => {
                  alert('Candidate already has that skill!')
                }
            );
        // console.log(skillName, candidateId)
    }

    const removeSkillFromCandidate = (skillName, candidateId) => {
      axios.delete('http://localhost:8080/api/job-candidates/' + candidateId + '/skill/' + skillName)
          .then(
              response => {
                  if (response.status === 200) {
                      alert('Skill successfully deleted from candidate!');
                  }
              },
              reason => {
                  alert(reason);
              }
          );
    }


    return (
        <div>
            <Box sx={{ width: '40%', marginTop: '20px'}}>
                <FormControl fullWidth>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <InputLabel id="skills-select-label">Select skill</InputLabel>
                            <Select
                                labelId="skills-select-label"
                                id="skills-select"
                                value={selectedSkill}
                                label="Select skill"
                                onChange={(event) => {
                                        setSelectedSkill(event.target.value);
                                    }
                                }

                            >
                                <MenuItem value={'all'}>Show all</MenuItem>
                                {skills.map((skill, index) => (
                                    <MenuItem key={skill.skillName + index} value={skill.skillName}>{skill.skillName}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                id="search-field"
                                label="Search"
                                variant="outlined"
                                value={searchField}
                                onChange={(event) => {
                                        setSearchField(event.target.value);
                                    }
                                }
                            />
                        </Grid>
                    </Grid>

                </FormControl>

            </Box>

            <div className="tableDiv" style={{width: '50%', justifyContent: 'center', left: '30%'}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">E-mail</TableCell>
                                <TableCell align="right">Contact number</TableCell>
                                <TableCell align="right">Date of birth</TableCell>
                                <TableCell align="right">Candidate's skills</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidatesFilter(filteredCandidates).map((row, index) => (
                                <TableRow
                                    key={row.name + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.contactNumber}</TableCell>
                                    <TableCell align="right">{new Date(row.dateOfBirth).toLocaleDateString('en-GB')}</TableCell>
                                    <TableCell align="center">{row.skills.join(" | ")}</TableCell>
                                    <TableCell align="right">
                                        <AddSkillToCandidate skills={skills} candidateId={index+1}
                                                             addNewSkillToCandidate={addSkillToCandidateRequest}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <RemoveSkillFromCandidate candidateId={index+1} skills={row.skills}
                                                                  removeSkill={removeSkillFromCandidate}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default SearchCandidates;