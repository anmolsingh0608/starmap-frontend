import { Link } from "react-router-dom";

const Successpop = () => {
  return (
    <div
      className="cart-pop"
      style={{
        width: "100%",
        left: "0px",
        margin: "25px",
        height: "94%",
        top: "0",
      }}
    >
      <div
        className="cookiesContent shadow"
        id="cookiesPopup"
        style={{ height: "100%", width: "97%" }}
      >
        <button
          className="close"
          onClick={() => {
            document.getElementsByClassName("accept")[0].click();
            document.getElementsByClassName("cart-pop")[0].style.display =
              "none";
          }}
        >
          ✖
        </button>
        <img
          style={{ width: "30%" }}
          src="https://media.istockphoto.com/id/876280146/vector/colored-shopping-bags.jpg?s=612x612&w=0&k=20&c=8VJgB-ho7R6BlRnx2f0GPABNDUJZj16aWh9hjCywA7c="
          alt="cookies-img"
        />
        <p>Order Placed!!</p>
        <Link to="/">
          <button className="accept">Continue shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default Successpop;
