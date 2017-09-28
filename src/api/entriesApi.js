var axios = require('axios')

module.exports = {

  init:function () {
    var url = `http://localhost:3333/init`;
    return axios.get(url);
  },
  getEntries:function (name) {
    var url = `http://localhost:3333/entries`;
    return axios.get(url, {
      params: {
        user_name: name
      }
    });
  }
}