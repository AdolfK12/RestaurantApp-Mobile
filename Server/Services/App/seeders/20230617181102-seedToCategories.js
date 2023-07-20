"use strict";

const data = [
  {
    name: "Sushi Rolls",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Sashimi",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Nigiri",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Maki",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Uramaki",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Temaki",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Chirashi",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Gunkan",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Oshi",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Inari",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", data, {});
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
