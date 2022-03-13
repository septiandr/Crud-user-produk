import { Modal,Button,Form} from "react-bootstrap";
import { useState} from "react";
import {API,setAuthToken} from '../../../config/api'
import { useHistory } from "react-router-dom";

export default function EditUser(props) {
    console.log(props.id)
  let history = useHistory()
  const [show, setShow] = useState(true);
    const [register, setRegister]=useState({
        email:"",
        password:"",
        name:"",
        gender:""
    })
    const handleClose = () =>{ 
        setShow(false);
        window.location.reload()
    }
    
    const handleChange=(e)=>{
        setRegister({
            ...register,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
       const config ={
        headers:{
            "Content-type":"application/json"
        }
        }
        const response = await API.put(`/user/${props.id}`,register,config)
        console.log(response)
        history.push('/home')
    }
   
    return (
      <Modal  show={show} onHide={handleClose}>
        <Form id="login-con">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" onChange={handleChange} type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={handleChange} >
              <option disabled selected>-Select-</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Modal>
    );
  }
  