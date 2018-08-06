import React from 'react';
import $ from 'jquery';
import IndividualReviews from './IndividualReviews.jsx';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const ReviewsWrapper = styled.div`
  float: left;
  margin-left: 12%;
  max-width: 85%;
  height: 50%;
  text-align: left;
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
    let idArr = location.pathname.split('/')[2];
    this.getReviewsForDeal(idArr);
  }

  getReviewsForDeal(dealId) {
    let that = this;
    $.ajax({
      url: `http://ec2-34-222-46-246.us-west-2.compute.amazonaws.com:3004/deal/${dealId}/reviews`,
      type: 'GET',
      success: (data) => {
        console.log('DATA RETURNED', data);
        if(data.length !== 0) {
          that.calculateDealAverageScore(data);
          that.setState({dealReviews: data});   
        }
      },
      error: (err) => {console.log('ERROR', err)}
    });
  }

  calculateDealAverageScore (data) {
    var numberOfReviews = 0
    var cumulativeScore = 0
    data.forEach(review => {
      cumulativeScore += review.review_score;
      numberOfReviews ++;
    });
    var averageScore = cumulativeScore / numberOfReviews;
    this.setState({
      dealAverageScore: averageScore,
      numberOfReviews: numberOfReviews,
    });
  }

  increaseRelevantScore(reviewId, currentScore) {
    $.ajax({
      url: `http://ec2-34-222-46-246.us-west-2.compute.amazonaws.com/reviews:3004/${reviewId}/helpful/${currentScore}`,
      type: 'PUT',
      success: (data) => {
        console.log('ADD TO Relevant SCORE', data)
      }
    });
  }

  render() {
    return (
      <ReviewsWrapper>

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