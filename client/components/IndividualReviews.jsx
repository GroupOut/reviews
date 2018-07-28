import React from 'react';

class IndividualReviews extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      reviews: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      reviewOne: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      reviewTwo: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
      reviewThree: {deals_id : 12, helpful_score : 0, id : 7, name : "Full-Day Waterfall Rappelling for One, Two, or Four at North Ridge Mountain Guides", relevancy_score : 0, review_date : "2017-07-09T22:36:49.000Z", review_score : 4, review_text : "Something to start", reviews_count : 17, top_reviewer : 1, username : "Lanie Igonet"},
    }
  }

  componentDidMount() {
    console.log('COMPONENT STATE', this.state)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reviews !== this.props.reviews){
        this.setState({
          reviews: nextProps.reviews,
          reviewOne: nextProps.reviews[0],
          reviewTwo: nextProps.reviews[1],
          reviewThree: nextProps.reviews[2],
        });
    }
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

        <div className='firstReview'>
          <div className='firstHeader'>
            <p> </p>
            <p>{this.formatUsername(this.state.reviewOne.username)} {this.state.reviewOne.reviews_count} reviews</p>
            <p>{this.state.reviewOne.review_score} SCORE DATE {this.state.reviewOne.review_date} </p>
          </div>
          <div className='firstBody'>
            <p>{this.state.reviewOne.review_text}</p>
            <p> helpfulButton</p>
          </div>
        </div>

        <div className='secondReview'>
          <div className='secondHeader'>
            <p> </p>
            <p>{this.formatUsername(this.state.reviewTwo.username)} {this.state.reviewTwo.reviews_count} reviews</p>
            <p>{this.state.reviewTwo.review_score} SCORE DATE {this.state.reviewTwo.review_date} </p>
          </div>
          <div className='secondBody'>
            <p>{this.state.reviewTwo.review_text}</p>
            <p> helpfulButton</p>
          </div>
        </div>

        <div className='thirdReview'>
          <div className='thirdHeader'>
            <p> </p>
            <p>{this.formatUsername(this.state.reviewThree.username)} {this.state.reviewThree.reviews_count} reviews</p>
            <p>{this.state.reviewThree.review_score} SCORE DATE {this.state.reviewThree.review_date} </p>
          </div>
          <div className='thirdBody'>
            <p>{this.state.reviewThree.review_text}</p>
            <p> helpfulButton</p>
          </div>
        </div>
        
      </div>

    )
  }
  
}


export default IndividualReviews;