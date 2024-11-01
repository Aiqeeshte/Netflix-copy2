import React, {useState} from 'react'
import './Login.css'
import logo from '../../assets/lego.png'
import { login, signup } from '../../firebase'
import netfilx_spinner from '../../assets/netflix_spinner.gif'


const Login = () => {

  const [signState, setSignState ] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState==="Sign In"){
      await login(email, password);
    }else{
      await signup(name, email, password);
    }
    setLoading(false);
  }


  return (
    loading?<div className="loggin-spinner">
      <img src={netfilx_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='logo-icon' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='your name'/>:<></> }
          <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email'></input>
          <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'></input>
          <button onClick={user_auth} type='submit'>Sign In</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help</p>
          </div>
        </form>
        <div className="form-switch">
          <p>New to Netfix <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          <p>Already have account <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
        </div>
      </div>
      </div>
    
  )
}

export default Login