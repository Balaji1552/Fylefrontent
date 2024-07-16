import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Button, Row, Col } from 'react-bootstrap';
import WorkoutProgress from './WorkoutProgress';
import { useNavigate } from 'react-router-dom';


const WorkoutList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [workoutFilter, setWorkoutFilter] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  const navigator=useNavigate();
  useEffect(() => {
    const fetchData = JSON.parse(localStorage.getItem('userData')) || [];
    setData(fetchData);
    setFilteredData(fetchData);
  }, []);

  useEffect(() => {
    let filtered = data.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.workouts.some(workout => workout.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (workoutFilter) {
      filtered = filtered.filter(user => user.workouts.some(workout => workout.type === workoutFilter));
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, workoutFilter, data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setWorkoutFilter(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    ));
  };

 function addnew(){
  navigator('/add-workout')
 }

  return (
    <div className="container mt-5">

      <button className="btn btn-primary" onClick={addnew}> Add Workout</button>
        <h1 className="text-center " > List of  Workout Members </h1>
        <br/>
      <Row className="mb-3 justify-content-center">
        <Col md="6">
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label>Search by Name or Workout Type</Form.Label>
              <Form.Control type="text" placeholder="Enter name or workout type" onChange={handleSearchChange} />
            </Form.Group>
          </Form>
        </Col>
        <Col md="6">
          <Form>
            <Form.Group controlId="filterWorkoutType">
              <Form.Label>Filter by Workout Type</Form.Label>
              <Form.Control as="select" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Yoga">Yoga</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Workouts</th>
            <th>Number of Workouts</th>
            <th>Total Workout Minutes</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.workouts.map(workout => workout.type).join(', ')}</td>
              <td>{user.workouts.length}</td>
              <td>{user.workouts.reduce((total, workout) => total + Number(workout.minutes), 0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="mt-3 justify-content-center">
        <Col md="auto" className="d-flex align-items-center">
          <Form.Group controlId="itemsPerPage" className="d-inline-block mb-0">
            <Form.Label className="me-2 mb-0">Items per page</Form.Label>
            <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{ width: '70px' }}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md="auto" className="d-flex align-items-center">
          <Pagination className="mb-0 d-flex align-items-center">
            <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1} className="me-2">Prev</Button>
            {renderPagination()}
            <Button variant="primary" onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)} className="ms-2">Next</Button>
          </Pagination>
        </Col>
      </Row>

      <WorkoutProgress/>
    </div>
  );
};

export default WorkoutList;
