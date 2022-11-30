import { Link } from "react-router-dom";

const Cartpop = () => {
  return (
    <div className="cart-pop">
      <div className="cookiesContent shadow" id="cookiesPopup">
        <button
          className="close"
          onClick={() => {
            document.getElementsByClassName(
              "cart-pop"
            )[0].style.display = "none";
          }}
        >
          ✖
        </button>
        <img
          src="https://media.istockphoto.com/id/876280146/vector/colored-shopping-bags.jpg?s=612x612&w=0&k=20&c=8VJgB-ho7R6BlRnx2f0GPABNDUJZj16aWh9hjCywA7c="
          alt="cookies-img"
        />
        <p>Added to Cart.</p>
        <Link to='/cart' ><button className="accept">Go To Cart</button></Link>
      </div>
    </div>
  );
};

export default Cartpop;
