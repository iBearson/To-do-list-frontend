import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import Task from './Task';
import DueDate from './DueDate'; 
import dayjs from 'dayjs';

export default function User() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
    const [name, setName] = useState('');
    const [actions, setActions] = useState('');
    const [dueDate, setDueDate] = useState(''); // State for due date
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);

    // Separate state for editing
    const [editName, setEditName] = useState('');
    const [editActions, setEditActions] = useState('');
    const [editDueDate, setEditDueDate] = useState(null); // Edit due date

    // Handle click for adding new task
    const handleClick = (e) => {
        e.preventDefault();
        const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : null;
        const user = { name, actions, dueDate: formattedDueDate };
    
        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("New User added");
            fetchUserList();
            setName('');
            setActions('');
            setDueDate(null); 
        });
    }

    const fetchUserList = () => {
        fetch("http://localhost:8080/user/getAll")
            .then(res => res.json())
            .then(result => {
                setUsers(result);
            });
    }

    useEffect(() => {
        fetchUserList();
    }, []);

    const handleEdit = (id) => {
        setEditId(id);
        const editedUser = users.find(user => user.id === id);
        if (editedUser) {
            setEditName(editedUser.name);
            setEditActions(editedUser.actions);
            setEditDueDate(editedUser.dueDate ? new Date(editedUser.dueDate) : null); // Set edit due date
        }
    }

    const handleCancelEdit = () => {
        setEditId(null);
        setEditName('');
        setEditActions('');
        setEditDueDate(null); // Reset edit due date
    }

    const handleUpdate = () => {
        let formattedDueDate = null;
        if (editDueDate) {
            formattedDueDate = dayjs(editDueDate).format('YYYY-MM-DD');
        }
    
        const updatedUser = { name: editName, actions: editActions, dueDate: formattedDueDate };
        fetch(`http://localhost:8080/user/update/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        }).then(() => {
            console.log("User updated successfully");
            fetchUserList();
            handleCancelEdit(); // Reset edit state after update
        });
    }
    
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/user/delete/${id}`, {
            method: "DELETE"
        }).then(() => {
            console.log("User deleted successfully");
            fetchUserList();
        });
    }

    return (
        <Container>
            {/* Add User Form */}
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "inherit" }}>Add Task</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Where?"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Task"
                        variant="outlined"
                        fullWidth
                        value={actions}
                        onChange={(e) => setActions(e.target.value)}
                    />
                    <DueDate
                        label="Due Date"
                        value={dueDate}
                        onChange={setDueDate}
                    />
                    <Button 
                    variant="contained"
                    startIcon={<AssignmentReturnedIcon/>}
                    color="success" onClick={handleClick}>Submit</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
            <h1>Tasks</h1>
                {users.map((user) => (
                    <Task
                        key={user.id}
                        user={user}
                        editId={editId}
                        editName={editName}
                        editActions={editActions}
                        editDueDate={editDueDate} 
                        setEditName={setEditName}
                        setEditActions={setEditActions}
                        setEditDueDate={setEditDueDate} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        handleCancelEdit={handleCancelEdit}
                    />
                ))}
            </Paper>
        </Container>
    );
}
