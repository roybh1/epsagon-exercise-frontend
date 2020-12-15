import axios from 'axios';
require('dotenv').config()

if (process.env.EPSAGON_ENV == "production") {
  var reactAppServer = process.env.REACT_APP_SERVER_PROD
}
else if (process.env.EPSAGON_ENV == "development") {
  var reactAppServer = process.env.REACT_APP_SERVER_DEV
}
else {
  var reactAppServer = "http://localhost:5000/"
}


export default async function ServerRequest(method, url, {
  resource, data, headers, token, params, blob, retry = 0
} = {}) {
  try {
    // console.log("SERVER: ", reactAppServer)
    // console.log("URL: ", reactAppServer + url)
    const response = await axios({
      method,
      url: reactAppServer + url,
      // url: process.env.REACT_APP_SERVER + url.replace('|', '%7C'),
      data,
      params
      // headers: token && { Authorization: `Bearer ${token}`, ...headers },
      // ...blob && { responseType: 'blob' },
    });
    console.log("STATUS: ", response.status)
    if (response.status === 200) {
      if (resource) {
        return response.data[resource];
      }
      console.log("DATA: ", data)
      console.log("params: ", params)
      console.log("res: ", response)
      return response.data;
    }
    throw Error(`Request rejected with status ${response.status}`);
  } catch (error) {
    if (retry < 2 && method === 'get') { // try another 2 times after the first try
      await ServerRequest(method, url, {
        resource,
        data,
        headers,
        token,
        params,
        blob,
        retry: retry + 1,
      });
    } else {
      // logError(error);
      console.error(error);
      return Promise.reject(error);
    }
  }
  return Promise.reject();
}