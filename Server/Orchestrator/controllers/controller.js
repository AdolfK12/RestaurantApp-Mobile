const Redis = require("ioredis");
const axios = require("axios");

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const FIRST_SERVER_URL =
  process.env.FIRST_SERVER_URL || "http://localhost:3001";
const SECOND_SERVER_URL =
  process.env.SECOND_SERVER_URL || "http://localhost:3002";

class Controller {
  static async getItems(req, res) {
    try {
      let itemsCache = await redis.get("items");

      if (itemsCache) {
        let itemsResult = JSON.parse(itemsCache);
        return res.status(200).json(itemsResult);
      }

      const response = await axios.get(`${FIRST_SERVER_URL}/items`);

      redis.set("items", JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async postItem(req, res) {
    try {
      const response = await axios.post(
        `${FIRST_SERVER_URL}/items/add`,
        req.body
      );
      redis.del("items");
      res.status(201).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async getItemDetail(req, res) {
    try {
      const { id } = req.params;

      let itemCache = await redis.get(`item:${id}`);

      if (itemCache) {
        let itemResult = JSON.parse(itemCache);
        return res.status(200).json(itemResult);
      }

      const response = await axios.get(`${FIRST_SERVER_URL}/items/${id}`);

      redis.set(`item:${id}`, JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async editItem(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.put(
        `${FIRST_SERVER_URL}/items/edit/${id}`,
        req.body
      );
      redis.del("items");
      redis.del(`item:${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.delete(
        `${FIRST_SERVER_URL}/items/delete/${id}`
      );
      redis.del("items");
      redis.del(`item:${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async getUsers(req, res) {
    try {
      let userCache = await redis.get("users");

      if (userCache) {
        let userResult = JSON.parse(userCache);
        return res.status(200).json(userResult);
      }

      const response = await axios.get(`${SECOND_SERVER_URL}/users`);

      redis.set("users", JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      let userCache = await redis.get(`user:${id}`);

      if (userCache) {
        let userResult = JSON.parse(userCache);
        return res.status(200).json(userResult);
      }

      const response = await axios.get(`${SECOND_SERVER_URL}/users/${id}`);

      redis.set(`user:${id}`, JSON.stringify(response.data));
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async addUser(req, res) {
    try {
      const response = await axios.post(`${SECOND_SERVER_URL}/users`, req.body);
      redis.del("users");
      res.status(201).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const response = await axios.delete(`${SECOND_SERVER_URL}/users/${id}`);
      redis.del("users");
      redis.del(`user:${id}`);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(501).json({
        statusCode: 501,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  }
}

module.exports = Controller;
