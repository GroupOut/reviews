import React from 'react';
import $ from 'jquery';

class Reviews extends React.Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount() {
    // make initial get request here to retrieve reviews for specific deal
  }

  getReviewsForDeal(dealId) {
    $.ajax({
      url: `/deal/${dealId}/reviews`,
      type: 'GET',
      success: (data) => {
        console.log('REVIEWS DATA', data)
      }
    });
  }

  increaseHelpfulScore(reviewId, currentScore) {
    $.ajax({
      url: `/reviews/${reviewId}/helpful/${currentScore}`,
      type: 'PUT',
      success: (data) => {
        console.log('ADD TO HELPFUL SCORE', data)
      }
    });
  }

  increaseRelevantScore(reviewId, currentScore) {
    $.ajax({
      url: `/reviews/${reviewId}/helpful/${currentScore}`,
      type: 'PUT',
      success: (data) => {
        console.log('ADD TO Relevant SCORE', data)
      }
    });
  }

// things I see about the groupon reviews section
//// some padding around the entire thing. Jens thinks 10 px
//// header at the top is almost stock minus the stars and number of reviews, which doesn't actually match the review count
// each review is its own element
//// each review has additional padding
//// each review has a header, body with text, and helpful button

// show three reviews 

  render() {
    return (
      <div>
        <h2>React is hooked up and working</h2>
      </div>
    );
  }
}

export default Reviews;