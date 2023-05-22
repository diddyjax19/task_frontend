import { isAuthenticated } from "../../auth/helper";
import { axiosInstance } from "../../axiosInstance";

export const getPaginatedSubTasks = (url) => {
    return axiosInstance.get(url,{
        headers: {
            Authorization: `Token ${isAuthenticated()}`
        }
    })
}