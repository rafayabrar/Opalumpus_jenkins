import { Component } from "react";
import "./Destinations.css";

class DestinationsData extends Component {
  render() {
    return (
      <div className="first-des">
        <div className="des-text">
          <h2>{this.props.heading}</h2>
          <p>{this.props.text}</p>
        </div>
        <div className="des-image">
          <img className="img-1" src={this.props.img1} alt="one-destination" />
          <img className="img-2" src={this.props.img2} alt="two-destination" />
        </div>
      </div>
    );
  }
}

export default DestinationsData;
