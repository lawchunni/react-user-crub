import React from "react";

const FormModal = ({user, handleUserAction, handleFormSubmit}) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {};

    if(user && user.id) {

      data = {
        id: user.id,
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value
      };

      handleFormSubmit('PUT', data);
    } else {

      data = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value
      };

      handleFormSubmit('POST', data);
    }
    
  }

  return (
    <div className="modal" style={{display: 'block'}}>
      <div className="modal-background" onClick={() => handleUserAction('', {})}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create User</p>
          <button className="delete" aria-label="close" onClick={() => handleUserAction('', {})} ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" defaultValue={user?.name} />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control">
                <input className="input" type="text" name="email" defaultValue={user?.email} />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <div className="control">
                <input className="input" type="text" name="phone" defaultValue={user?.phone} />
              </div>
            </div>
            <button className="button is-success">Submit</button>
            <button className="button" onClick={() => handleUserAction('', {})} >Cancel</button>
          </form>
        </section>
       
      </div>
    </div>
  )
}

export default FormModal;
