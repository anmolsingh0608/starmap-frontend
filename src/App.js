import "./App.css";
// import './css/styles.css';
import "./css/footer.css";
import RouteList from "./routes/routes";
import { useJwt } from "react-jwt";
import { ActionCreators } from "./actions/profile";
import { useDispatch } from "react-redux";
const token = localStorage.getItem("token");

function App() {
  const dispatch = useDispatch();
  const { decodedToken, isExpired } = useJwt(token);
  // console.log(decodedToken, isExpired);
  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    const user = { role: "", email: "" };
    dispatch(ActionCreators.login(user));
  }
  if (decodedToken) {
    const { role, email } = decodedToken;
    const user = { role: role, email: email };
    dispatch(ActionCreators.login(user));
  }

  return (
    <>
      <RouteList />
    </>
  );
}

export default App;
