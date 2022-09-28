import React from "react";

const FormModal = ({setAction, handleFormSubmit}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit('POST', e.target);
  }

  return (
    <div className="modal" style={{display: 'block'}}>
      <div className="modal-background" onClick={() => setAction('')}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create User</p>
          <button className="delete" aria-label="close" onClick={() => setAction('')} ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
              <label className="label" htmlFor="name">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control">
                <input className="input" type="text" name="email" />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <div className="control">
                <input className="input" type="text" name="phone" />
              </div>
            </div>
            <button className="button is-success">Submit</button>
            <button className="button" onClick={() => setAction('')} >Cancel</button>
          </form>
        </section>
       
      </div>
    </div>
  )
}

export default FormModal;
