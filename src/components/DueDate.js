import React from 'react';
import TextField from '@mui/material/TextField';

const DueDate = ({ value, onChange }) => {
    console.log("Due Date in DueDate Component:", value); 

    const handleDateChange = (event) => {
        console.log("Set Due Date Function in DueDate Component:", onChange); 
        onChange(event.target.value); 
    };

    return (
        <TextField
            label="Due Date"
            variant="outlined"
            fullWidth
            type="date"
            value={value || ''}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

export default DueDate;
