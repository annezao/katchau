const axios = require('axios');
// Want to use async/await? Add the `async` keyword to your outer function/method.
const deviceServices = {
    async readDevices(id) {
        const devices = await axios.get(
            `http://127.0.0.1:8000/api/User/`+id+`/Device`
        );
        console.log("config")
        return devices;
    },
};
  
export default deviceServices;