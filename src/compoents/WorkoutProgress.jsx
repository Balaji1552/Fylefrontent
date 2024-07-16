import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const WorkoutProgress = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || [];
    setUserData(storedUserData);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const getChartData = () => {
    if (!selectedUser) return null;

    const workoutTypes = [...new Set(selectedUser.workouts.map(workout => workout.type))];
    const workoutMinutes = workoutTypes.map(type =>
      selectedUser.workouts
        .filter(workout => workout.type === type)
        .reduce((total, workout) => total + Number(workout.minutes), 0)
    );

    return {
      labels: workoutTypes,
      datasets: [
        {
          label: 'Minutes',
          data: workoutMinutes,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="container mt-5">

    <h1 className="text-center " > Display the workout progress using charts</h1>
    <br/>
      <Row>
        <Col md={4}>
          <ListGroup>
            {userData.map((user, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleUserClick(user)}
                active={selectedUser && selectedUser.name === user.name}
                style={{ cursor: 'pointer' }}
              >
                {user.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          {selectedUser && (
            <Card>
              <Card.Header>{`${selectedUser.name}'s Workout Progress`}</Card.Header>
              <Card.Body>
                <Bar
                  data={getChartData()}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WorkoutProgress;
