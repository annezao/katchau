// import configService from "./settings";
import axios from 'axios'
import { BASE_URL } from '../variables/env'

const Auth = {
    isAuthenticated() {
        
        return new Promise(function (resolve, reject){

            if (!!localStorage.getItem('shallnotpass')) {
                localStorage.removeItem('shallnotpass');
                localStorage.removeItem('_u');
                reject({ message: "Faça login para continuar.", authenticated: false, errorCode: 401 });
            }else {
                let user = localStorage.getItem('_u');
                if (!!user) {

                    user = JSON.parse(user);
                    axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;

                    resolve({
                        message: "Is logged.", user: { username: user.username, email: user.email, password: user.password },
                        authenticated: true
                    });
                }
                else
                    reject({ message: "Isn't logged.", authenticated: false });
            }
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

        axios.defaults.headers.common['Authorization'] = `Token ${user.token}`;
        localStorage.setItem("_u", JSON.stringify(user));
        console.log("Logged with ", user.email);

        return user;
        
    },
    signOut: () => {
        return new Promise(function (resolve) {
            localStorage.removeItem('_u');
            delete axios.defaults.headers.common["Authorization"]
            resolve();
        });
    }
};

export default Auth;