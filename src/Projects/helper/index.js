import { isAuthenticated } from '../../auth/helper';
import { axiosInstance } from '../../axiosInstance';

export const LoadAllProjects = () => {
    return axiosInstance.get('project/',{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const loadSpecificProject = id => {
    return axiosInstance.get(`project/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const editProjectAPI = (id,data) => {
    return axiosInstance.put(`project/${id}/`,data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const deleteProjectAPI = (id) => {
    return axiosInstance.delete(`project/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const createProjectUsingData = data => {
    return axiosInstance.post('project/',data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}


export const createTaskUsingData = data => {
    return axiosInstance.post('task/',data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const loadSpecificTask = id => {
    return axiosInstance.get(`task/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const editTaskAPI = (id,data) => {
    return axiosInstance.put(`task/${id}/`,data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}


export const deleteTaskAPI = (id) => {
    return axiosInstance.delete(`task/${id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const loadAllTasks = project_id => {
    return axiosInstance.get(`task/all/${project_id}/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const loadAllFilteredTasks = project_id => {
    return axiosInstance.get(`task/all/${project_id}/me/`,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}

export const createSubTaskUsingData = (data,task_id) => {
    return axiosInstance.post(`task/sub-task/${task_id}/`,data,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}