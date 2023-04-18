import {AppBar, Box, Button, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

export default function MainPage(props) {


    useEffect(() => {

    }, []);


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar >

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                            Home page
                            <Link to={"/"}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                            <Link to={"/skills"} style={{color:'black'}}>
                                <Button
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    Skills
                                </Button>
                            </Link>
                            <Link to={"/job-candidates"} style={{color:'black'}}>
                                <Button
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    Job candidates
                                </Button>
                            </Link>
                            <Link to={"/search"} style={{color:'black'}}>
                                <Button
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    Search candidates
                                </Button>
                            </Link>
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet/>
        </div>
    );
}