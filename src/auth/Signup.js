import React from 'react';
import BasicForm from '../components/BasicForm';
import Header from '../components/Header';
import {signup} from './helper';

const Signup = () => {

    const handleSubmit = (userData,setUserData) => {
        signup(userData.email, userData.password)
            .then(resp => {
                if (resp.status === 201) {
                    setUserData({email: '',password: '', error: false, success: true});
                }
                return resp;
            })
            .catch(err => {
                if (err.resp.status === 400) {
                    setUserData({...userData, error: true,success: false});
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setUserData({...userData, error: true, success: false});
                }
            })
    }


    return (
        <div>
            <Header />
            <div className="">
                <BasicForm formname="Sign Up" handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Signup;