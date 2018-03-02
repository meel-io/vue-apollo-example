const db = require("./db");

const getAgents = () => {
  return db.get("agents").value();
};

const setRoomRate = (roomRateId, weekdayRate = 0, weekendRate = 0) => {
  const rates = [];
  const agents = db.get("agents").value();

  const agent = agentRateHasRoomRate(agents, roomRateId);

  const updatedRates = modifyRoomRate(agent.rates, {
    roomRateId,
    weekdayRate,
    weekendRate
  });

  agent.assign({ rates: updatedRates }).write();

  return updatedRates;
};

const agentRateHasRoomRate = (agents, roomRateId) => {
  return agents.reduce(agent => {
    if (ratesHaveRoomRate(agent.rates, roomRateId)) {
      return agent;
    }
  });
};

const ratesHaveRoomRate = (rates, roomRateId) => {
  return rates.find(rate => {
    if (rate.seasons) {
      return seasons.find(season => {
        return !!rateHasRoomRate(season.rooms);
      });
    }
    return !!rateHasRoomRate(rates.rooms, roomRateId);
  });
};

const rateHasRoomRate = (rooms, roomRateId) => {
  return rooms.find(room => {
    return room.id == roomRateId;
  });
};

const modifyRateRoomRate = (
  rates,
  { roomRateId, weekdayRate, weekendRate }
) => {
  const rate = ratesHaveRoomRate(rates, roomRateId);

  if (rate.seasons) {
    const season = seasons.find(season => {
      return !!ratesHaveRoomRate(season.rooms);
    });

    return modifyRoomRate(season.rooms, {
      roomRateId,
      weekdayRate,
      weekendRate
    });
  }

  return modifyRoomRate(rate.rooms, {
    roomRateId,
    weekdayRate,
    weekendRate
  });
};

modifyRoomRate = (rooms, { roomRateId, weekdayRate, weekendRate }) => {
  const roomRate = rooms.find(room => {
    room.id == roomRateId;
  });

  roomRate.weekdayRate = weekdayRate;
  roomRate.weekendRate = weekendRate;

  return rooms;
};

module.exports = { getAgents, setRoomRate };
