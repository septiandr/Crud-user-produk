import './startingPage.css';
import { useState } from 'react';
import Login from '../../components/modal/login/login'
import Register from '../../components/modal/register/register';

function StartingPage() {
    const [getmodalLogin,setModalLogin]=useState(false)
    const [getmodalRegister,setModalRegister]=useState(false)
    console.log(getmodalLogin)
  return (
    <>
        <div className="starting-con">
        {getmodalLogin && <Login/>}
        {getmodalRegister && <Register/>}
            <div className='btn'>
                <button onClick ={()=>setModalLogin(!getmodalLogin)}>Login</button>
                <button onClick ={()=>setModalRegister(!getmodalRegister)}>Register</button>
            </div>
        </div>
        
    </>
  );
}

export default StartingPage;
