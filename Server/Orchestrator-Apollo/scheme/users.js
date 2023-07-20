const USER_URL = "http://localhost:3002";
const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDef = `#graphql
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  input addUser {
      username:String,
      email:String,
      password:String,
      role:String,
      phoneNumber:String,
      address:String,
  }

  type addUserResponse{
    _id: String
    username:String
    email:String
    role:String
  }

  type deleteUserResponse {
    message: String
  }


  type Query {
    users: [User],
    userDetail(userId: ID!): User
  }

  type Mutation {
    addUserMutation(input: addUser): addUserResponse
    deleteUser(userId: ID!): deleteUserResponse
  }


`;

const resolver = {
  Query: {
    users: async () => {
      try {
        const users = await redis.get("users");
        if (users) {
          return JSON.parse(users);
        }
      } catch (err) {
        console.log("Error fetching data from Redis", err);
      }

      const { data } = await axios.get(`${USER_URL}/users`);

      redis.set("users", JSON.stringify(data.data));

      return data.data;
    },

    userDetail: async (_, { userId }) => {
      try {
        const { data } = await axios.get(`${USER_URL}/users/${userId}`);
        return data.data;
      } catch (error) {
        console.log("Error:", error);
      }
    },
  },

  Mutation: {
    addUserMutation: async (_, { input }) => {
      try {
        const { data } = await axios.post(`${USER_URL}/users`, input);
        redis.del("users");
        return {
          _id: data._id,
          username: data.username,
          email: data.email,
          role: data.role,
        };
      } catch (error) {
        console.log("Error:", error);
      }
    },

    deleteUser: async (_, { userId }) => {
      try {
        const response = await axios.delete(`${USER_URL}/users/${userId}`);

        const deletedUser = response.data;

        redis.del("users");

        return {
          message: `User with id : ${userId} has been deleted successfully`,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  typeDef,
  resolver,
};
