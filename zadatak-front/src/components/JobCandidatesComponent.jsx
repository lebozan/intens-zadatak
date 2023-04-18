import {useLoaderData} from "react-router-dom";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import AddJobCandidatePopup from "./AddJobCandidatePopup";
import axios from "axios";
import {useEffect, useState} from "react";

const JobCandidatesComponent = (props) => {

    const [allCandidates, setAllCandidates] = useState(useLoaderData().data);


    useEffect(() => {

    }, [allCandidates]);
    const addJobCandidate = (newCandidate) => {
        axios.post('http://localhost:8080/api/job-candidates', newCandidate).then(
            response => {
                if (response.status === 201) {
                    allCandidates.push(newCandidate);
                    setAllCandidates(allCandidates);
                }
            },
            reason => {
                alert(reason);
            }
        );
    }

    return (
        <div>
            <h2>Job candidates page</h2>
            <AddJobCandidatePopup addNewJobCandidate={addJobCandidate}/>
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
                            {allCandidates.map((row, index) => (
                                <TableRow
                                    key={row.name + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.contactNumber}</TableCell>
                                    <TableCell align="right">{new Date(row.dateOfBirth).toLocaleDateString('en-GB')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
};

export default JobCandidatesComponent;