let jestAssertions = require('redux-actions-assertions/jest');
const { toMatchOneOf, toMatchShapeOf } = require('jest-to-match-shape-of')
 
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
})
beforeEach(jestAssertions.registerAssertions);