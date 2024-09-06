const { Op } = require('sequelize');
const {Session} = require('../models/index')// Get the session model from the store

const cleanUpExpiredSessions = async () => {
  try {
 await Session.destroy({
      where: {
        expires: {
          [Op.lt]: new Date()
        }
      }
    });
    console.log('Expired sessions cleaned up.');
  } catch (error) {
    console.error('Error cleaning up expired sessions:', error);
  }
};

// Run cleanup task every hour
module.exports = cleanUpExpiredSessions