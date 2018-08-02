const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

var checkWorking = function() {
  console.log('working from db')
};

connection.connect((err) => {
  if(err) {
    console.log('ERROR CONNECTING', err)
  } else {  
  console.log('MySQL connected')
  }
});

// works in database
var getReviews = (deal, callback) => {
  connection.query(`SELECT
    reviews.id, reviews.deals_id, deals.name, users.username, users.reviews_count, users.top_reviewer, reviews.review_score, reviews.review_text, reviews.review_date, reviews.relevancy_score, reviews.helpful_score
    FROM reviews INNER JOIN users ON (reviews.user_id = users.id) INNER JOIN deals ON (reviews.deals_id = deals.id)
    WHERE deals.id = ${deal};`, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  })
}


var updateHelpful = (review, newHelpfulScore, callback) => {
  connection.query(`UPDATE reviews SET helpful_score = ${newHelpfulScore} WHERE id = ${review};`, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  })
}


var updateRelevant = (review, newRelevantScore, callback) => {
  connection.query(`UPDATE reviews SET relevancy_score = ${newRelevantScore} WHERE id = ${review};`, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  })
}

var getHelpful = (review, callback) => {
  connection.query(`SELECT reviews.helpful_score FROM reviews WHERE id = ${review}`, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, data);
  })
}

module.exports = {
  // export queries
  getReviews,
  updateHelpful,
  updateRelevant,
  getHelpful
};