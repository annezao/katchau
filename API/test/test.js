const Base = require('../src/basic_queries')

function bol() {
  return Math.random() >= 0.5;
}

function st() {
  s =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  console.log(s);
  return s;
}

async function run() {
  address = await Base.createAddress(st(), st(), st(), st());

  person = await Base.createPerson(st(), st(), st(), address);
  config = await Base.createConfig();
  user = await Base.createUser(st(), st(), st(), "f@gmail.com", person, config);
  device = await Base.createDevice();
  monitors = await Base.createMonitoring(person, device);

  await Base.createVoltage(device, Math.random());
  await Base.createVoltage(device, Math.random());

  role = await Base.createRole(st(), bol(), bol());
  await Base.setRole(user, role);
}

async function run2() {
  user = await Base.readUser('3LX84N50v9');
  console.log(user);
  role = await Base.readRole('WnqSn0Yocf');
  console.log(role);
  await Base.setRole(user, role);
}

run2();
// run();

// async function run() {
//   address = await createAddress("Terencio Sampaio", "Grageru", "215", "21321");
//   person = await createPerson("fabio", "valente", "9999999", address);
//   user = await createUser(
//     "anya",
//     "123456",
//     "123456",
//     "fpvrodrigues@gmail.com",
//     person
//   );
//   config = await createConfig(user);
//   device = await createDevice();
//   monitors = await createMonitoring(person, device);
//   await createVoltage(device, 100);
//   await createVoltage(device, 20);
//   role = await createRole("admin", true, true);
//   await setRole(user, role);
// }

// async function TesteCaixaBrancaVolume() {
//   for (let index = 0; index < 4999; index++) {
//     address = await createAddress(
//       "Terencio Sampaio",
//       "Grageru",
//       "215",
//       "21321"
//     );
//
//     person = await createPerson("fabio", "valente", "9999999", address);
//     config = await createConfig();
//
//     user = await createUser(
//       "anya",
//       "123456",
//       "123456",
//       "fpvrodrigues@gmail.com",
//       person,
//       config
//     );
//     device = await createDevice();
//     monitors = await createMonitoring(person, device);
//
//     await createVoltage(device, 100);
//     await createVoltage(device, 20);
//
//     role = await createRole("admin", true, true);
//     await setRole(user, role);
//   }
// }
