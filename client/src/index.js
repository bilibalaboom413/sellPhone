import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from "./Homepage/homepage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


ReactDOM.render(


    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'));
