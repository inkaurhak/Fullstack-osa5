const Logout = ({ user, setUser }) => {

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <div>
          {user.name} logged in
          <button type="submit">logout</button>
        </div>
      </form>
    </div>
  )
}

export default Logout