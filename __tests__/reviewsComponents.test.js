const sum = require('../sum');
import reviews from '../client/components/reviews';
import IndividualReviews from '../client/components/IndividualReviews';

test('adds 1 + 2 to equal 3', function () {
  expect(sum(1, 2)).toBe(3);
})

// test('check that formatDateToBeSorted correctly formats dates to a number', function() {
//   expect(IndividualReviews.formatDateToBeSorted('2018-01-31 22:18:01')).toBe(20180131221801);
// })