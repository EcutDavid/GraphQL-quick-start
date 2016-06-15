var request = require('superagent')

request
  .get('http://localhost:3000/graphql?query={user(id:%224%22){name}}')
  .end(function(err, res){
    console.log(err)
    if (err) {
      console.error(err)
      return
    } else {
      console.log(res.text)
    }
});
