let lodash = require("lodash");
let graphql = require("graphql");
let Item = require("../models/items");
let Recipe = require("../models/recipe");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList
} = graphql;

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
    content: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
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
        name: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLID },
        content: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newRecipe = new Recipe({
          name: args.name,
          id: args.id,
          content: args.content
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
