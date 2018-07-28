
var $ = require('jquery');

describe('API get reviews test', function () {
  it('returns the correct star score for the first review of deal 90', function (done) {
    $.ajax({
      url: 'http://localhost:3004/deal/90/reviews',
      type: 'GET',
      success: function (result) {
        let firstReview = result[0];
        expect(firstReview.review_score).toEqual(5);
        done();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  });
});

