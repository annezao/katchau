import Parse from 'parse';

const configServices = {
    async readConfig() {
        console.log("cofig")
        const Config = Parse.Object.extend('Config')
        const query = new Parse.Query(Config)
        query.equalTo("owner", Parse.User.current());
        let config = await query.find()
        return config[0];
    },
    async updatingConfig(id, notificar_email, notificar_push, vibrate, som, limite) {
        console.log("cofig")
        let Config = Parse.Object.extend('Config')
        const query = new Parse.Query(Config);
        let config = await query.get(id); 

        config.set('notificar_email', notificar_email)
        config.set('notificar_push', notificar_push)
        config.set('vibrate', vibrate)
        config.set('som', som)
        // config.set('intervalo_notificar', intervalo_notificar)
        config.set('limite', limite)
        return config.save();
    }
};

export default configServices;