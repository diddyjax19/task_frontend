import React from 'react';
import { AiOutlineCamera } from "react-icons/ai";
import { Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import defaultProject from '../assets/defaultProject.png';
import { isStaff,isLead } from '../auth/helper';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ReactComponent as AddIcon } from '../assets/add.svg'


const ProjectGrid = ({
    avatar,
    name,
    description,
    start_date,
    end_date,
    handleInputChange,
    handleImageChange,
    editProject,
    deleteProject,
    edit,
    preview,
    createNewProject,
    project_id
}) => {

    return (
        <div className="container py-5">
            <form onSubmit={e => e.preventDefault()}>
                <div className="">
                    <ul className="nav justify-content-center">
                        {
                            !createNewProject && isStaff() && isLead && (<li className="nav-item">
                                <Link to={`/project/${project_id}/task`} className="nav-link">Create Task</Link>
                            </li>)
                        }
                        {
                            !createNewProject && (
                               
                                   <MDBBtn rounded className='text-dark m-2' color='light' >
                                    <Link to={`/project/${project_id}/tasklist/`} >Show Tasks</Link>
                                  </MDBBtn>
                            )
                        }
                        
                        
                    </ul>
                </div>
                <div className="text-center">
                    <img src={preview ? preview: avatar ? avatar: defaultProject} 
                    
                    className="img-fluid d-block mx-auto img-thumbnail bg-dark"
                    style={{height: "200px", width: "auto"}} alt="" />
                    <label className="mx-auto" style={{fontSize: "50px"}} htmlFor="file-upload"><AiOutlineCamera /></label>
                    <input 
                    onChange={handleImageChange}
                    type="file" id="file-upload" style={{display: "none"}} />
                </div>
                <div className="ml-auto" style={{textAlign: "right"}}>
                    {
                        isStaff() && editProject && (<button disabled={!edit} 
                        onClick={editProject}
                        className="btn btn-success">Save</button>)
                    }

                    {
                        isStaff() && deleteProject && (
                            <button 
                            onClick={deleteProject}
                            className="btn btn-danger">Delete</button>
                        )
                    }
                    
                    
                </div>
                
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Project name</Form.Label>
                    <Form.Control
                    value={name}
                    onChange={handleInputChange('name')}
                    required
                    type="text"
                    placeholder="Input first name"
                    />
                    <Form.Control.Feedback type="invalid">
                    This file is required.
                    </Form.Control.Feedback>
                </Form.Group>


                <div className="row my-2">
                    <div className="form-group col-md-6 col-sm-12">
                        <label className='fw-bold'>Description</label>
                        <textarea 
                        style={{height: "300px"}}
                        value={description}
                        onChange={handleInputChange('description')}
                        className="form-control" placeholder="Enter project description"></textarea>
                    </div>

                    <div className="form-group col-md-6 col-sm-12">
                        <div className="form-row my-2">
                            <label className='fw-bold'>Start Date</label>
                            <input type="date" 
                            value={start_date}
                            onChange={handleInputChange('start_date')}
                            placeholder="Select start date" className="form-control" />
                        </div>
                        <div className="form-row my-2">
                            <label className='fw-bold'>End Date</label>
                            <input 
                            value={end_date}
                            onChange={handleInputChange('end_date')}
                            type="date" placeholder="Select End date" className="form-control" />
                        </div>
                    </div>
                </div>
                {
                    createNewProject && (
                        <div className="form-group">
                            <button 
                            disabled={!name || !description || !start_date || !end_date}
                            onClick={createNewProject}
                            className="btn btn-dark d-block form-control">Create</button>
                            <AddIcon/>
                        </div>
                    )
                }
                
                
            </form>
        </div>
    );
};

export default ProjectGrid;