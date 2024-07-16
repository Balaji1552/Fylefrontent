import React, { useState, useEffect } from 'react';

const AddWorkout = () => {
  const [userName, setUserName] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutMinutes, setWorkoutMinutes] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Load user data from local storage when the component mounts
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleAddWorkout = () => {
    const newWorkout = { type: workoutType, minutes: workoutMinutes };
    let updatedUserData;

    const userIndex = userData.findIndex(user => user.name === userName);

    if (userIndex > -1) {
      // If user exists, add the new workout to their workouts array
      updatedUserData = [...userData];
      updatedUserData[userIndex].workouts.push(newWorkout);
    } else {
      // If user doesn't exist, create a new user entry
      const newUser = {
        id: userData.length + 1,
        name: userName,
        workouts: [newWorkout]
      };
      updatedUserData = [...userData, newUser];
    }

    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData)); // Save updated userData to local storage

    // Clear workout type and minutes for new entry
    setWorkoutType('');
    setWorkoutMinutes('');
  };

  return (
    <div className="container mt-5">
            <div className=" col-md-8 offset-md-2 offset-md-2">
                <h3>Health Challenge Tracker</h3>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">User Name*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="workoutType" className="form-label">Workout Type*</label>
                        <select
                            className="form-select"
                            id="workoutType"
                            value={workoutType}
                            onChange={(e) => setWorkoutType(e.target.value)}
                        >
                            <option value="">Select workout type</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Running">Running</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Yoga">Yoga</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="workoutMinutes" className="form-label">Workout Minutes*</label>
                        <input
                            type="number"
                            className="form-control"
                            id="workoutMinutes"
                            value={workoutMinutes}
                            onChange={(e) => setWorkoutMinutes(e.target.value)}
                            placeholder="Enter minutes"
                        />
                    </div>
                </div>
                <br />

                <button
                    className="btn btn-primary"
                    onClick={handleAddWorkout}
                >
                    Add Workout
                </button>

               
            </div>
        </div>
  );
};

export default AddWorkout;
