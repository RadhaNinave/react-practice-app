import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
  const nameInputRef=useRef();
  const ageInputRef=useRef();
 
  const [error, setError] = useState();
  const addUserHandler = (event) => {

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    if(enteredName.trim().length===0 || enteredAge.trim().length===0)
    {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
        return;
    }
    if(+enteredAge < 1)
    {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
        return;
    }
   
   props.onAddUser(enteredName,enteredAge);
  nameInputRef.current.value = '';
  ageInputRef.current.value = '';
}; 
  
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
    {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={nameInputRef}
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          ref={ageInputRef}
        />
        <br />
        <Button type="submit">Add User</Button>
      </form>

    </Card>
    </div>
  );
};
export default AddUser;
