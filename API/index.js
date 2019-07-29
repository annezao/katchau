const Parse = require('parse/node')
Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.initialize('H5dcONjNMNy5WTpFt9tXAHdEAeanqT8mlq9HRSPu', 'WPnfXA7fjUYszyhf8SuEkcKR8X0LyRTEL6TrodJZ')

function createPerson(name, lastname, email, cel){

    let Person = Parse.Object.extend('Person')
    let person = new Person()

    person.set('name', name)
    person.set('lastname', lastname)
    person.set('email', email)
    person.set('cellphone', cel)

    person.save().then(
        (result) => {
          if (typeof document !== 'undefined') document.write(`Person created: ${JSON.stringify(result)}`);
          console.log('Person created', result);
          return result;
        },
        (error) => {
          if (typeof document !== 'undefined') document.write(`Error while creating Person: ${JSON.stringify(error)}`);
          console.error('Error while creating Person: ', error);
        }
      );
}

async function readPerson(Id){
  const Person = Parse.Object.extend('Person');
  const query = new Parse.Query(Person);
  let person = await query.get(Id)
  return person 
}

async function updatingPerson(Id, username, email, confirmPassword, owner){
  let Person = Parse.Object.extend('Person')
  const query = new Parse.Query(Person);

  let person =  await query.get(Id)
  person.set('username', username);
  person.set('email', email);
  person.set('Password', confirmPassword);
  person.set('confirmPassword', confirmPassword);
  person.set('owner', owner);


  person.save().then((response) => {
    if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
    console.log('Updated user', response);
    return response
  }).catch((error) => {
    if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
    console.error('Error while updating user', error);
  });
}

async function deletePerson(Id){
  let Person = Parse.Object.extend('Person')
  const query = new Parse.Query(Person);

  let person = query.get(Id)
    person.destroy().then((response) => {
      if (typeof document !== 'undefined') document.write(`Deleted user: ${JSON.stringify(response)}`);
      console.log('Deleted user', response);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting user: ${JSON.stringify(error)}`);
      console.error('Error while deleting user', error);
    })
}

async function createUser(username, password, confirmPassword, email, owner){
  const user = new Parse.User();

  user.set('username', username);
  user.set('email', email);
  user.set('confirmPassword', confirmPassword);
  user.set('password', password);
  user.set("owner", owner)

  user.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`User created: ${JSON.stringify(result)}`);
      console.log('User created', result);
      return result
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating User: ${JSON.stringify(error)}`);
      console.error('Error while creating User: ', error);
    }
  );
}

async function readUser(Id){
  const User = new Parse.User();
  const query = new Parse.Query(User)
  let user = await query.get(Id)
  return user
}

async function updatingUser(Id, username, email, confirmPassword, owner){
  const User = new Parse.User();
  const query = new Parse.Query(User);

  let user =  await query.get(Id)
  user.set('username', username);
  user.set('email', email);
  user.set('Password', confirmPassword);
  user.set('confirmPassword', confirmPassword);
  user.set('owner', owner);


  user.save().then((response) => {
    if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
    console.log('Updated user', response);
    return response
  }).catch((error) => {
    if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
    console.error('Error while updating user', error);
  });
}

async function deleteUser(Id){
  const User = new Parse.User();
  const query = new Parse.Query(User);

  let user = query.get(Id)
    user.destroy().then((response) => {
      if (typeof document !== 'undefined') document.write(`Deleted user: ${JSON.stringify(response)}`);
      console.log('Deleted user', response);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting user: ${JSON.stringify(error)}`);
      console.error('Error while deleting user', error);
    })
}

async function createAddress(street, neighborhood, n, cep, owner){
  const Address = Parse.Object.extend('Address');
  const address = new Address();


  address.set('street', street);
  address.set('neighborhood', neighborhood);
  address.set('number', n);
  address.set('cep', cep);
  address.set("owner", owner)

  address.save().then(
    (result) => {
      if (typeof document !== 'undefined') document.write(`User created: ${JSON.stringify(result)}`);
      console.log('User created', result);
      return result
    },
    (error) => {
      if (typeof document !== 'undefined') document.write(`Error while creating User: ${JSON.stringify(error)}`);
      console.error('Error while creating User: ', error);
    }
  );
}

async function readAdress(Id){
  const Address = Parse.Object.extend('Address');
  const query = new Parse.Query(Address);
  let address = await query.get(Id)
  return address
}

async function updatingAddress(Id, street, neighborhood, n, cep, owner){
  let Address = Parse.Object.extend('Address')
  const query = new Parse.Query(Address);

  let address =  await query.get(Id)
  address.set('street', street);
  address.set('neighborhood', neighborhood);
  address.set('number', n);
  address.set('cep', cep);
  address.set("owner", owner)


  address.save().then((response) => {
    if (typeof document !== 'undefined') document.write(`Updated user: ${JSON.stringify(response)}`);
    console.log('Updated user', response);
    return response
  }).catch((error) => {
    if (typeof document !== 'undefined') document.write(`Error while updating user: ${JSON.stringify(error)}`);
    console.error('Error while updating user', error);
  });
}

async function deleteAddress(Id){
  let Address = Parse.Object.extend('Address')
  const query = new Parse.Query(Address);

  let address = query.get(Id)
    address.destroy().then((response) => {
      if (typeof document !== 'undefined') document.write(`Deleted user: ${JSON.stringify(response)}`);
      console.log('Deleted user', response);
    }, (error) => {
      if (typeof document !== 'undefined') document.write(`Error while deleting user: ${JSON.stringify(error)}`);
      console.error('Error while deleting user', error);
    })
}

//Testing

async function run(){
  //let Person = await readPerson("40Z7orijSS")
  //createAddress("Terencio Sampaio", "Grageru", "215", "49025-700", user)
  //createUser("anya", "123456", "123456", "email@example.com", Person)
}

run()