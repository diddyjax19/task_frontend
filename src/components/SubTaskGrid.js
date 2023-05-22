import React,{useState,useEffect} from 'react';

import { isAuthenticated, isLead } from '../auth/helper';
import { axiosInstance } from '../axiosInstance';



const SubTaskGrid = ({
    name,
    description,
    start_date,
    end_date,
    handleInputChange,
    editTask,
    deleteTask,
    edit,
    createNewTask,
    setAssignedTo,
    user_assigned,
    state,
    ChangeUserAssigned
}) => {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('');
    
    useEffect(()=>{
        if (user_assigned) {
            setEmail(user_assigned);
            ChangeUserAssigned()
        }
    }, []);

    const showUsersInDropdown = (email) => {
        axiosInstance.get(`user/search/${email}`,{
            headers: {
                Authorization: `Token ${isAuthenticated()}`
            }
        })
            .then(resp => {
                setUsers(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onEmailChange = e => {
        setEmail(e.target.value);
        showUsersInDropdown(e.target.value)
    }



    return (
        <div className="container py-5">
            <form onSubmit={e => e.preventDefault()}>
                
                
                <div className="ml-auto" style={{textAlign: "right"}}>
                    
                    {
                        !createNewTask && (<button disabled={!edit} 
                        onClick={editTask}
                        className="btn btn-success">Save</button>)
                    }
                    
                    

                    {
                        isLead() && deleteTask && (
                            <button 
                            onClick={deleteTask}
                            className="btn btn-danger">Delete</button>
                        )
                    }
                    
                    
                </div>
                <div className="form-row my-2">
                    <div className="col">
                        <label>Sub-Task name</label>
                        <input type="text" placeholder="Enter project name" 
                            value={name}
                            onChange={handleInputChange('name')}
                            className="form-control" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">State</label>
                            <select 
                                value={state}
                                onChange={handleInputChange('state')} class="form-control" id="exampleFormControlSelect1">
                                {/* <option selected disabled>Select state</option> */}
                                <option value="NEW">NEW</option>
                                <option value="IN PROGRESS">IN PROGRESS</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label htmlFor="">Assigned To</label>
                            <input 
                            placeholder="Assign to"
                            value={email}
                            onChange={onEmailChange}
                            type="text" className="form-control" name="" id="" />
                            {/* suggestion dropdown */}
                            <div className="username-input">
                                <div className="username-dropdown border">
                                    <ul class="list-group">
                                        {
                                            users.length > 0 && users.map(each => (
                                                <li key={each.id} 
                                                style={{cursor: "pointer"}}
                                                onClick={e => {setAssignedTo(each.id); setEmail(each.email); setUsers([])}}
                                                class="list-group-item">{each.email}</li>
                                            ))
                                        }
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="form-group col-md-6 col-sm-12">
                        <label>Description</label>
                        <textarea 
                        style={{height: "300px"}}
                        value={description}
                        onChange={handleInputChange('description')}
                        className="form-control" placeholder="Enter project description"></textarea>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <div className="form-row my-2">
                            <label>Start Date</label>
                            <input type="date" 
                            value={start_date}
                            onChange={handleInputChange('start_date')}
                            placeholder="Select start date" className="form-control" />
                        </div>
                        <div className="form-row my-2">
                            <label>End Date</label>
                            <input 
                            value={end_date}
                            onChange={handleInputChange('end_date')}
                            type="date" placeholder="Select End date" className="form-control" />
                        </div>
                    </div>
                </div>
                {
                    createNewTask && (
                        <div className="form-group">
                            <button 
                            disabled={!name || !description || !start_date || !end_date}
                            onClick={createNewTask}
                            className="btn btn-primary d-block form-control">Create Sub Task</button>
                        </div>
                    )
                }
                
                
            </form>
        </div>
    );
};

export default SubTaskGrid;