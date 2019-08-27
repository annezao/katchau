import Parse from 'parse';

const Auth = {
    isAuthenticated() {
        
        return new Promise(function (resolve, reject){
            let cu = Parse.User.current();
            if (!!cu) {
                console.log("Verificando autenticidade...");
                cu.fetch().then(function (User) {

                    console.log("User:", User)
                    resolve({
                        message: "Usuário logado.", user: { username: User.get("username"), email: User.get("email") }, 
                        authenticated: User.authenticated() });

                }).catch(function (error) {

                    console.log("Error: " + error.code + " " + error.message);
                    reject({message: error.message, authenticated:false, errorCode: error.code});

                });
            }
            else
                reject({ message: "Usuário não logado.", authenticated: false });
        });
    },
    isLogged: () => {
        console.log(Parse.User.current().authenticated());
        return !!Parse.User.current();
    },
    async signIn(email, password) {
        const user = await Parse.User
            .logIn(email, password);

        console.log("Logged with ", user.attributes.email);
        return user;
    },
    signOut: () => Parse.User.logOut()
};

export default Auth;