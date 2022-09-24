import React from "react";

const UserDetailsModal = ({user, handleUserAction}) => {

  return (
    <div className="modal" style={{display: user ?  'block' : 'none'}} >
      <div className="modal-background" onClick={() => handleUserAction('', {})}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">User Details - {user?.name}</p>
          <button className="delete" aria-label="close" onClick={() => handleUserAction('', {})} ></button>
        </header>
        <section className="modal-card-body">
          <ul key={user?.id}>
              <li><strong>Id</strong>: {user?.id}</li>
              <li><strong>Name</strong>: {user?.name}</li>
              <li><strong>Email</strong>: {user?.email}</li>
              <li><strong>Phone</strong>: {user?.phone}</li>
              <li><strong>Created At</strong>: {user?.created_at}</li>
              <li><strong>Updated At</strong>: {user?.updated_at}</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default UserDetailsModal;
