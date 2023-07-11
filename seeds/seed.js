const sequelize = require('../config/connection');
const { User, Comments, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Post of postData) {
    await Post.create({
      ...Post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const Comments of commentsData) {
    await Comments.create({
      ...Comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
