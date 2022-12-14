import React from "react";

const UserList = ({error, isLoaded, users, handleUserAction}) => {

  /**
   * handle user table click event 
   * @param {*} e table event
   * @param {*} user single user data
   */
  const handlePick = (e, user) => {
    if(e.target.tagName !== 'BUTTON') {
      handleUserAction('show', user);
    } else if(e.target.innerText === 'Edit') {
      handleUserAction('form', user);
    } else if(e.target.innerText === 'Delete') {
      handleUserAction('delete', user);
    }
  }

  if(error) {
    return <div className="container is-max-desktop">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="container is-max-desktop">Loading...</div>
  } else {
    return (
      <div className="container is-max-desktop">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} value={user} onClick={(e) => handlePick(e, user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td >
                  <button className="button is-light">Edit</button>
                  <button className="button is-danger is-light">Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
