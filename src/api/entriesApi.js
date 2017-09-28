var axios = require('axios')

module.exports = {
  
  getUsers:function () {
    var url = `http://localhost:3333/entries`;
    return axios.get(url);
  }
}