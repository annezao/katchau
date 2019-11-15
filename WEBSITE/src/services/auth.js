// import Parse from 'parse';
// import configService from "./settings";
import axios from 'axios'
import { BASE_URL } from '../variables/env'

const Auth = {
    isAuthenticated() {
        // console.log("Error: " + error.code + " " + error.message);
        // reject({ message: error.message, authenticated: false, errorCode: error.code });
        
        return new Promise(function (resolve, reject){
            console.log("Logging...");

            let user = localStorage.getItem('_u');
            if (!!user) {

                user = JSON.parse(user);

                resolve({
                    message: "Is logged.", user: { username: user.username, email: user.email, password: user.password },
                    authenticated: true
                });
            }
            else
                reject({ message: "Isn't logged.", authenticated: false });
        });
    },
    async signIn(username, password) {

        const response = await axios.post(
            `${BASE_URL}/api/auth/`,
            {
                username: username,
                password: password
            }
        ),
        user = response.data;

        localStorage.setItem("_u", JSON.stringify(user));
        console.log("Logged with ", user.email);

        return user;
        
    },
    signOut: () => {
        return new Promise(function (resolve, reject) {
            localStorage.removeItem('_u');
            resolve();
        });
    }
};

export default Auth;