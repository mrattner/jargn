/**
 *	Retrieves which box(es) are checked in a form.
 */
function boxCheck (document){
	// Variable to record the checked box
	var str="";
	
	// Searchs checked boxes
	for( i=0; i<2; i++ )
	{
		// Checks if it's checked
		if( document.chbox.elements[i].checked )
		{
			if( str != "" ) str=str+",";
			
			// Records the number of checked box
			str=str+document.chbox.elements[i].value;
		}
	}
}