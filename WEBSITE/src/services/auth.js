// import Parse from 'parse';
// import configService from "./settings";

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
    async signIn(email, password) {

        let user = {
            username: "Fake User",
            email,
            password 
        };

        localStorage.setItem("_u", JSON.stringify(user));

        console.log("(fake login) Logged with ", user.email);
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