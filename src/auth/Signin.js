import React from 'react';
import BasicForm from '../components/BasicForm';
import Header from '../components/Header';
import {signin, authenticate} from './helper';
import {useHistory} from 'react-router-dom';

const Signin = () => {
    const history = useHistory();

    const handleSubmit = (userData,setUserData, response) => {
        signin(userData.email, userData.password)
            .then(resp => {
                if (resp.status === 200) {
                    authenticate(resp.data.token, resp.data.is_staff, resp.data.is_lead,resp.data.email);
                    setUserData({email: '',password: '', error: false, success: false});
                    history.push('/');
                 }
                return resp;
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setUserData({...userData, error: true,success: false});
                }
            })
    }

    return (
        <div>
            <Header />
            <div className="">
                <BasicForm formname="Sign In" handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Signin;