// 4. Your `apiRoutes.js` file should contain two routes:

// Load data
var friendList = require('../data/friend.js');

module.exports = function(app){

// Route 1: A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

// Route 2: A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

app.post('/api/friends', function(req,res){

    // Gets new friend's scores to compare with friends in friendList array
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    // Runs through all current friends in list
    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      // Run through scores to compare friends
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      // Push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    // After all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    // Return bestMatch data
    var bff = friendList[bestMatch];
    res.json(bff);

    // Pushes new submission into the friendsList array
    friendList.push(req.body);
  });
};