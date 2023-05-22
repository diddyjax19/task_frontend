import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { isLead, isStaff } from '../auth/helper';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import { LoadAllProjects } from './helper';
import {toast} from 'react-toastify';
import '../App.css'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const ProjectHome = () => {

    const [projects, setProjects] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");

  const data = Object.values(projects);
  const search_parameters = Object.keys(Object.assign({}, ...data));
  const filter_items = [...new Set(data.map((item) => item.name))];

    //search function
    function search(projects) {
        return projects.filter(
          (item) =>
          item.name.includes(filter) &&
            search_parameters.some((parameter) =>
              item[parameter].toString().toLowerCase().includes(query)
            )
        );
      }

    const history = useHistory();
    const loadAll = () => {
        setLoaded(true);
        LoadAllProjects()
            .then(resp => {
                setProjects(resp.data);
                setLoaded(false);
            })
            .catch(err => {
                console.log(err);
                setLoaded(false);
                toast("Something went wrong",{
                    type: "error"
                })
            })
    }

    useEffect(() => {
        loadAll();
        
    },[]);

    return (
        <>
            <Header />
            <div className="container">
            <div className="wrapper">
          <div className="search-wrapper">
              <label htmlFor="search-form">
                  <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Search "
                      onChange={(e) => setQuery(e.target.value)}
                  />

              </label>

          {/* filter */}
          <div className="select">
                  <select
                      onChange={(e) => setFilter(e.target.value)}
                      className="custom-select"
                      aria-label="Filter Tasks"
                  >
                      <option value="">Tasklist</option>
                      {filter_items.map((item) => (
                          <option value={item}> {item}</option>
                      ))}
                  </select>
                  <span className="focus"></span>
              </div>
          </div>
        </div>
                {/* show create button for admin */}
                {
                    isStaff() && (
                        <div className="my-3" style={{textAlign: "right"}}>
                            <button 
                            onClick={() => history.push("/create/project")}
                            className="btn btn-success">
                                <AddIcon />
                            </button>
                        </div>
                    )
                }

                <div className="row py-5">                    
                    {
                        loaded ? (
                            <div className="text-center">
                                <Loader />
                            </div>
                        ) 
                        : 
                        (
                            search(projects).map(project => (
                                <ProjectCard key={project.id} 
                                    id={project.id} 
                                    avatar={project.avatar} 
                                    name={project.name} 
                                    description={project.description}/>
                            ))
                        )
                        
                    }
                    
                </div>
            </div>
        </>
    );
};

export default ProjectHome;