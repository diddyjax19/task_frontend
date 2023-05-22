import React from 'react';
import Routing from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/custom.css";

const App = () => {
    return (
        <>
            <ToastContainer />
            <div>
                <Routing />
            </div>
        </>
    );
};

export default App;