import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const AdminDes = () => {
  return (
    <div >
        <h3>Rule for Admin</h3>
        <ul>
            <li>Admin can add 10 random question</li>
            <li>Question type</li>
            <li>Multiple choice with a single correct answer</li>
            <li>Multiple choice with multiple correct answers</li>
        </ul>
        <Link to="/admin">  <Button  variant="primary">Go to Admin Page</Button></Link>
    </div>
  )
}

export default AdminDes