import "./HeroStyles.css";
import HeroImage from "../assets/Hero Images/home-hero.jpg";

function HeroSection(props) {
  return (
    <>
      <div className={props.cName}>
        <img
          className="HeroImage"
          src={props.heroImg}
          alt="Hero-Section-Image-here"
        />
      </div>
      <div className="HeroText">
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a href={props.url} className={props.btnClass}>
          {props.btnText}
        </a>
      </div>
    </>
  );
}
export default HeroSection;
