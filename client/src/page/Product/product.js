import { Button, Table } from "react-bootstrap"
import { useEffect } from "react"
import { API } from '../../config/api';
import { useState } from "react";
import './product.css'
import Navtop from "../../components/navbar/nav";
import AddProduct from "../../components/modal/addProduct/addProduct";
import EditProduct from "../../components/modal/editProduct/editProduct";

export default function Product(){
    const [product,setProducts]=useState([])
    const getProducts =async()=>{
        const response = await API.get(`/products`)
        console.log(response)
        setProducts(response.data.products)
     
    }
    
    useEffect(()=>{
        getProducts()
    },[])
    const [modal,setModal]= useState(false)
    return(<>
        {modal && <AddProduct/>}
        <Navtop/>
        <div className="home-con">
            <div className="top">
                <h1>Product List</h1>
                <Button variant="primary" onClick={()=>setModal(true)}>Add Product</Button>
            </div>
            
            <Table  id="user-table" striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>No</th>
                <th>User Name</th>
                <th>Product</th>
                <th>Total</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {product.map((props,index)=>(<Card props={props} index={index+1}/>))}
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
            {modal && <EditProduct id={props.id}/>}
            <td>{index}</td>
            <td>{props.user.name}</td>
            <td>{props.name}</td>
            <td>{props.total}</td>
            <td>{props.price}</td>
            <td className="btn-table">
                <Button variant="primary" onClick={()=>setModal(true)}>Edit</Button>
                <Button variant="danger" onClick={remove}>Delete</Button>
            </td>
        </tr>
    )
}