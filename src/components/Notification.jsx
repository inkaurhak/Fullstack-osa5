const Notification = ({ message, errorMessage }) => {
  if (message !== null) {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
  if (errorMessage !== null) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  else {
    return null
  }
}

export default Notification