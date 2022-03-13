import Home from "../page/home/home";
import StartingPage from "../page/startingPage/starttingPage";
import {Route, Switch} from 'react-router-dom'
import Product from "../page/Product/product";
import { useEffect } from "react";
import { setAuthToken } from "../config/api";
import { API } from "../config/api";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  
  const [state, dispatch] = useContext(UserContext);
  console.log(state)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);
  const checkUser = async () => {

    
    try {
      const response = await API.get(`/check-auth/${state.user.id}`);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Switch>
       <Route exact path ="/" component={StartingPage} />
       <Route exact path ="/home" component={Home} />
       <Route exact path ="/product" component={Product} />
    </Switch>
  );
}

export default App;
