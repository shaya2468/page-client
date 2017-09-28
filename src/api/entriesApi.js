var axios = require('axios')

module.exports = {

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