import { NavLink, useLocation } from "react-router-dom";

// 아래 임포트가 있어야 메뉴가 작동함 
import "bootstrap/dist/js/bootstrap.js";
const Menu = (props) => {
    const location = useLocation();
    // console.log(location.pathname);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-success fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">every fit</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/pocketmon' ? 'active' : ''}`} to="/pocketmon">pocketmon</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/book' ? 'active' : ''}`} to="/book">book</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === '/book2' ? 'active' : ''}`} to="/book2">book(loop)</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Menu;