const axios = require("axios");
const { log } = require("console");
const Redis = require("ioredis");
const ITEM_SERVER_URL = "http://localhost:3001";
const USER_SERVER_URL = "http://localhost:3002";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

const typeDefItem = `#graphql
  type Item {
  id: ID!,
  name: String,
  description: String,
  price: Int,
  imgUrl: String,
  UserId: String,  
  Category: String, 
}

type Category {
  id: ID!,
  name: String
}

  type Ingredient {
    name: String,
    ItemId: ID
  }

  input ItemInput {
    name: String,
    description: String,
    price: Int,
    imgUrl: String,
    CategoryId: ID,
    ingredients: [IngredientInput]
  }

  input IngredientInput {
    name: String,
  }

  type addItemResponse {
    item: Item,
    ingredients: [Ingredient],
    message: String
  }

  type deleteItemResponse {
    message: String
  }

  type editItemResponse {
    message: String
  }


  type Query {
    items: [Item],
    getItemById(itemId: ID!): Item
  }

  type Mutation {
    addItemWithIngredients(itemInput: ItemInput): addItemResponse,
    deleteItem(itemId: ID!): deleteItemResponse,
    editItem(itemId: ID!, itemInput: ItemInput): editItemResponse
  }
`;

const resolverTtem = {
  Query: {
    items: async () => {
      try {
        console.log("thipoawehnf;oiw;akih;oiawefj");
        let itemsCache = await redis.get("items");

        if (itemsCache) {
          return JSON.parse(itemsCache);
        }

        const { data } = await axios.get(`${ITEM_SERVER_URL}/items`);

        const modifiedData = await Promise.all(
          data.map(async (item) => {
            const categoryResponse = await axios.get(
              `${ITEM_SERVER_URL}/categories/${item.CategoryId}`
            );
            const userResponse = await axios.get(
              `${USER_SERVER_URL}/users/${item.UserId}`
            );
            // console.log(userResponse);
            return {
              ...item,
              Category: categoryResponse.data.name,
              UserId: userResponse.data.data.username,
            };
          })
        );

        redis.set("items", JSON.stringify(modifiedData));
        return modifiedData;
      } catch (error) {
        console.error(error);
      }
    },

    getItemById: async (_, { itemId }) => {
      try {
        const { data } = await axios.get(`${ITEM_SERVER_URL}/items/${itemId}`);
        const itemObject = { ...data };

        const { data: categoryData } = await axios.get(
          `${ITEM_SERVER_URL}/categories/${data.CategoryId}`
        );
        itemObject.Category = categoryData.name;

        const { data: userData } = await axios.get(
          `${USER_SERVER_URL}/users/${data.UserId}`
        );
        itemObject.UserId = userData.data.username;

        return itemObject;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    addItemWithIngredients: async (_, { itemInput }) => {
      try {
        const { data } = await axios.post(
          `${ITEM_SERVER_URL}/items/add`,
          itemInput
        );
        redis.del("items");
        return {
          item: data.item,
          ingredients: data.ingredients,
          message: "Item and ingredients added successfully.",
        };
      } catch (error) {
        console.error(error);
        return {
          message: `Error adding item and ingredients: ${error.message}`,
        };
      }
    },

    deleteItem: async (_, { itemId }) => {
      try {
        await axios.delete(`${ITEM_SERVER_URL}/items/delete/${itemId}`);
        redis.del("items");
        return { message: `Item with id ${itemId} deleted successfully.` };
      } catch (error) {
        console.error(error);
        return {
          message: `Error deleting item with id ${itemId}: ${error.message}`,
        };
      }
    },

    editItem: async (_, { itemId, itemInput }) => {
      try {
        const { data } = await axios.put(
          `${ITEM_SERVER_URL}/items/edit/${itemId}`,
          itemInput
        );
        redis.del("items");
        return {
          item: data,
          message: "Item updated successfully.",
        };
      } catch (error) {
        console.error(error);
        return {
          message: `Error updating item with id ${itemId}: ${error.message}`,
        };
      }
    },
  },
};

module.exports = { typeDefItem, resolverTtem };
