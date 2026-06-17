import { Link } from 'react-router-dom';


export  function Navigation() {  
  return (
    <nav>
      <div className="container bg-dark p-2">
        <Link className="menu" to="/">Home Page</Link>
        <Link className="menu" to="/about">About</Link>
        <Link className="menu" to="/users">Users</Link>
        <Link className="menu" to="/lazy">Profile</Link>
       

      </div>
    </nav>
  );
}