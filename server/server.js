const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;

var db = require('../db/index');

const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../public')));

// http://localhost:3004/deal/:deal_id/reviews
// Could also be http://localhost:3004/experience/:deal_id/reviews?sort=id_asc
// Get endpoint: returns review info for that deal
app.get('/deal/:deal_id/reviews', (req, res) => {
  db.getReviews(req.params.deal_id, (err, response) => {
    if (err) {
      res.status(304).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

// http://localhost:3004/reviews/:review_id/helpful/:updatedHelpfulScore
// Put endpoint: increases the helpful score by 1 for that specific review
app.get('/reviews/:review_id/helpful/:updatedHelpfulScore', (req, res) => {
  db.updateHelpful(req.params.review_id, req.params.updatedHelpfulScore, (err, response) => {
    if (err) {
      res.status(304).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

// http:/localhost:3004/reviews/:review_id/relevant/:updatedRelevantScore
// Put endpoint: increases the relevancy score by 1 point for that specific review
app.get('/reviews/:review_id/relevant/:updatedRelevantScore', (req, res) => {
  db.updateRelevant(req.params.review_id, req.params.updatedRelevantScore, (err, response) => {
    if (err) {
      res.status(304).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});