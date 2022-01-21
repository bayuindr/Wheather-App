'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let destinasion = require("../destinasion.json")
    return queryInterface.bulkInsert('Destinasions', destinasion.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    }))
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinasions', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
