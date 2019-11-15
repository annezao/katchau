import { BASE_URL } from '../variables/env'
const axios = require('axios');

const deviceServices = {
    async readDevices(id) {
        const devices = await axios.get(
            `${BASE_URL}/api/User/`+id+`/Device`
        );
        
        return devices;
    },
    async readDevice(id) {
        const response = await axios.get(
            `${BASE_URL}/api/Device/` + id
        );

        return response.data;
    },
};
  
export default deviceServices;