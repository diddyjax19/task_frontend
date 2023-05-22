import React from 'react';
import { Link } from 'react-router-dom';
import defaultProject from '../assets/defaultProject.png';

const ProjectCard = ({id,avatar,name,description}) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
            <div class="card">
                <img src={avatar? avatar: defaultProject} style={{height: "250px", width: "auto"}} className="card-img-top img-fluid" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    
                    <p className="card-text text-justify">{description.slice(0,255)}...</p>
                    
                    <Link to={`/project/${id}`} className="btn btn-dark mx-auto d-block">View</Link>
                </div>
                
            </div>
        </div>                    
    );
};

export default ProjectCard;