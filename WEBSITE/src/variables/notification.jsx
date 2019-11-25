import Parse from 'parse';

async function readNotifications() {
  console.log("notifications parse");
  const Notification = Parse.Object.extend('Notification');
  const query = new Parse.Query(Notification);
  query.equalTo("owner", Parse.User.current());

  let notifications = await query.find()
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