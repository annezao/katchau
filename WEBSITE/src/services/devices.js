const axios = require('axios');
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    axios.get('http://127.0.0.1:8000/api/Config/2/').then(resp => {
        console.log(resp.data);
    }).catch(
        function(error){
            console.log(error);
        }
    );
  }
  export default getUser;