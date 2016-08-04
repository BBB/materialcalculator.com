require('babel/polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  app: {
    title: 'Material Calculator',
    description: 'Calculate the number of pieces of material you will need and reduce cost as well as wastage',
    head: {
      titleTemplate: 'Material Calculator: %s',
      meta: [
        { name: 'description', content: 'Calculate the number of pieces of material you will need and reduce cost as well as wastage', },
        { charset: 'utf-8', },
      ],
    },
  },

}, environment);
