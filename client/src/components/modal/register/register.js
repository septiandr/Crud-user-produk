import { Modal,Button,Form} from "react-bootstrap";
import { useState,useContext} from "react";
import './register.css'
import {API,setAuthToken} from '../../../config/api'
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

export default function Register() {
  let history = useHistory()
  const [state, dispatch] = useContext(UserContext)
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
        const response = await API.post('/register',register,config)
        console.log(response)
        localStorage.setItem("token", response.data.data.user.token);
        sessionStorage.setItem('user',JSON.stringify(state.user))
        sessionStorage.setItem('isLogin',JSON.stringify(state.isLogin))
        setAuthToken(response.data.data.user.token)
        if (response.status === 200) {
          // Send data to useContext
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data.user,
          });
        }
        history.push('/home')
    }
    console.log(register)
    return (
      <Modal  show={show} onHide={handleClose}>
        <Form id="login-con">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" onChange={handleChange} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
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
  