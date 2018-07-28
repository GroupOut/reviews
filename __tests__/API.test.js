
var $ = require('jquery');

describe('API get reviews test', () => {
  it('returns the correct star score for the first review of deal 90', (done) => {
    $.ajax({
      url: 'http://localhost:3004/deal/90/reviews',
      type: 'GET',
      success: (result) => {
        let firstReview = result[0];
        expect(firstReview.review_score).toEqual(5);
        done();
      }
    })
    .catch(err => {
      console.log(err);
    });
  });
});

