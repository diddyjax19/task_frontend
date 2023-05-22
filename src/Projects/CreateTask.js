import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import TaskGrid from '../components/TaskGrid';
import {createTaskUsingData} from './helper';
import { toast } from 'react-toastify';


const CreateTask = ({match}) => {
    const [taskDetails, setTaskDetails] = useState({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        state: "NEW",
        assignedTo: "",
        project: "",
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const handleInputChange = name => 
        e => {
            setTaskDetails({...taskDetails, [name]: e.target.value});
        }

    useEffect(() => {
        const project_id = match.params?.id;
        setTaskDetails({...taskDetails,project: project_id});
    },[]);
    
    const createNewTask = e => {
        e.preventDefault();
        const start_date = new Date(taskDetails.start_date)
        const end_date = new Date(taskDetails.end_date)
        if (start_date.getTime() > end_date.getTime()) {
            toast("Start date greater than end date",{
                type: "error"
            });
            return
        }


        createTaskUsingData(taskDetails)
            .then(resp => {
                toast("Task created successfully!",{
                    type: "success"
                });
                history.push(`/project/${match.params?.id}/task/${resp.data?.id}`);
            })
            .catch(err => {
                console.log(err.response);
                setLoading(false);
                setError(true);
                console.log(err);
                toast("Something went wronf",{
                    type: "error"
                })
            })
    }

    const setAssignedTo = userid => {
        setTaskDetails({...taskDetails, assignedTo: userid})
    }
    

    return (
        <div>
            <Header />
            <TaskGrid 
                createNewTask={createNewTask}
                handleInputChange={handleInputChange}
                name={taskDetails.name}
                description={taskDetails.description}
                start_date={taskDetails.start_date}
                end_date={taskDetails.end_date}
                createNewTask={createNewTask}
                state={taskDetails.state}
                setAssignedTo={setAssignedTo}

            />
        </div>
    );
};

export default CreateTask;