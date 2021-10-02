import {React,useState , useEffect} from 'react';
import { withRouter } from 'react-router';
import '../Style/TaskAdd.css'
import LoadPage from './LoadPage';

function TaskAdd(props) {

  const [taskName,setTaskName] = useState();
  const [description,setDescription] = useState();
  const [listOfTasks,setListOfTasks] = useState([{Title:"Empty",Description:"Empty",Done:true}]);
  const [Image,setImage]=useState(false)
const urlLoading = 'https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg'
  useEffect(()=>{
updateList()
  },[])
  
  function updateList(){
    fetch('/getTasks').then(r=>r.json()).then(data=>{
      setListOfTasks(data)  
    })
    console.log(listOfTasks)
  }
    function addTask(){
      if(taskName !== undefined && taskName !== null){
              fetch('/AddNewTask',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({taskName,description})
        }).then(r=>r.json()).then(data=>{
          setImage(true)
          setTimeout(()=>{
            setTimeout(()=>{
              setImage(false)
            },1000)
            updateList()
          },3000)
          
        })
      }
  
        }

function removeOne(e){
//fetch to remove
}

    return (
        <div>
      <input  className="form-control" onChange={(e)=>setTaskName(e.target.value)} placeholder="Enter Task/Name" type="text"/>
      <input style={{height:"100px"}}  className="form-control" onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Description"type="text"/>
      <input className="btn btn-primary" onClick={addTask} value="Add" type="button"/>
      {Image?<img style={{margin:"10px auto",width:"50px",height:"50px" ,display:"block"}} src={urlLoading}/>:<img style={{width:"50px",height:"50px" ,display:"none"}} />}
<ul className="list-group">
{listOfTasks.map((e)=>{
 return <li id={e.Done?"Done":"NotDone"} className="list-group-item"><h1>{e.Title}</h1><br/><p>{e.Description}</p>
 <button id="roundButton" onClick={removeOne(e._id)}>X</button>
 {e.Done?<button disabled>Done</button>:<button>Mark As Done</button>}
 </li>
})}
</ul>
        </div>
    )
}

export default withRouter(TaskAdd)