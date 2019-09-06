const  spawnNotification = (body, title) => {
    var options = {
    title: title,
    body: body
    };
    var n = new Notification(title, options);
}

export default spawnNotification;