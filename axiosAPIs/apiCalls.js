'use client'
import { setUserData } from "@/Redux/utilSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKENDAPI}/api`
})

export const mailCowAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAILCOW
})
// jerold@12 admin@bloomindoor.in

export const getUserDataApi = async () => {
    let response = await axiosInstance.get('/auth/token', { withCredentials: true })
    return response.data
}

export const logOutUserAPI = async () => {
    try {
        let response = await axiosInstance.delete('/auth/logout', { withCredentials: true })
        return response.data
    } catch (error) {
        console.log(error);
        toast.error("Error occured")
    }
}

export const getallDomainForAdminAPI = async () => {
    let response = await axiosInstance.get('/domain/all', { withCredentials: true })
    console.log(response.data, 'Domains');
    return response.data
}


export const addDomainandMailApi = async (data) => {
    let response = await axiosInstance.post('/domain/add', data, { withCredentials: true })
    console.log(response.data, 'Adding domain api');
    return response.data
}
export const updateDomainandMailApi = async (data) => {
    let response = await axiosInstance.put('/domain/update', data, { withCredentials: true })
    console.log(response.data, 'update domain api');
    return response.data
}


export const getParticularDomainDetailsAPI = async (domain) => {
    let response = await axiosInstance.get(`/domain/${domain}`, { withCredentials: true })
    
    console.log(response.data, 'Particular domain detail');
   
    return response.data
}


export const dnsRecordDomain = async (domain) => {
    let response = await axiosInstance.post(`/domain/check-dns`, { domain }, { withCredentials: true })
    console.log('DNS record for ', domain, response.data);
    return response.data
}

export const deletemultipleMail = async (mail, setloading) => {
    try {
        setloading(true)
        let response = await axiosInstance.post('/mail/delete', { mail }, { withCredentials: true })
        toast.success("Deleted successfully")
        window.location.reload()
        setloading(false)
    } catch (error) {
        console.log(error);
        setloading(false)
        toast.error("Erro occured")
    }
}