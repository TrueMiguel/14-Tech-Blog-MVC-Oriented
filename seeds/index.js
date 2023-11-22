const sequelize = require('../config/connections');
const seedPost = require('./postData');
const seedUser = require('./userData');


// updated the seeding process to the below to have it seed the users and then the reviews
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  process.exit(0);
};

seedAll();