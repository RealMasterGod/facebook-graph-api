import { useNavigate } from "react-router-dom";
import { login } from "../../utils/FacebookSDK";
import "./login.css";
// import FacebookLogin from "react-facebook-login";

const Login = () => {
  // const responseFacebook = (response) => {
  //   console.log(response);
  // };
  const navigate = useNavigate()
  const handleLogin = async () => {
    // console.log("login clicked");
    const res = await login()
    if(res.status === 'connected') {
      navigate(0)
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h3 className="heading">Welcome!</h3>
        <p className="text">Click the login button to proceed.</p>
        <button className="loginBtn">
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"
            className="fbicon"
            alt=""
          />
          <span className="loginText" onClick={handleLogin}>
            Login with Facebook
          </span>
        </button>
        {/* <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          onClick={handleLogin}
          callback={responseFacebook}
          icon='fa-facebook'
        /> */}
      </div>
    </div>
  );
};

export default Login;
