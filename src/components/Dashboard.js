import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const Dashboard = () => {
  const [dayOfWeekData, setDayOfWeekData] = useState([]);
  const [dueDateData, setDueDateData] = useState([]);
  const [isDoneData, setIsDoneData] = useState([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/getAll');
        const data = await response.json();
        processData(data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, []);

  const processData = (data) => {
    const dayOfWeekCounts = {};
    const dueDateCounts = {};
    let doneCount = 0;
    let pendingCount = 0;

    data.forEach((task) => {
      dayOfWeekCounts[task.dayOfWeek] = (dayOfWeekCounts[task.dayOfWeek] || 0) + 1;
      const dueDate = new Date(task.dueDate);
      const formattedDueDate = dueDate.toLocaleDateString();
      dueDateCounts[formattedDueDate] = (dueDateCounts[formattedDueDate] || 0) + 1;
      task.isDone ? doneCount++ : pendingCount++;
    });

    const dayOfWeekChartData = Object.entries(dayOfWeekCounts).map(([day, count]) => ({ name: day, value: count }));
    const dueDateChartData = Object.entries(dueDateCounts).map(([date, count], index) => ({
      name: date,
      value: count,
      fillColor: getRandomColor(index),
    }));
    const isDoneChartData = [
      { name: 'Pending', value: pendingCount, fillColor: '#FF8042' },
      { name: 'Done', value: doneCount, fillColor: '#82ca9d' },
    ];

    setDayOfWeekData(dayOfWeekChartData);
    setDueDateData(dueDateChartData);
    setIsDoneData(isDoneChartData);
  };

  const getRandomColor = (index) => {
    const colors = ['#FF6347', '#1E90FF', '#32CD32', '#FFD700', '#DA70D6', '#FFA500', '#00CED1'];
    return colors[index % colors.length];
  };

  const CustomLegend = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
      {dueDateData.map((entry, index) => (
        <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.fillColor,
              marginRight: '5px',
              borderRadius: '50%',
            }}
          ></div>
          <Typography variant="body2">{entry.name}</Typography>
        </div>
      ))}
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '30px' }}>
      {['Day of Week', 'Due Date', 'Task Status'].map((title, index) => (
        <Paper key={title} elevation={6} sx={{ width: '100%', maxWidth: '600px', padding: '20px', margin: '10px', boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.25)', backgroundColor: 'rgb(240, 255, 255)' }}>
          <Typography variant="h4" gutterBottom align="center">
            {title}
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            {index === 0 && (
              <PieChart>
                <Pie
                  dataKey="value"
                  data={dayOfWeekData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                  stroke="none"
                  isAnimationActive={false}
                >
                  {dayOfWeekData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRandomColor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="right" />
              </PieChart>
            )}
            {index === 1 && (
              <BarChart data={dueDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend content={<CustomLegend />} align="right" verticalAlign="top" />
                <Bar dataKey="value" isAnimationActive={false}>
                  {dueDateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fillColor} />
                  ))}
                </Bar>
              </BarChart>
            )}
            {index === 2 && (
              <PieChart>
                <Pie
                  dataKey="value"
                  data={isDoneData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                  stroke="none"
                  isAnimationActive={false}
                >
                  {isDoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fillColor} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend align="right" />
              </PieChart>
            )}
          </ResponsiveContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default Dashboard;
