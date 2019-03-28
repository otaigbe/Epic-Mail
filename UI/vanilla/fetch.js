function customFetch(url, methodType, token) {
  return (async () => {
    let response = null;
    let json = null;
    try {
      response = await fetch(url, {
        method: methodType,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  })().catch(e => console.error(e.stack));
}

function customFetchWithBody(url, methodType, token, jsonObj) {
  return (async () => {
    let response = null;
    let json = null;
    try {
      response = await fetch(url, {
        method: methodType,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        redirect: 'follow',
        body: JSON.stringify(jsonObj),
      });
      json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  })().catch(e => console.error(e.stack));
}


function extractToken() {
  const cookieStr = document.cookie;
  const ans = cookieStr.split('=');
  const ans1 = ans[0];
  const ans2 = ans[1];
  return ans2;
}
