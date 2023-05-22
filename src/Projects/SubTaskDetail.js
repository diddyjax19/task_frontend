import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import { editTaskAPI, loadSpecificTask,deleteTaskAPI } from './helper';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import SubTaskGrid from '../components/SubTaskGrid';

const SubTaskDetail = ({match}) => {

    const [taskDetails, setTaskDetails] = useState({
        name: '',
        description: '',
        start_date: "",
        end_date: "",
        assignedTo: '',
        state: "",
        user_assigned: "",
        "project": "",
    });

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const {id, task_id} = match.params;
        setIsLoading(true);
        loadSpecificTask(task_id)
            .then(resp => {
                setTaskDetails({
                    name: resp.data?.name,
                    description: resp.data?.description,
                    start_date: resp.data?.start_date,
                    end_date: resp.data?.end_date,
                    assignedTo: resp.data?.assignedTo,
                    state: resp.data?.state,
                    user_assigned: resp.data?.user_assigned,
                    project: id,
                })
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.response);
                setIsLoading(false);
                history.push("/not-found/");
            })
    },[])

    const handleInputChange = name => 
        e => {
            setTaskDetails({...taskDetails,[name]: e.target.value});
            setEdit(true);
        }

    const editTask = () => {

        const start_date = new Date(taskDetails.start_date);
        const end_date = new Date(taskDetails.end_date);
        if (start_date.getTime() > end_date.getTime()) {
            toast("Start date greater than end date",{
                type: "error"
            });
            return;
        }

        editTaskAPI(match.params?.task_id,taskDetails)
            .then(resp => {
                toast("Task edited successfully!",{
                    type: "success"
                });
                setEdit(false);
            })
            .catch(err => {
                console.log(err.response)
                toast("Something went wrong!",{
                    type: "error"
                });
            })
    }

    const deleteTask = () => {
        deleteTaskAPI(match.params?.task_id,taskDetails)
            .then(resp => {
                toast("Task deleted successfully!",{
                    type: "success"
                });
                history.push(`/project/${match.params?.id}`)
                setEdit(false);
            })
            .catch(err => {
                console.log(err.response);
                toast("Something went wrong!",{
                    type: "error"
                });
            })
    }
    
    const setAssignedTo = userid => {
        setTaskDetails({...taskDetails, assignedTo: userid})
        setEdit(true);
    }

    const ChangeUserAssigned = () => {
        setTaskDetails({...taskDetails, user_assigned: null});
    }

    return (
        <div>
            <Header />
            {
                isLoading ? (
                    <div className="text-center">
                        <Loader />
                    </div>
                ) 
                : 
                (
                    <SubTaskGrid 
                        name={taskDetails.name}
                        description={taskDetails.description}
                        start_date={taskDetails.start_date}
                        end_date={taskDetails.end_date}
                        assignedTo={taskDetails.assignedTo}
                        state={taskDetails.state}
                        user_assigned={taskDetails.user_assigned}
                        handleInputChange={handleInputChange}
                        editTask={editTask}
                        edit={edit}
                        setAssignedTo={setAssignedTo}
                        ChangeUserAssigned={ChangeUserAssigned}
                        deleteTask={deleteTask}
                        match={match}
                    />
                )
            }
            
        </div>
    );
};

export default SubTaskDetail;