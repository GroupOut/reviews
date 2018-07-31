import React from 'react';
import $ from 'jquery';
import IndividualReviews from './IndividualReviews.jsx';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const ReviewsWrapper = styled.div`
  float: left;
  /*width: 620px;*/
  max-width: 55%;
  height: 50%;
  border-style: solid;
  border-width: 2px;
  text-align: left;
  padding: 10px;
  color: #75787b;
  font-family: OpenSans, "Helvetica Neue", Helvetica, Tahoma, Arial, FreeSans, sans-serif;            
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
`;
ReviewsWrapper.displayName = 'ReviewsWrapper';

const GreenCircle = styled.div`
  width:35px;
  height:35px;
  color: white;
  line-height:35px;
  text-align:center;
  display:block;
  float:left;
  margin-right:22px;
  background-color: #689F36;
  border-radius: 50%;
  font-size: 22px;
  margin-left: 10px;
`;
GreenCircle.displayName = 'GreenCircle';

const BannerWrapper = styled.div`
  background-color: #F6F7F8;
  padding-top:15px;
  padding-bottom: 15px;
  font-size: 12px;
`;
BannerWrapper.displayName = 'BannerWrapper';

const ReviewsHeaderTitle = styled.h3`
  border-bottom: 0.5px solid #75787b;
  color:#333;
  font-size:1.4rem;
  font-weight:700;
  line-height:1.2;
  padding-bottom: 20px;
`;
ReviewsHeaderTitle.displayName = 'ReviewsHeaderTitle';

const NumberOfReviews = styled.span`
  font-weight:300;
  line-height:18px;
  padding-left:10px; 
`;
NumberOfReviews.displayName = 'NumberOfReviews';

class Reviews extends React.Component {
  constructor (props) {
    super(props)
    
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
    let idArr = location.pathname.split('/')[1];
    console.log('id', idArr);
    this.getReviewsForDeal(idArr);
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

  increaseRelevantScore(reviewId, currentScore) {
    $.ajax({
      url: `/reviews/${reviewId}/helpful/${currentScore}`,
      type: 'PUT',
      success: (data) => {
        console.log('ADD TO Relevant SCORE', data)
      }
    });
  }

  // handleChange(event) {
  //   this.setState({ dealNumber: event.target.value });
  // }

  // handleSubmit(e) {
  //   console.log(`Deal number ${this.state.dealNumber} submitted.`, 'Current states', this.state);
  //   this.getReviewsForDeal(this.state.dealNumber);
  //   e.preventDefault();
  //   e.target.reset();
  // }

// things I see about the groupon reviews section
//// some padding around the entire thing. Jens thinks 10 px
//// header at the top is almost stock minus the stars and number of reviews, which doesn't actually match the review count
// each review is its own element
//// each review has additional padding
//// each review has a header, body with text, and helpful button

// show three reviews 

  render() {
    return (
      <ReviewsWrapper>

{/*        <div className='change reviews'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Change deal:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className='submitButton' type="submit" value="Submit" />
          </form>
        </div>*/}

        <div className='header'>
          <ReviewsHeaderTitle>Customer Reviews</ReviewsHeaderTitle>
          <h3>
            <StarRatings
            rating={Number(this.state.dealAverageScore)}
            starRatedColor='#F7C24A'
            numberOfStars={5}
            starDimension='17px'
            starSpacing='0px'
            starEmptyColor='#A5A8AB'
            isSelectable={false}
            />
            <NumberOfReviews>{this.state.numberOfReviews} Ratings</NumberOfReviews>
          </h3>
          <BannerWrapper>
            <GreenCircle>✔</GreenCircle>
            <div>
              <span>100% Verified Reviews</span> 
            </div>
            <div>
              <span>All reviews are from people who have redeemed deals with this merchant.</span>
            </div>
          </BannerWrapper >
        </div>

        <div className='Review bodies'>
          <IndividualReviews reviews={this.state.dealReviews} />
        </div>

      </ReviewsWrapper>
    );
  }

}

export default Reviews;