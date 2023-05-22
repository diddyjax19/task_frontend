import React,{useState} from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ProjectGrid from '../components/ProjectGrid';
import { createProjectUsingData } from './helper';
import { toast } from 'react-toastify';

const CreateProject = () => {
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


    const createNewProject = (e) => {
        e.preventDefault();
        const formData = new FormData;

        const start_date = new Date(projectData.start_date)
        const end_date = new Date(projectData.end_date)

        if (start_date.getTime() > end_date.getTime()) {
            toast("Start date greater than end date",{
                type: "error"
            })
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
        

        createProjectUsingData(formData)
            .then(resp => {
                history.push("/");
                toast("New project task successfully!",{
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


    return (
        <div>
            <Header />
            <ProjectGrid 
                handleInputChange={handleInputChange} 
                handleImageChange = {handleImageChange}
                avatar = {projectData.avatar}
                name ={projectData.name} 
                description={projectData.description}
                start_date ={projectData.start_date}
                end_date = {projectData.end_date}
                edit={edit}
                preview={preview}
                createNewProject={createNewProject}
            />
        </div>
    );
};

export default CreateProject;