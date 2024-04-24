import { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../img/login.png'
import { Slide } from 'react-awesome-reveal';

function Signup(){
let[name,setname]=useState('');
let [email,setemail]=useState('');
let [password,setpassword]=useState('');
let navigate=useNavigate()
let data={
    name:name,
    email:email,
    password:password,
}

function signupclick(e){
    e.preventDefault();
axios.post('home/signup/',data).then((res)=>{
    window.localStorage.setItem('token',res.data.token);
   alert('done')
}).catch((res)=>console.log(res))
}
return <div className='container-fluid'>
    <div className='row'>
        <div className='col'>

                    <Slide direction='right'>
     <div className="row">
                <div className="col-12 col-sm-7 col-md-8 mx-auto d-block rounded" style={{ marginTop: '250px' }}  >

                    <form>
                        <h3 className="mt-4">Sign up</h3>
                        <input className="form-control mt-5" value={name} type="text" onChange={(event) => setname(event.target.value)} placeholder="username"></input>
                        <input className="form-control mt-3" value={email} type="email" onChange={(event) => setemail(event.target.value)} placeholder="email"></input>
                        <input className="form-control mt-3" placeholder="password" value={password} onChange={(event) => setpassword(event.target.value)} ></input>
                        <button className="btn btn-success btn-block mx-auto d-block mt-4 mb-4" style={{background:'#7071E8',borderRadius:'20px'}}  onClick={signupclick}>signup</button>
                        
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-1 mx-auto d-block">
                    <Link className="btn btn-outline-success" to={'/login'}>login</Link>

                </div>
            </div>
                    </Slide>
        </div>
        <div className="col col-8 d-none d-md-block login">
                    <h2 style={{textAlign:'center',color:'white',marginTop:'100px'}} >Welcome To Todo </h2>
                    <img className='signup' src={img} alt='img'/>
                   
                </div>
    </div>
</div>
}
export default Signup