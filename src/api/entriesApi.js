var axios = require('axios')

module.exports = {

  init:function () {
    var url = `http://localhost:3333/init`;
    return axios.get(url);
  }
}