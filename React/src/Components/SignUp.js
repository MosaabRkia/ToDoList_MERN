import {React,useState , useEffect} from 'react';
import {/* useHistory,*/ withRouter } from 'react-router';
import '../Style/SignUp.css'


function SignUp(props) {
const [email,setEmail] = useState();
const [password,setPassword] = useState();
// const history = useHistory();

useEffect(()=>{
fetch('/checkIfLoginedBefore').then(r=>r.json()).then(data=>{
  if(data.cok === true){
    props.history.push('/TaskAdd');
  }
})
},[])

function CreateAUser(){
    try{
      console.log('creating new user')
        fetch('/CreateAUserOrLogin',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
          }).then(r=>r.json()).then(data=>{
            console.log(data)
            if(data.Login === true){
              console.log('worked')
              props.history.push('/LoadPage');
            }
          })
        }
    catch(e){
      console.log("error :" , e)
    }
}

    return (
        <div id="FormOfSignUp">
            <h1>Register/Login</h1>
            <small>if you already registered you can use same form to login !</small>
      <input id="InputOfText"  className="form-control" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" type="email"/>
      <input id="InputOfText"  className="form-control" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"type="password"/>
      <input id="InputOfText"  className="btn btn-primary" onClick={CreateAUser} value="Register / Login" type="button"/>
        </div>
    )
}
export default withRouter(SignUp)
