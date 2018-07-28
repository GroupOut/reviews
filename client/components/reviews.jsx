import React from 'react';
import $ from 'jquery';
import IndividualReviews from './IndividualReviews.jsx';

class Reviews extends React.Component {
  constructor (props) {
    super(props)
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateDealAverageScore = this.calculateDealAverageScore.bind(this);
    this.state = {
      dealNumber: '',
      dealAverageScore: '',
      numberOfReviews: '',
      dealReviews: [{},{}],
    }
  }

  componentWillMount() {
    // make initial get request here to retrieve reviews for specific deal
    this.getReviewsForDeal(12);
  }

  getReviewsForDeal(dealId) {
    let that = this;
    $.ajax({
      url: `/deal/${dealId}/reviews`,
      type: 'GET',
      success: (data) => {
        console.log('REVIEWS DATA', data)
        that.calculateDealAverageScore(data);
        that.setState({dealReviews: data});
      }
    });
  }

  calculateDealAverageScore (data) {
    let that = this;
    var numberOfReviews = 0
    var cumulativeScore = 0
    data.forEach(review => {
      cumulativeScore += review.review_score;
      numberOfReviews ++;
    });
    var averageScore = cumulativeScore / numberOfReviews;
    that.setState({
      dealAverageScore: averageScore,
      numberOfReviews: numberOfReviews,
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

  handleChange(event) {
    this.setState({ dealNumber: event.target.value });
  }

  handleSubmit(e) {
    console.log(`Deal number ${this.state.dealNumber} submitted.`, 'Current states', this.state);
    this.getReviewsForDeal(this.state.dealNumber);
    e.preventDefault();
    e.target.reset();
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

        <div className='change reviews'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Change deal:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className='submitButton' type="submit" value="Submit" />
          </form>
        </div>

        <div className='header'>
          <h2>Customer Reviews</h2>
          <h4>{this.state.dealAverageScore} AVG SCORE   {this.state.numberOfReviews} Ratings</h4>
          <p>100% Verified Reviews</p> 
          <p>All reviews are from people who have redeemed deals with this merchant.</p>
        </div>

        <div className='Review bodies'>
          <IndividualReviews reviews={this.state.dealReviews} />
        </div>

      </div>
    );
  }

}

export default Reviews;