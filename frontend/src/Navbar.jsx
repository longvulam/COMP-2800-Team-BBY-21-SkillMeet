const Navbar = () => {

    return ( 
        <nav className="navbar">
        <a className="brand-title" href="index.html">SkillMeet</a>
        <a href = "#" className="toggle-button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
        <div className="navbar-links">
            <ul>
                <li className="logged-in">
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <a className="navbar-active" href="profile.html">USER PROFILE</a>
                </li>
                <li className="logged-in">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    <a className="navbar-active" href="main.html">SEARCH</a>
                </li>
                <li className="logged-in">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    <a className="navbar-active" href="main.html">FRIENDS</a>
                </li>
                <li>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <a className="navbar-active" href="help.html">ABOUT US</a>
                </li>
                <li className="logged-out">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <a className="navbar-active" href="login.html">LOGIN</a>
                </li>

                <li className="logged-out">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    <a className="navbar-active" href="login.html">SIGNUP</a>
                </li>
                <li id="btnLogout" className="logged-in">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <a className="navbar-active" href="login.html">LOGOUT</a>
                </li>
            </ul>
        </div>
    </nav>
     );
}
 
export default Navbar;