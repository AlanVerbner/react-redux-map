import _ from 'lodash';
import faker from 'faker';

const db = [];

_.range(50).forEach(() => {
  const fakeId = faker.random.uuid()
  db[fakeId] = {
    name: faker.company.companyName(),
    phone: faker.phone.phoneNumber(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  };
});

function executeWithRandomDelay(cb) {
  return new Promise((resolve) => setTimeout(faker.random.number(100), resolve(cb())));
}

export function fetchAsync() {
  const locationsAsArray = _.keys(db).map((key) => {
    return {
      ...db[key],
      id: key,
    };
  });
  return executeWithRandomDelay(() => locationsAsArray);
}

export function deleteAsync(id) {
  return executeWithRandomDelay(() => {
    delete db[id];
  });
}
