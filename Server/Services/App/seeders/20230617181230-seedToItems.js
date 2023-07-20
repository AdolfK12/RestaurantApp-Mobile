"use strict";

const data = [
  {
    name: "California Roll",
    description: "A delicious sushi roll with crab, cucumber, and avocado.",
    price: 15000,
    imgUrl: "https://example.com/images/california-roll.jpg",
    UserId: 1,
    CategoryId: 1,
    createdAt: "2023-06-12T10:30:00.000Z",
    updatedAt: "2023-06-12T10:30:00.000Z",
  },
  {
    name: "Salmon Sashimi",
    description: "Fresh salmon served raw and sliced thinly.",
    price: 25000,
    imgUrl: "https://example.com/images/salmon-sashimi.jpg",
    UserId: 1,
    CategoryId: 2,
    createdAt: "2023-06-12T11:00:00.000Z",
    updatedAt: "2023-06-12T11:00:00.000Z",
  },
  {
    name: "Tuna Nigiri",
    description: "A simple dish with fresh tuna served on top of sushi rice.",
    price: 20000,
    imgUrl: "https://example.com/images/tuna-nigiri.jpg",
    UserId: 2,
    CategoryId: 3,
    createdAt: "2023-06-12T12:00:00.000Z",
    updatedAt: "2023-06-12T12:00:00.000Z",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Items", data, {});
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
    await queryInterface.bulkDelete("Items", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
