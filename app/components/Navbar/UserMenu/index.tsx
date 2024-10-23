const UserMenu = () => {
  return (
    <div className="user-menu">
      <div className="user-menu__avatar">
        
      </div>
      <div className="user-menu__dropdown">
        <ul>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu