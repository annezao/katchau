import Parse from 'parse';

async function readNotifications(id) {
  console.log("notifications parse");
  const Notification = Parse.Object.extend('Notification');
  const query = new Parse.Query(Notification);
  let notifications =  await query.get(id)
  return notifications
}
let notifications = [
  {
      "_id":"1",
      "title":"minha casa",
      "description":"controlador de geladeira"
  },
  {
      "_id":"2",
      "title":"casa da minha mãe",
      "description":"controlador da sala"
  }
];

export {
  readNotifications,
  notifications
}