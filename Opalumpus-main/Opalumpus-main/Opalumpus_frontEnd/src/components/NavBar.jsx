import { Component } from "react";
import "./NavBarStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <nav className="NavBar">
        <h1 className="NavBarLogo">Opalumpus</h1>
        <div className="MenuIcons" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "NavMenu active" : "NavMenu"}>
          {MenuItems.map((items, index) => {
            return (
              <li key={index}>
                <Link className={items.cName} to={items.url}>
                  <i className={items.icon}></i>
                  {items.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
