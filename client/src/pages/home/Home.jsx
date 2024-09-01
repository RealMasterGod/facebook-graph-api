import { useEffect, useState } from "react";
import { getEngagements, getFans, getImpressions, getReactions, logout } from "../../utils/FacebookSDK";
import "./home.css";

const Home = ({ setUserId }) => {
  const [username, setUsername] = useState("");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [data,setData] = useState({})
  useEffect(() => {
    window.FB.api("/me", { fields: "id,name,picture" }, (response) => {
      // console.log(response)
      setUsername(response.name);
      setProfilePic(response.picture.data.url);
    });
    window.FB.api(
      "/me/accounts",
      { fields: "id,access_token,name" },
      (response) => {
        // console.log(response)
        setPages(response.data);
      }
    );
  }, []);

  const handleChange = async (e) => {
    const pageId = e.target.value
    setSelectedPage(pageId)
    const page = pages.find((page) => page.id === pageId)
    const obj = {}
    if(page) {
      obj.fans = await getFans(page.id)
      obj.reactions = await getReactions(page.id,page.access_token)
      //There is no period=lifetime or period=total_over_range for engagement and impression 
      //so can't implement total lifetime engagement/impression
      obj.engagements = await getEngagements(page.id,page.access_token)
      obj.impressions = await getImpressions(page.id,page.access_token)
    }
    setData(obj)
    // window.FB.api()
  }
  const handleLogout = async () => {
    console.log("logging out");
    const res = await logout();
    // console.log(res)
    setUserId(null);
  };
  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="top">
          <div className="userInfo">
            <img
              className="userImg"
              src={
                profilePic
                  ? profilePic
                  : "https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png"
              }
              alt=""
            />
            <span className="username">
              {username ? username : "Loading..."}
            </span>
          </div>
          <button className="logoutBtn" onClick={handleLogout}>
            logout
          </button>
        </div>
        <h4 className="userPages">User's Pages</h4>
        <form className="pageForm">
          {pages.length > 0 ? (
            <select
              className="pages"
              onChange={handleChange}
            >
              <option className="page" value="">
                --Select a Page--
              </option>
              {pages.map((obj) => (
                <option key={obj.id} className="page" value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          ) : (
            <span>You donot own any pages.</span>
          )}
        </form>
        <h4 className="pageInfo">Page Information</h4>
        {selectedPage ? (
          <div className="cards">
            <div className="card">Followings
            <h2 className="number">{data.fans}</h2></div>
            <div className="card">Engagements<h2 className="number">{data.engagements}</h2></div>
            <div className="card">Reactions<h2 className="number">{data.reactions}</h2></div>
            <div className="card">Impressions<h2 className="number">{data.impressions}</h2></div>
          </div>
        ) : (
          <div>Please select a page to view its information</div>
        )}
      </div>
    </div>
  );
};

export default Home;

// <page-id>?fields=posts{message,reactions.summary(1)}

// posts?fields=message,reactions.summary(1)&since=2016-01-01




