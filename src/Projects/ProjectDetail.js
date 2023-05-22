import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ProjectGrid from '../components/ProjectGrid';
import { editProjectAPI, loadSpecificProject, deleteProjectAPI } from './helper';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ProjectDetail = ({match}) => {
    const [projectData, setProjectData] = useState({
        name: '',
        avatar: '',
        description: "",
        start_date: "",
        end_date: "",
    })

    const [preview, setPreview] = useState(null);
    const [imageUpload, setImageUpload] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    const history = useHistory();

    const handleInputChange = name => 
        e => {
            setProjectData({...projectData, [name]: e.target.value});
            setEdit(true);
        }

    const handleImageChange = e => {
        e.preventDefault();
        console.log("Imahe hanfler called");
        const file = e.target.files[0];
        setProjectData({...projectData, avatar: file})
        setImageUpload(true);
        setEdit(true);
        setPreview(URL.createObjectURL(file));
    }

    const editProject = () => {
        const project_id = match.params?.id;
        const formData = new FormData;

        const start_date = new Date(projectData.start_date);
        const end_date = new Date(projectData.end_date);

        if (start_date.getTime() > end_date.getTime()) {
            toast("Start date greater than end date",{
                type: "error"
            });
            return;
        }

        for (const name in projectData) {
            if (name === "avatar") {
                if (imageUpload) {
                    formData.append(name, projectData[name], projectData[name].name);
                }
            } else {
                formData.append(name,projectData[name]);
            }
        }
        

        editProjectAPI(project_id,formData)
            .then(resp => {
                setEdit(false);
                toast("Project edited successfully!",{
                    type: "success"
                })
            })
            .catch(err => {
                console.log("Some error occured");
                toast("Something went wrong!",{
                    type: "error"
                })
            })
    }

    const deleteProject = () => {
        const project_id = match.params?.id;
        deleteProjectAPI(project_id)
            .then(resp => {
                if (resp.status=== 204) {
                    toast("Project deleted successfully!",{
                        type: "success"
                    })
                    history.push('/');
                }
            })
            .catch(err => {
                console.log("Something went wront");
                toast("Something went wrong!",{
                    type: "error"
                })
            })
    }

    useEffect(() => {
        setLoading(true);
        const project_id = match.params?.id;
        loadSpecificProject(project_id)
            .then(resp => {
                setLoading(false);
                setProjectData({
                    name: resp.data?.name,
                    avatar: resp.data?.avatar,
                    start_date: resp.data?.start_date,
                    end_date: resp.data?.end_date,
                    description: resp.data?.description
                })
            })
            .catch(err => {
                setLoading(false);
                setError(true);
                history.push("/not-found/");
                toast("Some error",{
                    type: "error"
                })
            })
    }, [])



    return (
        <div>
            <Header />
            {
                loading? (
                    <div className="text-center">
                        <Loader />
                    </div>
                ):
                (<ProjectGrid 
                    handleInputChange={handleInputChange} 
                    handleImageChange = {handleImageChange}
                    editProject={editProject}
                    deleteProject={deleteProject}
                    avatar = {projectData.avatar}
                    name ={projectData.name} 
                    description={projectData.description}
                    start_date ={projectData.start_date}
                    end_date = {projectData.end_date}
                    edit={edit}
                    preview={preview}
                    project_id={match.params?.id}
                />)
            }
        </div>
    );
};

export default ProjectDetail;