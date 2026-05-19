import "./Navbar.css";

const Navbar = () => {

  return (

    <nav className="navbar">

      {/* Logo */}

      <div className="navbar-title">
        OS Scheduler
      </div>

      {/* Navigation Links */}

      <div className="navbar-links">

        <a href="/">
          Home
        </a>

        <a href="/">
          Algorithms
        </a>

        <a href="/">
          Metrics
        </a>

        <a href="/">
          Visualization
        </a>

      </div>

    </nav>

  );
};

export default Navbar;