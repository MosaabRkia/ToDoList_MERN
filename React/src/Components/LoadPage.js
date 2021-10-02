import React, { useEffect } from 'react'
import { useHistory, withRouter } from 'react-router';

 function LoadPage(props) {
     const history = useHistory()
    useEffect(()=>{
        setTimeout(()=>{
            history.push('/TaskAdd');
        },1000)
    },[])
    return (
        <div style={{backgroundColor:"black",width:"100vw",height:"100vw"}}>
            <img style={{width:"100%",height:"100%"}} src={"https://hackernoon.com/images/0*3IFEy-hfoIpgFjBl.gif"}/>
        </div>
    )
}
export default withRouter(LoadPage)