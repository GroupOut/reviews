
// import jquery from 'jquery';
// import React from 'react';

// describe('API get reviews test', function () {
//   it('returns the correct star score for the first review of deal 90', function (done) {
//     jquery.ajax({
//       url: 'http://localhost:3004/deal/90/reviews',
//       type: 'GET',
//       success: function (result) {
//         let firstReview = result[0];
//         expect(firstReview.review_score).toEqual(5);
//         done();
//       }
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
//   });
// });

const sum = require('../sum');

test('adds 1 + 2 to equal 3', function () {
  expect(sum(1, 2)).toBe(3);
})