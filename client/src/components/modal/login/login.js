import { useState } from "react";
import {Modal,Button,Form} from 'react-bootstrap';
import './login.css'
import { API,setAuthToken } from "../../../config/api";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

function Login(){
  const [state, dispatch] = useContext(UserContext)

  const [show, setShow] = useState(true);
  console.log(show)
    const [login, setLogin]=useState({
      email:"",
      password:""
    })
    const handleClose = () =>{ 
        setShow(false);
        window.location.reload()
    }
    
    const handleChange=(e)=>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }
    let history =useHistory()
    const handleSubmit =async(e)=>{
      e.preventDefault();
      const config ={
       headers:{
           "Content-type":"application/json"
       }
       }
       const response = await API.post('/login',login,config)
       console.log(response)
       localStorage.setItem("token", response.data.data.user.token);
       sessionStorage.setItem('user',JSON.stringify(state.user))
       sessionStorage.setItem('isLogin',JSON.stringify(state.isLogin))
       setAuthToken(response.data.data.user.token)
       if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
    }
       history.push('/home')
    }
   
    return(
      <Modal  show={show} onHide={handleClose}>
        <Form id="login-con">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name='email' onChange={handleChange} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" onChange={handleChange} type="password" placeholder="Password" />
          </Form.Group>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal>
    )
}
export default Login