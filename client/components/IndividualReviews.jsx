import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import $ from 'jquery';

const ReviewTitle = styled.div`
  font-weight: 600;
  color: black;
  margin-top: 10px;
`;
ReviewTitle.displayName = 'ReviewTitle';

const Circle = styled.div`
  width:45px;
  height:45px;
  color:#b8b5bb;
  line-height:45px;
  text-align:center;
  display:block;
  float:left;
  margin-right:16px;
  background-color: #E6E7E8;
  border-radius: 50%;
`;
Circle.displayName = 'Circle';

const Username = styled.span`
  width:256px;
  height:40px;
  font-size:14px;
  text-align:left;
  color:black;
  font-weight:600;
`;
Username.displayName = 'Username';

const ReviewCount = styled.span`
  width:256px;
  height:40px;
  font-size:14px;
  text-align:left;
  color:#75787b;
  font-weight:600;
  margin-left: 8px;
`;
ReviewCount.displayName = 'ReviewCount';

const ReviewDate = styled.span`
  font-size:14px;
  color:#75787b;
  margin-left: 8px;
`;
ReviewDate.displayName = 'ReviewDate';

const ReviewText = styled.div`
  position:relative;
  color: #55585b;
  font-weight: 300;
  padding-top: 7px;
  padding-bottom: 7px;
`;
ReviewText.displayName = 'ReviewText';

const HelpfulButton = styled.span`
  border-radius:5px;
  border:1px solid #b8b5bb;
  padding:2px 8px;
  cursor:pointer;
  color:#75787b;
  font-size:12px;
  &:hover {
    background: #E6E7E8;
  }
`;
HelpfulButton.displayName = 'HelpfulButton';

const ReviewWrapper = styled.div`
  margin: 20px;

`;
ReviewWrapper.displayName = 'ReviewWrapper'

const AllReviews = styled.span`
  cursor:pointer;
  color:#689F36;
  font-weight: 200;
`;
AllReviews.displayName = 'AllReviews';

const TopReviewer = styled.span`
  background-color: #6057D0;
  color: white;
  border-radius: 5px;
  font-size: 11px;
  margin-left: 8px;
  padding: 2px 6px;
`;
TopReviewer.displayName = 'TopReviewer';

class IndividualReviews extends React.Component {
  constructor(props) {
    super(props)
    
    this.sortReviewsByDate = this.sortReviewsByDate.bind(this);
    this.formatDateToBeSorted = this.formatDateToBeSorted.bind(this);
    this.formatUsername = this.formatUsername.bind(this);
    this.formatInitials = this.formatInitials.bind(this);
    this.handleHelpfulClick = this.handleHelpfulClick.bind(this);
    this.formatReviewDate = this.formatReviewDate.bind(this);
    this.increaseHelpfulScore = this.increaseHelpfulScore.bind(this);
    this.strechGoal = this.strechGoal.bind(this);
    this.state = {
      reviews: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      visableReviews: [{deals_id : 0, helpful_score : 0, id : 0, name : "Sandford Fleming", relevancy_score : 0, review_date : "1970-01-01T00:00:00.000Z", review_score : 0, review_text : "Back in my day we didn't have computer time, so I invented it... Also, this post has no reviews", reviews_count : 0, top_reviewer : 0, username : "Sandford Fleming"}],
      allReviewsArr: [{deals_id : 0, helpful_score : 0, id : 0, name : "Sandford Fleming", relevancy_score : 0, review_date : "1970-01-01T00:00:00.000Z", review_score : 0, review_text : "Back in my day we didn't have computer time, so I invented it... Also, this post has no reviews", reviews_count : 0, top_reviewer : 0, username : "Sandford Fleming"}],
      showAllReviews: false,
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reviews !== this.props.reviews){
      this.sortReviewsByDate(nextProps.reviews);
      var visableReviews = [];
      var allReviewsArr = [];
      if(nextProps.reviews.length !== 0) {
        nextProps.reviews.forEach((review, index) => {
          if(index < 3) {
            visableReviews.push(review);
          }
          allReviewsArr.push(review);
        });
        this.setState({
          reviews: nextProps.reviews,
          visableReviews: visableReviews,
          allReviewsArr: allReviewsArr,
        });
      }
    }
  }

  formatDateToBeSorted(date) {
    //string
    var arr = [];
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    var hour = date.slice(11, 13);
    var minute = date.slice(14, 16);
    var second = date.slice(17, 19);
    arr.push(year, month, day, hour, minute, second,);
    var returnDate = Number(arr.join(''));
    return returnDate;
  }

  sortReviewsByDate(reviewsArr) {
    var that = this;
    var beforeSort = reviewsArr;
    var afterSort = reviewsArr.sort(function (a, b) {
      let formattedA = that.formatDateToBeSorted(a.review_date);
      a.sortBy = formattedA
      let formattedB = that.formatDateToBeSorted(b.review_date);
      b.sortBy = formattedB
      return b.sortBy - a.sortBy
    });
    afterSort.forEach(item => {
      delete item.sortBy;
    });
  }

  formatUsername(user) {
    let index = user.indexOf(' ');
    user = user.slice(0, index + 2)
    user = user.concat('.');
    return user;
  }

  formatInitials(user) {
    let index = user.indexOf(' ');
    let initials = '';
    initials = initials.concat(user[0], user[index + 1]);
    return initials;
  }

  formatReviewDate(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = Number(date.slice(0, 4));
    var month = Number(date.slice(5, 7));
    month = months[month - 1];
    var day = Number(date.slice(8, 10));
    var date = `${month} ${day}, ${year}`;
    return date;
  }

  handleHelpfulClick(review){
    var that = this;
    var id = review.id;
    $.ajax({
      url: `http://ec2-34-222-46-246.us-west-2.compute.amazonaws.com:3004/reviews/${id}/helpful`,
      type: 'GET', 
      success: (data) => {
        let newScore = data[0].helpful_score;
        newScore ++;
        that.increaseHelpfulScore(id, newScore);
        let reviewsState = this.state.reviews;
        reviewsState.forEach(review => {
          if (review.id === id) {
            review.helpful_score = newScore;
          }
        })
        this.setState({reviews: reviewsState});
      }
    });
  }

  increaseHelpfulScore(reviewId, currentScore) {
    $.ajax({
      url: `http://ec2-34-222-46-246.us-west-2.compute.amazonaws.com:3004/reviews/${reviewId}/helpful/${currentScore}`,
      type: 'PUT',
      success: (data) => {
      }
    });
  }

  strechGoal(showReviews) {
    this.setState({showAllReviews: ! showReviews})
  }

  topReviewer (review) {
    if(review.top_reviewer === 1) {
      return (
        <TopReviewer>TOP REVIEWER</TopReviewer>
      )
    } 
  };

  helpfulReview (review) {
    if(review.helpful_score > 4) {
      return (
        <TopReviewer>HELPFUL REVIEW</TopReviewer>
      )
    }
  }

  buttonDisplay () {
    if (this.state.showAllReviews && this.state.allReviewsArr.length > this.state.visableReviews.length) {
      return 'See fewer reviews';
    }
    return 'See all reviews';
  }

  render () {
    let reviewsToMap; 
    if(this.state.showAllReviews) {
      reviewsToMap = this.state.allReviewsArr;
    } else {
      reviewsToMap = this.state.visableReviews;
    }

    return (
      <div>
        <ReviewTitle>Relevant Reviews</ReviewTitle>

        {reviewsToMap.map(review =>
          <ReviewWrapper className='Review' key={review.id}>
            <div className='Header'>
              <Circle>{this.formatInitials(review.username)}</Circle>
              <div>
                <Username>{this.formatUsername(review.username)}</Username> 
                <ReviewCount>{review.reviews_count} reviews</ReviewCount>
                {this.topReviewer(review)}
                {this.helpfulReview(review)}
              </div>
              <div>
                <StarRatings
                rating={review.review_score}
                starRatedColor='#F7C24A'
                numberOfStars={5}
                starDimension='14px'
                starSpacing='0px'
                starEmptyColor='#A5A8AB'
                isSelectable={false}
                />
                <ReviewDate> {this.formatReviewDate(review.review_date)} </ReviewDate> 
              </div>
            </div>
            <div className='Body'>
              <ReviewText>{review.review_text}</ReviewText>
            </div>
              <HelpfulButton onClick={() => this.handleHelpfulClick(review)}>👍 Helpful</HelpfulButton>
          </ReviewWrapper>
        )}

        <AllReviews onClick={() => this.strechGoal(this.state.showAllReviews)}>{this.buttonDisplay()}</AllReviews>
      </div>
    )
  }
  
}


export default IndividualReviews;


