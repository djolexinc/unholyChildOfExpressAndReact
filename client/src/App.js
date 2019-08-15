import React, { useState, useEffect } from "react";

const App = () => {
  const [hasError, setErrors] = useState(false);
  const [jsonValue, setValue] = useState([]);
  const [method, setMethod] = useState('DELETE');
 // const [isDoneCheck, setCheck] = useState(false);

  const options = {
    method: method,
    body: JSON.stringify({id: '5d5559538623f75d888cd92d'}),
    headers: {
        'Content-Type': 'application/json'
    }
  };

  async function trySomething() {
    const res = await fetch("http://localhost:5000/api/todo/", options)
    if(res.ok)
    res
      .json()
      .then(res => setValue(res))
     .catch(err => setErrors(err));
     fetchData();
  }

  async function fetchData() {
    const res = await fetch("http://localhost:5000/api/one/test");
    if(res.ok)
    res
      .json()
      .then(res => setValue(res))
      .catch(err => setErrors(err));
  }
 useEffect(() => {
    fetchData();
  },[]);
//      <span>{JSON.stringify(jsonValue)}</span> line 22
  return (
    <div>
      <div style={{backgroundColor: "blue"}}>.</div><br />
      
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
      <hr />
      {//BRAVO DJOLE MADAFAKA OVAKO SE POZIVA HOOK
       }
      <button onClick={()=> fetchData()}> Refresh data </button> 

      <form method="POST" action="http://localhost:5000/api/todo">
       User: <input type="text" id ="firstname" name="firstname"></input> 
       Todo: <input type="text" id ="todo" name="todo"></input> 
       Done: <input type="checkbox" id ="isDone" name="isDone"></input> 
       Attachment: <input type="checkbox" id ="hasAttachment" name="hasAttachment"></input> 
       <input type="submit" value="submit"></input>
      </form>
       <hr />
       
      <form method="POST" action="http://localhost:5000/api/bool">
          Done: <input type="checkbox" id ="isDone" name="isDone"></input> 
          Attachment: <input type="checkbox" id ="hasAttachment" name="hasAttachment"></input> 
         <input type="submit" value="Upload data"></input>
      </form>
      <button onClick={()=> trySomething()}> Try api post data </button> 

      
      <hr />
      <table style ={{border: "1px solid blue"}}>
      {    
        jsonValue.map( jsonItem =>{
            return <li><input type="checkbox" id={jsonItem._id} onChange={()=> trySomething()}></input>User: {jsonItem.username}, has items: {jsonItem.todo}   ____ has attachment: [{JSON.stringify(jsonItem.hasAttachment)}] </li>  
          })
      }
      </table>
    </div>
  );
};
export default App;