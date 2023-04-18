import {useEffect, useState} from "react";
import axios from "axios";
import {
    Box, Button,
    FormControl,
    InputLabel, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import {SelectChangeEvent} from "@mui/material";
import AddSkillToCandidate from "./AddSkillToCandidate";

const SearchCandidates = (props) => {


    const [skills, setSkills] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState('all');


    useEffect(() => {
        axios.get('http://localhost:8080/api/job-candidates')
            .then(
                response => {
                    setCandidates(response.data)
                },
                reason => {
                    alert(reason)
                }
            );
        axios.get('http://localhost:8080/api/skills')
            .then(
                response => {
                    setSkills(response.data)
                },
                reason => {
                    alert(reason)
                }
            );
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSkill(event.target.value);
    };

    const candidateSkillsFilter = (row, index) => {
        if (selectedSkill === 'all') {
            return true;
        }
        return row.skills.includes(selectedSkill)

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



    return (
        <div>
            <Box sx={{ maxWidth: 200, marginTop: '20px'}}>
                <FormControl fullWidth>
                    <InputLabel id="skills-select-label">Select skill</InputLabel>
                    <Select
                        labelId="skills-select-label"
                        id="skills-select"
                        value={selectedSkill}
                        label="Select skill"
                        onChange={handleChange}
                    >
                        <MenuItem value={'all'}>Show all</MenuItem>
                        {skills.map((skill, index) => (
                            <MenuItem key={skill.skillName + index} value={skill.skillName}>{skill.skillName}</MenuItem>
                        ))}
                    </Select>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.filter(candidateSkillsFilter).map((row, index) => (
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