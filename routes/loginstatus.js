app.dynamicHelpers({
  // check user's login state
  is_logined: function(req, res){
    return req.session.user ? true : false;
  }   
});