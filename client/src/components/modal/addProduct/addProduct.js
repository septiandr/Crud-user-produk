import { useState } from "react";
import {Modal,Button,Form} from 'react-bootstrap';
import { useEffect } from "react";
import { API } from "../../../config/api";
import { useHistory } from "react-router-dom";

function AddProduct(){
  const [show, setShow] = useState(true);
  console.log(show)
    const [form, setForm]=useState({
      name:"",
      total:"",
      price:"",
      userId:""
    })
    const handleClose = () =>{ 
        setShow(false);
        window.location.reload()
    }
    
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const [user,setUsers]=useState([])
    const getUsers =async()=>{
        const response = await API.get(`/users`)
        console.log(response)
        setUsers(response.data.data.users)
     
    }
    let history = useHistory()
    useEffect(()=>{
        getUsers()
    },[])
    const submit=async()=>{
        const config ={
            headers:{
                "Content-type":"application/json"
            }
            }
            const response = await API.post(`/product`,form,config)
            console.log(response)
            history.push('/product')
    }
    return(
      <Modal  show={show} onHide={handleClose}>
        <Form id="login-con">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control name='name' onChange={handleChange} type="text" placeholder="Product Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Total</Form.Label>
            <Form.Control name='total' onChange={handleChange} type="number" placeholder="Total Product" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control name='price' onChange={handleChange} type="number" placeholder="Price" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>User</Form.Label>
            <Form.Select name="userId" onChange={handleChange} >
              <option disabled selected>-Select-</option>
              {user.map((item)=>(<option value={item.id}>{item.name}</option>))}
            </Form.Select>
          </Form.Group>
          <Button onClick={submit} variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal>
    )
}
export default AddProduct