import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { loadAllTasks,loadAllFilteredTasks } from './helper';
import Loader from '../components/Loader';

const TaskLists = ({match}) => {
    const [tasks, setTasks] = useState([]);
    const [applyFiler,setApplyFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    
    useEffect(()=>{
        setIsLoading(true);
        if (applyFiler) {
            loadAllFilteredTasks(match.params?.id)
                .then(resp => {
                    setIsLoading(false)
                    setTasks(resp.data);
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err);
                })
        } else {
            loadAllTasks(match.params?.id)
                .then(resp => {
                    setIsLoading(false)
                    setTasks(resp.data);
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err);
                })
        }
        
    },[applyFiler]);
    

    useEffect(()=>{
        setIsLoading(true);
        loadAllTasks(match.params?.id)
            .then(resp => {
                setIsLoading(false)
                setTasks(resp.data);
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err);
            })  
    },[]);
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="form-group">
                    <input className="" type="checkbox" value={applyFiler} onChange={e => setApplyFilter(e.target.checked)}/>
                    <label className="mx-2 center fw-bold mb-4" htmlFor="">Show my Incompleted tasks</label> 
                </div>
                {
                    isLoading ? (
                        <div className="text-center">
                            <Loader />
                        </div>
                    ):(
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark text-center">
                                <tr>
                                    <th>Task id</th>
                                    <th>Task Name</th>
                                    <th>Assigned To</th>
                                    <th>State</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {
                                        tasks.map(each_task => (
                                            
                                                <tr 
                                                style={{cursor: 'pointer'}}
                                                className="text-center"
                                                onClick={() => history.push(`/project/${match.params?.id}/task/${each_task.id}`)}
                                                key={each_task.id}>
                                                    <td>{each_task.id}</td>
                                                    <td>{each_task.name}</td>
                                                    <td>{each_task.assignedTo}</td>
                                                    <td>{each_task.state}</td>
                                                    <td>{each_task.end_date}</td>
                                                </tr>
                                            
                                        ))
                                    }

                                
                            </tbody>
                        </table>
                    )
                }
                {
                    tasks.length === 0 && (
                        <div className="text-center">
                            <h3 className="">No tasks to display</h3>
                        </div>
                    )
                }
                
            </div>
        </div>
    );
};

export default TaskLists;