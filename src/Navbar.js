import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const {
        handleLogout
    } = props;

    return ( 
        <nav className="navbar">
        <Link className="brand-title" to="/">SkillMeet</Link>
        <a href = "#" className="toggle-button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
        <div className="navbar-links">
            <ul>
                {/* <li className="logged-in">
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
                </li> */}
                <li>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <a className="navbar-active" href="help.html">ABOUT US</a>
                </li>

                <li>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <a className="navbar-active" onClick = {() => handleLogout()}> LOGOUT</a>
                </li>
            </ul>
        </div>
    </nav>
     );
}
 
export default Navbar;

