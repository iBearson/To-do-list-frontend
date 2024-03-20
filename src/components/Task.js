import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const Task = ({
    user,
    editId,
    editName,
    editActions,
    editDueDate,
    setEditName,
    setEditActions,
    setEditDueDate,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleCancelEdit
}) => {
    const [isDone, setIsDone] = useState(user.isDone || false); // State for completion status

    const handleCheck = () => {
        const newIsDoneStatus = !isDone;
        setIsDone(newIsDoneStatus)
    
        fetch(`http://localhost:8080/user/update/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDone: newIsDoneStatus })
        }).then(() => {
            console.log("Task completion status updated");
            
        }).catch(err => console.error("Failed to update task status", err));
    };
    

    const isEditing = editId === user.id;

    const handleNameChange = (event) => {
        setEditName(event.target.value);
    };

    const handleActionsChange = (event) => {
        setEditActions(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setEditDueDate(event.target.value); 
    };

    // Function to format date and get day of the week
    const formatDateAndDay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <div className='paper'>
            <Paper elevation={6} style={{ 
                margin: "10px", 
                padding: "15px", 
                textAlign: "left", 
                backgroundColor: isDone ? '#f5f5f5' : 'inherit', 
                borderRadius: '20px' }} key={user.id}>
                <Checkbox
                    checked={isDone}
                    onChange={handleCheck}
                    color="primary"
                    sx={{
                        color: 'lightgray',
                        '&.Mui-checked': {
                            color: 'primary.main',
                        },
                        marginLeft: '500px', 
                    }}
                />
    
                {isEditing ? (
                    <>
                        <TextField
                            label="Where?"
                            variant="outlined"
                            fullWidth
                            value={editName}
                            onChange={handleNameChange}
                            style={{ textDecoration: isDone ? 'line-through' : 'none' }} 
                        />
                        <TextField
                            label="Task"
                            variant="outlined"
                            fullWidth
                            value={editActions}
                            onChange={handleActionsChange}
                            style={{ textDecoration: isDone ? 'line-through' : 'none' }} 
                        />
                        <TextField
                            label="Due Date"
                            variant="outlined"
                            fullWidth
                            type="date" 
                            value={editDueDate}
                            onChange={handleDueDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ textDecoration: isDone ? 'line-through' : 'none' }} 
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            startIcon={<UpdateIcon/>}
                            style={{ margin: '8px' }} onClick={() => handleUpdate(user.id)}>Update</Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small" 
                            startIcon={<CancelOutlinedIcon/>}
                            style={{ margin: '8px' }} onClick={handleCancelEdit}>Cancel</Button>
                        </>
                ) : (
                    <>
                        <p style={{ textDecoration: isDone ? 'line-through' : 'none' }}>Place: {user.name}</p>
                        <p style={{ textDecoration: isDone ? 'line-through' : 'none' }}>Task: {user.actions}</p>
                        <p style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'inherit' : 'red' }}>Due Date: {formatDateAndDay(user.dueDate)}</p>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            startIcon={<EditIcon />}
                            style={{ margin: '8px' }} onClick={() => handleEdit(user.id)}>Edit</Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(user.id)}
                            style={{ margin: '8px' }}>Delete</Button>
                    </>
                )}
            </Paper>
        </div>
    );
    
}

export default Task;
