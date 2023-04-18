import {useLoaderData} from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import * as React from 'react';
import AddSkillPopup from "./AddSkillPopup";
import axios from "axios";

const SkillsComponent = (props) => {

    const [skillsArray, setSkillsArray] = useState(useLoaderData().data);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    useEffect(() => {

    }, [skillsArray]);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const addNewSkill = (newSkillName) => {
        let newSkill = {skillName: newSkillName}
        const newArray = skillsArray;
        axios.post('http://localhost:8080/api/skills', newSkill).then(
            response => {
                if (response.status === 201) {
                    newArray.push(newSkill);
                    setSkillsArray(newArray);
                }
            },
            reason => {
                alert(reason);
            }
        );
    }

    const shouldElementShowOnTable = (row, index) => {
        return index >= page*rowsPerPage && index < page*rowsPerPage+rowsPerPage;
    }

    return (
      <div>
          <h2>Skills page</h2>
          {/*<Button onClick={addNewSkill} variant='contained'>Add skill</Button>*/}
          <AddSkillPopup addNewSkill={addNewSkill}/>
          <div className="tableDiv" style={{maxWidth: '500px', justifyContent: 'center', left: '30%'}}>
              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell align="left">Skill Name</TableCell>

                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {skillsArray.filter(shouldElementShowOnTable).map((row, index) => (
                              <TableRow
                                  key={row.skillName + index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                  <TableCell align="left">{row.skillName}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  component="div"
                  count={skillsArray.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5]}
              />
          </div>
      </div>
    );
};

export default SkillsComponent;