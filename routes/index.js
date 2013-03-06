/**
 * Home module: Show login page if user is not logged in. Show the home page once user has logged in.
 */
 
//Render the index page
exports.index = function(req, res){
  res.render('index', { title: 'Jargn' });
};
