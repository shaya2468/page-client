var axios = require('axios')

var mainUrl = 'http://localhost:3333/';

module.exports = {

  // user name is defined as ip address
  getMyUserName:function () {
    var url = `https://freegeoip.net/json/`;
    return axios.get(url);
  },
  init:function () {
    var url = `${mainUrl}init`;
    return axios.get(url);
  },
  getEntries:function (type, name) {
    var url = `${mainUrl}entries`;
    var key = type === 'users' ? 'user_name' : 'site_name'
    return axios.get(url, {
      params: {
        [key]: name
      }
    });
  }
}