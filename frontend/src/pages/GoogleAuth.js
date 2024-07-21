import React, { useEffect } from 'react';

function GoogleAuth() {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    const userObject = (jwt = decode(response.credential))
    console.log(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '274341306290-ko93s8nm0mdknhebd1ci09i9qsk9n2a0.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), { theme: 'outline', size: 'large' });
  }, []);

  return (
    <>
      <p>Hello</p>
      <div className="GoogleAuth">
        <div id="signInDiv"></div>
      </div>
    </>
  );
}

export default GoogleAuth;
