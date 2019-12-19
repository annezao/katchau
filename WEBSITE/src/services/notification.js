//const axios = require('axios');

const servicesNotifications = {
    async readNotifications(){
        return notifications;
    },
}
let notifications = [
    {
        "_id":"1",
        "title":"Aviso",
        "description":"Notificações ainda não disponíveis no momento."
    },
  ];
  
export default servicesNotifications;
// import Parse from 'parse';

// const spawnNotification = (title,body) => {
//     var options = {
//         title: title,
//         body: body
//     };

//     // Let's check if the browser supports notifications
//     if (!("Notification" in window)) {
//         alert("This browser does not support desktop notification");
//     }

//     // Let's check whether notification permissions have already been granted
//     else if (Notification.permission === "granted") {
//         // If it's okay let's create a notification
//         var n = new Notification(title, options);
//     }

//     // Otherwise, we need to ask the user for permission
//     else if (Notification.permission !== "denied") {
//         Notification.requestPermission().then(function (permission) {
//             // If the user accepts, let's create a notification
//             if (permission === "granted") {
//                 var n = new Notification(title, options);
//             }
//         });
//     }
// }

// const sendEmail = (body, title) => {
//     Parse.Cloud.run('sendgridEmail', {
//         toEmail: 'katchaumarquinhos@gmail.com', subject: title,
//         body: body
//     })
//     .then(function (result) {
//         console.log(result);
//     })
//     .catch(function (e) {
//         console.log(e);
//     });
// }

// export {
//     spawnNotification, sendEmail
// }