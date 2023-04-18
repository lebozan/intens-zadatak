import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'reactjs-popup/dist/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import SkillsComponent from "./components/SkillsComponent";
import JobCandidatesComponent from "./components/JobCandidatesComponent";
import MainPage from "./components/MainPage";
import axios from "axios";
import SearchCandidates from "./components/SearchCandidates";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path={"job-candidates"} element={<JobCandidatesComponent/>} loader={async () => {
                return axios.get('http://localhost:8080/api/job-candidates')
            }} />
            <Route path={"skills"} element={<SkillsComponent/>} loader={async () => {
                return axios.get('http://localhost:8080/api/skills')
            }}/>
            <Route path={"search"} element={<SearchCandidates/>} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
