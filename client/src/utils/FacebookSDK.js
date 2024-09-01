export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: import.meta.env.VITE_REACT_APP_FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v20.0",
      });
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
          // console.log(response)
          resolve(uid)
        } else if (response.status === "not_authorized") {
          // the user is logged in to Facebook,
          // but has not authenticated your app
        } else {
          // the user isn't logged in to Facebook.
        }
        resolve()
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
};

export const login = () => {
    return new Promise ((resolve,reject) => {
        window.FB.login(
            (response) => {
              // console.log(response);
              resolve(response)
            },
            {
              config_id: import.meta.env.VITE_REACT_APP_CONFIG1_ID,
              response_type: "code",
              override_default_response_type: true,
            }
          );
    })
}

export const logout = () => {
    return new Promise ((resolve,reject) => {
        window.FB.logout(function(response) {
            // user is now logged out
            resolve(response)
        });
    })
}

export const getFans = (id) => {
  return new Promise((resolve) => {
    window.FB.api(`${id}?fields=fan_count`,(response) => {
      resolve(response.fan_count)
    })
  })
}

export const getReactions = (id,access_token) => {
  return new Promise((resolve) => {
    window.FB.api(`${id}/posts?fields=message,reactions.summary(1)&access_token=${access_token}`, (response) => {
      var count = 0
      // console.log(response)
      response.data.map((item) => {
        count = count + item.reactions.summary.total_count
      })
      resolve(count)
    })
  })
}

export const getEngagements = (id,access_token) => {
  return new Promise((resolve) => {
    window.FB.api(`${id}/insights/page_post_engagements?period=days_28&access_token=${access_token}`,(response) => {
      var count = 0;
      const values = response?.data?.[0]?.values
      count = values?.[0].value + values?.[1].value
      resolve(count)
    })
  })
}

export const getImpressions = (id,access_token) => {
  return new Promise((resolve) => {
    window.FB.api(`${id}/insights/page_impressions?period=days_28&access_token=${access_token}`,(response) => {
      var count = 0;
      const values = response?.data?.[0]?.values
      count = values?.[0].value + values?.[1].value
      resolve(count)
    })
  })
}
