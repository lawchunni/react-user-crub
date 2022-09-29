import React, { useEffect, useState } from 'react';
// components
import Header from './components/Header.js';
import UserList from './components/UserList';
import FormModal from './components/FormModal.js';
import UserDetailsModal from './components/UserDetailsModal.js';
import Messages from './components/Messages.js';

function App() {

  const api = process.env.REACT_APP_USER_API_URL;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState('');
  const [user, setUser] = useState({});
  // messages
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  
  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * get all users info from database
   */
  const getAllUser = () => {
    fetch(api)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        const data = result.results.sort((a, b) => b.id - a.id);
        setUsers(data);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }

  /**
   * handle user in app actions
   * @param {*} act in app action - show, form, success, delete
   * @param {*} user single user data
   */
  const handleUserAction = (act, user) => {

    if(act !== 'success' && act !== 'delete') {
      resetMsg();
    } else if (act === 'delete') {
      if(window.confirm(`Are you sure to delete user ${user.name}?`)) {
        // HTTP request - delete
        handleRequest('DELETE', user);
      }
    }

    setAction(act);
    setUser(user);
    
  }

  /**
   * reset notification messages
   */
  const resetMsg = () => {
    setSuccessMsg('');
    setErrMsg('');
  }

  /**
   * handle create and update form submission
   * @param {*} method create & update
   * @param {*} data single user data
   * @returns 
   */
  const handleFormSubmit = (method, data) => {

    resetMsg();

    if(!data.name || !data.email || !data.phone) {
      setErrMsg('All fields required');
      return;
    }

    // create or update data in database
    handleRequest(method, data);
  }

  /**
   * function to handle HTTP request
   * @param {*} method create, update & delete
   * @param {*} data single user data
   */
  const handleRequest = (method, data) => {
    fetch(api, {
      method: method,
      body: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      if(json.status === 200 || json.status === 201) {
        setSuccessMsg(json.message);
        handleUserAction('success', {});
        getAllUser();
      } else {
        setErrMsg(json.message);
      }
    })
  }

  return (
    <div>
      <Header />
      <Messages successMsg={successMsg} errMsg={errMsg} setSuccessMsg={setSuccessMsg} setErrMsg={setErrMsg} />

      <div className="container">
        <div className="wrapper">
          <button className="button is-medium is-info" onClick={() => handleUserAction('form', {})}>Add User</button>
        </div>
      </div>

      <UserList error={error} isLoaded={isLoaded} users={users} handleUserAction={handleUserAction} />

      {(() => {
        if(action === 'form') {
          return (
            <FormModal user={user} handleUserAction={handleUserAction} handleFormSubmit={handleFormSubmit} />
          )
        } else if(action === 'show') {
          return (
            <UserDetailsModal user={user} handleUserAction={handleUserAction} />
          ) 
        }
      })()}
    </div>
  )
}

export default App;
