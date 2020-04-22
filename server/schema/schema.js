const lodash = require("lodash");
const graphql = require("graphql");
const Item = require("../models/items");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    salt: { type: GraphQLString }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RecipeType = new GraphQLObjectType({
  name: "Recipe",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    content: { type: GraphQLString },
    ingredients: { type: GraphQLString },
    user: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find({ username: args.username });
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.find({});
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Item.findById(args.id);
      }
    },
    getItem: {
      type: ItemType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Item.findById(args.id);
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find({});
      }
    },
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Recipe.findById(args.id);
      }
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args) {
        return Recipe.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        salt: { type: GraphQLString }
      },
      resolve(parent, args) {
        let newUser = new User({
          username: args.username,
          password: args.password,
          salt: args.salt
        });
        return newUser.save();
      }
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        let newItem = new Item({
          name: args.name,
          id: args.id
        });
        return newItem.save();
      }
    },
    addRecipe: {
      type: RecipeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLID },
        content: { type: GraphQLNonNull(GraphQLString) },
        ingredients: { type: GraphQLString },
        user: { type: GraphQLString },
        type: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newRecipe = new Recipe({
          name: args.name,
          id: args.id,
          content: args.content,
          ingredients: args.ingredients,
          user: args.user,
          type: args.type
        });
        return newRecipe.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
