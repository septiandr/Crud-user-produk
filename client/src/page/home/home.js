import { Button, Table } from "react-bootstrap"
import { useEffect } from "react"
import { API } from '../../config/api';
import { useState } from "react";
import './home.css'
import Navtop from "../../components/navbar/nav";
import EditUser from "../../components/modal/editUser/editUser";

export default function Home(){
    const [user,setUsers]=useState([])
    const getUsers =async()=>{
        const response = await API.get(`/users`)
        console.log(response)
        setUsers(response.data.data.users)
     
    }
    
    useEffect(()=>{
        getUsers()
    },[])
    return(
    <>
        <Navtop/>
        <div className="home-con">
            <h1>User List</h1>
            <Table  id="user-table" striped bordered hover variant="dark">
            <thead >
                <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((props,index)=>(<Card props={props} index={index+1}/>))}
            </tbody>
            </Table>
        </div>
    </>
    )
}

function Card({props,index}){
    const [modal,setModal]=useState(false)
    const remove =async()=>{
        const response = await API.delete(`/user/${props.id}`)
        console.log(response)
        window.location.reload()
    }
    return(
        <tr>
            {modal && <EditUser id={props.id}/>}
            <td>{index}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.gender}</td>
            <td className="btn-table">
                <Button variant="primary" onClick={()=>setModal(true)}>Edit</Button>
                <Button variant="danger" onClick={remove}>Delete</Button>
            </td>
        </tr>
    )
}