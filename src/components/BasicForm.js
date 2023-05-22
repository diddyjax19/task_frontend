import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Form } from "react-bootstrap";

const BasicForm = ({formname = "Sign Up", handleSubmit}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        error: false,
        success: false,
    })

    const handleChange = name => 
        e => setUserData(
            {
                ...userData,[name]: e.target.value, error: false, success: false
            }
        );

    const handleFormSubmit = e => {
        e.preventDefault();
        handleSubmit(userData, setUserData);
    }


    return (
        <div className="card col-sm-10 col-lg-6 mx-auto mt-5 border border-primary">
            <div className="card-header bg-dark text-light text-center py-2">
                <h3>{formname}</h3>
            </div>
            <Form
                id="registration-form"
                className="border p-4 "
                noValidate
                
                onSubmit={handleFormSubmit}
                data-testid="login-form"
            >
            {/* <form className="p-3" onSubmit={handleFormSubmit}> */}
                <div className="">
                    {
                        userData.success && (
                            <div className="alert alert-success">
                                Your account is created successfully. Please <Link to="/signin">Login</Link>
                            </div>
                        )
                    }

                    {
                        userData.error && (
                            <div className="alert alert-danger">
                                Something went wrong.
                            </div>
                        )
                    }
                </div>
            

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Username</Form.Label>
                    <Form.Control
                    value={userData.email}
                    data-testid="username-field"
                    onChange={handleChange('email')}
                    required
                    type="email"
                    placeholder="Enter Email"
                    
                    />
                    
                    <Form.Control.Feedback type="invalid">
                    This file is required.
                    </Form.Control.Feedback>
                </Form.Group>
                

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control
                    value={userData.password}
                    data-testid="password-field"
                    minLength="8"
                    onChange={handleChange('password')}
                    required
                    type="password"
                    placeholder="Enter Password"
                    />
                    <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

                <button type="submit" className="d-block mx-auto btn btn-dark px-5">
                    {formname}
                </button>
            {/* </form> */}
            </Form>
        </div>
    );
};

export default BasicForm;