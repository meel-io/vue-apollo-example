const faker = require("faker");

const getRandomQuantity = () => {
  return Array.from(Array(Math.floor(Math.random() * 5) + 1));
};

const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

const getAgents = () => {
  return getRandomQuantity().map(() => {
    return getAgent();
  });
};

const getAgent = () => {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    rates: getAllRates()
  };
};

const getAllRates = () => {
  return getRandomBoolean() ? getSeasonRates() : getRates();
};

const getSeasonRate = () => {
  return {
    id: faker.random.uuid(),
    name: getRandomBoolean() ? "Non-refundable" : "default",
    seasons: getSeasons()
  };
};

const getSeasonRates = () => {
  return getRandomQuantity().map(() => {
    return getSeasonRate();
  });
};

const getSeason = () => {
  const startDate = faker.date.future();
  return {
    id: faker.random.uuid(),
    name: faker.random.word(),
    startDate: `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
    rooms: getRoomRates()
  };
};

const getSeasons = () => {
  return getRandomQuantity().map(() => {
    return getSeason();
  });
};

const getRates = () => {
  return getRandomQuantity().map(() => {
    return getRate();
  });
};

const getRate = () => {
  return {
    name: getRandomBoolean() ? "Non-refundable" : "default",
    rooms: getRoomRates()
  };
};

const getRoomRates = () => {
  return [
    {
      id: 1,
      roomType: "1 Bed Private",
      weekdayRate: 5.0,
      weekendRate: 5.0
    },
    {
      id: 2,
      roomType: "2 Bed Private",
      weekdayRate: 5.0,
      weekendRate: 5.0
    },
    {
      id: 3,
      roomType: "5 Bed Dorm",
      weekdayRate: 5.0,
      weekendRate: 5.0
    }
  ];
};

module.exports = { getAgents };
