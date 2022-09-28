import React from 'react';

const Messages = ({successMsg, errMsg, setSuccessMsg, setErrMsg}) => {

  const messageDom = () => {
    if(successMsg.length) {
      return (
        <div className="notification is-primary">
          <button className="delete" onClick={() => setSuccessMsg('')}></button>
          {successMsg}
        </div>
      )
    } else if (errMsg.length) {
      return (
        <div className="notification is-danger">
          <button className="delete" onClick={() => setErrMsg('')}></button>
          {errMsg}
        </div>
      )
    }
  }

  return (
    <>
    {messageDom()}
    </>
  )
}

export default Messages;