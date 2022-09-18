import React, { useEffect, useState } from 'react';
// components
import Header from './Header.js';
import UserList from './UserList';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <div>
      <Header />
      <UserList error={error} isLoaded={isLoaded} users={users} />
    </div>

  )
}

export default App;
