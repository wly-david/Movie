function checkObj(val)
{
if (val != 'Movies'){
	document.getElementById('InfoM').style.display='none';
}
else{
	document.getElementById('InfoM').style.display='';
}
if (val != 'Characters'){
	document.getElementById('InfoC').style.display='none';
}
else{
	document.getElementById('InfoC').style.display='';
}
if (val != 'Actors'){
	document.getElementById('InfoA').style.display='none';
}
else{
	document.getElementById('InfoA').style.display='';
}
if (val != 'Directors'){
	document.getElementById('InfoD').style.display='none';
}
else{
	document.getElementById('InfoD').style.display='';
}
if (val != 'Studios'){
	document.getElementById('InfoS').style.display='none';
}
else{
	document.getElementById('InfoS').style.display='';
}
if (val != 'Awards'){
	document.getElementById('InfoAw').style.display='none';
}
else{
	document.getElementById('InfoAw').style.display='';
}
checkObj2("")
}

function checkObj2(val)
{
if (val != 'Movies'){
	document.getElementById('OtherM').style.display='none';
}
else{
	document.getElementById('OtherM').style.display='';
}
if (val != 'Characters'){
	document.getElementById('OtherC').style.display='none';
}
else{
	document.getElementById('OtherC').style.display='';
}
if (val != 'Actors'){
	document.getElementById('OtherA').style.display='none';
}
else{
	document.getElementById('OtherA').style.display='';
}
if (val != 'Directors'){
	document.getElementById('OtherD').style.display='none';
}
else{
	document.getElementById('OtherD').style.display='';
}
if (val != 'Directors1'){
	document.getElementById('OtherD1').style.display='none';
}
else{
	document.getElementById('OtherD1').style.display='';
}
if (val != 'Studios'){
	document.getElementById('OtherS').style.display='none';
}
else{
	document.getElementById('OtherS').style.display='';
}
if (val != 'Awards'){
	document.getElementById('OtherAw').style.display='none';
}
else{
	document.getElementById('OtherAw').style.display='';
}
}

function sendReq() {
	output = "Find " + document.getElementById('Obj').value;
	
	if (document.getElementById('Obj').value == 'Movies') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/movies');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoM').value;
		if ((document.getElementById('InfoM').value == 'mname') || (document.getElementById('InfoM').value == 'genres') || (document.getElementById('InfoM').value == 'running_time') || (document.getElementById('InfoM').value == 'box_office_earnings') || (document.getElementById('InfoM').value == 'date')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoM').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		}
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoM').value == 'Directors')) {
				output = output + "Attribute: " + document.getElementById('OtherD').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "directors");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "dname");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherD').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoM').value == 'Actors')) {
				output = output + "Attribute: " + document.getElementById('OtherA').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "actors");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "aid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherA').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoM').value == 'Studios')) {
				output = output + "Attribute: " + document.getElementById('OtherS').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "produce");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "studios");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "sname");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherS').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			if ((document.getElementById('InfoM').value == 'Characters')) {
				output = output + "Attribute: " + document.getElementById('OtherC').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "cid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherC').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			if ((document.getElementById('InfoM').value == 'Awards')) {
				output = output + "Attribute: " + document.getElementById('OtherAw').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasmovie");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awards");
				}
				else {
					hiddenField.setAttribute("value", "winasmovie");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awname");
				}
				else {
					hiddenField.setAttribute("value", "mid");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherAw').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	if (document.getElementById('Obj').value == 'Characters') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/characters');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoC').value;
		if ((document.getElementById('InfoC').value == 'name') || (document.getElementById('InfoC').value == 'gender') || (document.getElementById('InfoC').value == 'role_importance')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoC').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		}
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoC').value == 'Movies')) {
				output = output + "Attribute: " + document.getElementById('OtherM').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherM').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoC').value == 'Actors')) {
				output = output + "Attribute: " + document.getElementById('OtherA').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "actors");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "aid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherA').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoC').value == 'Awards')) {
				output = output + "Attribute: " + document.getElementById('OtherAw').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasactor");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awards");
				}
				else {
					hiddenField.setAttribute("value", "winasactor");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awname");
				}
				else {
					hiddenField.setAttribute("value", "cid");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherAw').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	if (document.getElementById('Obj').value == 'Actors') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/actors');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoA').value;
		if ((document.getElementById('InfoA').value == 'aname') || (document.getElementById('InfoA').value == 'gender') || (document.getElementById('InfoA').value == 'birthplace')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoA').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		}
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoA').value == 'Movies')) {
				output = output + "Attribute: " + document.getElementById('OtherM').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherM').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			if ((document.getElementById('InfoA').value == 'Directors1')) {
				output = output + "Attribute: " + document.getElementById('OtherD1').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherD1').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoA').value == 'Characters')) {
				output = output + "Attribute: " + document.getElementById('OtherC').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "characters");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "cid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherC').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoA').value == 'Awards')) {
				output = output + "Attribute: " + document.getElementById('OtherAw').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasactor");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awards");
				}
				else {
					hiddenField.setAttribute("value", "winasactor");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awname");
				}
				else {
					hiddenField.setAttribute("value", "aid");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherAw').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	if (document.getElementById('Obj').value == 'Directors') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/directors');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoD').value;
		if ((document.getElementById('InfoD').value == 'dname') || (document.getElementById('InfoD').value == 'gender') || (document.getElementById('InfoD').value == 'birthplace')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoD').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		}
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoD').value == 'Movies')) {
				output = output + "Attribute: " + document.getElementById('OtherM').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherM').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoD').value == 'Awards')) {
				output = output + "Attribute: " + document.getElementById('OtherAw').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasdirector");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awards");
				}
				else {
					hiddenField.setAttribute("value", "winasdirector");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				if ((document.getElementById('OtherAw').value == "organization") || (document.getElementById('OtherAw').value == "country" )){
					hiddenField.setAttribute("value", "awname");
				}
				else {
					hiddenField.setAttribute("value", "dname");
				}
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherAw').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	if (document.getElementById('Obj').value == 'Studios') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/studios');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoS').value;
		if ((document.getElementById('InfoS').value == 'sname') || (document.getElementById('InfoS').value == 'country') || (document.getElementById('InfoS').value == 'founder') || (document.getElementById('InfoS').value == 'location') || (document.getElementById('InfoS').value == 'founded_date')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoS').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		} 
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoS').value == 'Movies')) {
				output = output + "Attribute: " + document.getElementById('OtherM').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "produce");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherM').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoS').value == 'Directors1')) {
				output = output + "Attribute: " + document.getElementById('OtherD1').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "produce");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherD1').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	
	if (document.getElementById('Obj').value == 'Awards') {
		var form = document.createElement("form");
		form.setAttribute("id", "sendreq");
		form.setAttribute("method", 'post');
		form.setAttribute("action", '/awards');
		if (document.getElementById('txt').value == '') {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", "conditionType");
			hiddenField.setAttribute("value", "none");
			form.appendChild(hiddenField);
			output = "All: ";
		} else {
		output = output + " Search by " + document.getElementById('InfoAw').value;
		if ((document.getElementById('InfoAw').value == 'awname') || (document.getElementById('InfoAw').value == 'country') || (document.getElementById('InfoAw').value == 'organization') || (document.getElementById('InfoAw').value == 'start_year')) {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "attribute");
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "attribute");
            hiddenField.setAttribute("value", document.getElementById('InfoAw').value);
            form.appendChild(hiddenField);
		
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "value");
            hiddenField.setAttribute("value", document.getElementById('txt').value);
            form.appendChild(hiddenField);
		} 
		else {
		    var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "conditionType");
            hiddenField.setAttribute("value", "relation");
            form.appendChild(hiddenField);
			
			if ((document.getElementById('InfoAw').value == 'Movies')) {
				output = output + "Attribute: " + document.getElementById('OtherM').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasmovie");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "movies");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "mid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherM').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoAw').value == 'Directors')) {
				output = output + "Attribute: " + document.getElementById('OtherD').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasdirector");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "directors");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "dname");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherD').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
			
			if ((document.getElementById('InfoAw').value == 'Actors')) {
				output = output + "Attribute: " + document.getElementById('OtherA').value;
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "relation_table");
				hiddenField.setAttribute("value", "winasactor");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_table");
				hiddenField.setAttribute("value", "actors");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "search_key");
				hiddenField.setAttribute("value", "aid");
				form.appendChild(hiddenField);
				
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "attribute");
				hiddenField.setAttribute("value", document.getElementById('OtherA').value);
				form.appendChild(hiddenField);
		
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", "value");
				hiddenField.setAttribute("value", document.getElementById('txt').value);
				form.appendChild(hiddenField);
			}
		}
		}
	}
	
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "record");
	hiddenField.setAttribute("value", output);
	form.appendChild(hiddenField);
	document.body.appendChild(form);
	document.getElementById("sendreq").submit();
}