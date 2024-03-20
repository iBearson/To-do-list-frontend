import React, { useState, useEffect } from 'react';
import Task from './Task'; // Assuming this is your Task component file
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 3; // Adjust this based on how many tasks you want per page

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            // Replace this URL with your actual endpoint
            const response = await fetch('http://localhost:8080/getAll');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    // Pagination control
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            {currentTasks.map(task => (
                <Task
                    key={task.id}
                    user={task}
                    // Include other necessary props and functions for editing, deleting, etc.
                />
            ))}
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <Pagination
                    count={Math.ceil(tasks.length / tasksPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    variant="outlined"
                    color="primary"
                />
            </Stack>
        </div>
    );
}
