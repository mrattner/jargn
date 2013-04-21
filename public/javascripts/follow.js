$(document).ready(function() {
    //Helper function to determine the appearance of the button
    function checkFollowing () {
        //If we are following this person
        if ($('button').hasClass('followed')) {
            //Fade out the button
            $('button').fadeTo(5, 0.25);
            //Set the text on the button
            $('button').html("Unfollow Me");
        }
        
        //If we are not following this person
        else {
            //Make the button have opacity 100%
            $('button').fadeTo(5, 1);
            //Set the text on the button
            $('button').html("Follow Me");
        }
    }
    
    //Hide the button if this is the user's own profile
    if ($('button').hasClass('ownProfile')) {
        $('button').hide();
    }
    
    //Otherwise, this is another user's profile
    else {
        //Determine the initial appearance of the button
        checkFollowing();
        
        //Add a click event handler to the button
        $('button').click(function () {
            //Toggle following
            $('button').toggleClass('followed');
            //Update the appearance of the button
            checkFollowing();
        });
    }
});
