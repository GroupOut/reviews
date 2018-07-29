import React from 'react';

class IndividualReviews extends React.Component {
  constructor(props) {
    super(props)
    
    this.sortReviewsByDate = this.sortReviewsByDate.bind(this);
    this.formatDateToBeSorted = this.formatDateToBeSorted.bind(this);
    this.formatUsername = this.formatUsername.bind(this);
    this.state = {
      reviews: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      visableReviews: [{deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"}],
      // reviewOne: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      // reviewTwo: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      // reviewThree: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
    }
  }

  componentDidMount() {
    console.log('COMPONENT STATE', this.state)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reviews !== this.props.reviews){
        this.sortReviewsByDate(nextProps.reviews);
        var visableReviews = [];
        nextProps.reviews.forEach((review, index) => {
          if(index < 3) {
            visableReviews.push(review);
          }
        });
        this.setState({
          reviews: nextProps.reviews,
          visableReviews: visableReviews,
          // reviewOne: nextProps.reviews[0],
          // reviewTwo: nextProps.reviews[1],
          // reviewThree: nextProps.reviews[2],
        });
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
    console.log('BEFORE SORT', beforeSort);
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

  render () {
    return (
      <div>
        <h3>Relevant Reviews</h3>

        {this.state.visableReviews.map(review => 
          <div className='firstReview'>
            <div className='firstHeader'>
              <p>{this.formatUsername(review.username)} {review.reviews_count} reviews</p>
              <p>{review.review_score} SCORE DATE {review.review_date} </p>
            </div>
            <div className='firstBody'>
              <p>{review.review_text}</p>
              <p> helpfulButton</p>
            </div>
          </div>

        )}
      </div>
    )
  }
  
}


export default IndividualReviews;