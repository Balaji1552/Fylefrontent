import React from 'react'

function Header() {
  return (
    <div>
        <header>
            <nav className="navbar  navbar-dark bg-dark ">
            <div class="container-fluid">
            <a class="navbar-brand" href="/">Health Challenge Tracker</a>
            <button className="btn btn-primary"> <a class="navbar-brand" href="/add-workout">Add Workout</a></button>
            <a class="navbar-brand" href="/workprogress "> Workout Progress</a>
            <a class="navbar-brand" href="/"> Workout List</a>
            </div>
            </nav>
        </header>
    </div>
  )
}

export default Header