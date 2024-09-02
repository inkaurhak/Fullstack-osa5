import PropTypes from 'prop-types'

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
          <button id='logout' type="submit">logout</button>
        </div>
      </form>
    </div>
  )
}

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default Logout