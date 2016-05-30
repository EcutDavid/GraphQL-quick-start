var request = require('superagent')

request
  .get('http://localhost:3000/graphql?query={user(id:%221%22){name}}')
  .end(function(err, res){
      console.log(res.text)
});
