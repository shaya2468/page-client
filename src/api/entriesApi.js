var axios = require('axios')

module.exports = {

  // user name is defined as ip address
  getMyUserName:function () {
    var url = `https://freegeoip.net/json/`;
    return axios.get(url);
  },
  init:function () {
    var url = `http://localhost:3333/init`;
    return axios.get(url);
  },
  getEntries:function (type, name) {
    var url = `http://localhost:3333/entries`;
    var key = type === 'users' ? 'user_name' : 'site_name'
    return axios.get(url, {
      params: {
        [key]: name
      }
    });
  }
}