import { BASE_URL } from '../variables/env'
const axios = require('axios');

const configServices = {
    async readConfig(id) {
        const config = await axios.get(
        `${BASE_URL}/api/Config/`+id 
        );

        console.log(config.data)
        return config;
    },
    async updatingConfig(id, email_notifications, push_notifications,
        vibrate, sound, time_interval) {
        const config = {id: id,
            email_notifications: email_notifications,
            push_notifications: push_notifications,
            vibrate: vibrate, 
            sound: sound,
            time_interval: time_interval};
        console.log(config)
        const res = await axios.put(`${BASE_URL}/api/Config/${id}`, config);
        console.log(res.data)
        return res.data;
    }
};

export default configServices;