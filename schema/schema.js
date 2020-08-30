const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movie');
const Director = require('../models/director');
const Language = require('../models/language');
const Genre = require('../models/genre');
const Country = require('../models/country');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  }),
});

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  }),
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    year: {
      type: GraphQLString,
    },
    language: {
      type: LanguageType,
      resolve(parent, args) {
        return Language.findById(parent.languageID);
      },
    },
    genre: {
      type: GenreType,
      resolve(parent, args) {
        return Genre.findById(parent.genreID);
      },
    },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorID);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    country: {
      type: CountryType,
      resolve(parent, args) {
        return Country.findById(parent.countryID);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({
          directorID: parent.id,
        });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Director.findbyId(args.id);
      },
    },
    country: {
      type: CountryType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Country.findbyId(args.id);
      },
    },
    genre: {
      type: GenreType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Genre.findbyId(args.id);
      },
    },
    language: {
      type: LanguageType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Language.findbyId(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({}).sort({ name: 1 });
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({}).sort({ name: 1 });
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve(parent, args) {
        return Genre.find({}).sort({ name: 1 });
      },
    },
    languages: {
      type: new GraphQLList(LanguageType),
      resolve(parent, args) {
        return Language.find({}).sort({ name: 1 });
      },
    },
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parent, args) {
        return Country.find({}).sort({ name: 1 });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLanguage: {
      type: LanguageType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let language = new Language({
          name: args.name,
        });
        return Language.update(
          { name: args.name },
          { $setOnInsert: language },
          { upsert: true }
        );
      },
    },
    addGenre: {
      type: GenreType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let genre = new Genre({
          name: args.name,
        });
        return Genre.update(
          { name: args.name },
          { $setOnInsert: genre },
          { upsert: true }
        );
      },
    },
    addCountry: {
      type: CountryType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        let country = new Country({
          name: args.name,
        });
        return Country.update(
          { name: args.name },
          { $setOnInsert: country },
          { upsert: true }
        );
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        countryID: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          countryID: args.countryID,
        });
        return Director.update(
          { name: args.name },
          { $setOnInsert: director },
          { upsert: true }
        );
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
        year: {
          type: GraphQLNonNull(GraphQLString),
        },
        genreID: {
          type: GraphQLNonNull(GraphQLID),
        },
        directorID: {
          type: GraphQLNonNull(GraphQLID),
        },
        languageID: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          year: args.year,
          genreID: args.genreID,
          directorID: args.directorID,
          languageID: args.languageID,
        });
        return Movie.update(
          { name: args.name },
          { $setOnInsert: movie },
          { upsert: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
