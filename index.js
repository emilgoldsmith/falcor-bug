/* Falcor */
const BaseRouter = require('falcor-router');
const falcor = require('falcor');

const $ref = falcor.Model.ref;

class FalcorRouter extends BaseRouter.createClass([
  {
    route: 'first',
    get: async () => {
      return [
        {
          path: ['first'],
          value: $ref(['second']),
        },
      ];
    },
  },
  {
    route: 'second',
    get: async () => {
      return [
        {
          path: ['second'],
          value: $ref(['third']),
        },
      ];
    },
  },
  {
    route: "third['title']",
    get: async pathSet => ({
      path: ['third', 'title'],
      value: 'title',
    }),
  },
]) {
  constructor(...args) {
    super(...args);
  }
}

// Shared serverModel
const serverModel = new falcor.Model({
  source: new FalcorRouter(),
}).batch();

serverModel
  .asDataSource()
  .get([['first', 'title']])
  .subscribe(x => console.log(JSON.stringify(x, null, 4)));
