import AddNewLane from "../AddNewLane";
import './navbar.scss';


const NavBar = () => {

    return (
        <nav className="nav-bar">
            <div className="heading"> Task tracker app</div>
            <div>
                <AddNewLane />
            </div>
        </nav>
    )
};

export default NavBar;