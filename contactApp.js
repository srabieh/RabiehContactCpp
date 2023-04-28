// JavaScript for Contact Application Demo Program
// Jim Skon, Kenyon College, 2022
var contactList = [];
const baseUrl = 'http://34.229.136.9:5004';

/* Set up events */
$(document).ready(function() {
	// Add a click event for the filter button
	document.querySelector("#filter-btn").addEventListener("click", (e) => {
		var searchStr = 	document.querySelector("#search").value;
    	findMatches(searchStr);
	});

    $(".dropdown-menu li a").click(function() {
        var selection = $(this).text();
        $(this).parents(".btn-group").find('.btn').html(selection + ' <span class="caret"></span>');
    });

	findMatches(" ");

});

/* Search and display contact functions */

// Build output table from comma delimited list
function formatMatches(json) {

//used to be ...table-striped""
    var result = '<table class="table table-success table-striped"><tr><th>First</th><th>Last</th><th>Phone</th><th>Email</th><th>SSN</th><th>Meal Plan?</th><th>Yakarma</th><th>Type</th><th>Action</th><tr>';
    json.forEach(function(entry, i) {
        result += "<tr><td class='First'>" + entry['First'] + "</td><td class='Last'>" + entry['Last'];
        result += "</td><td class='Phone'>" + entry['Phone'] + "</td><td class='email'>" + entry['Email'] + "</td><td class='SSN'>" + entry['SSN']
        +"</td><td class='meal'>" + entry['Meal_Plan'] + "</td><td class='yakarma'>" + entry['Yakarma'] + "</td><td class='Type'>" + entry['Type'] + "</td>";
        
        result += "<td><button type='button' class='btn btn-primary btn-sm edit' data-bs-toggle='modal' data-bs-target='#editContact' ";
        result += "onclick=\"editContact(" + i + ")\">Edit</button> ";
        result += "<button type='button' class='btn btn-primary btn-sm ' onclick=\"deleteContact("+ entry['ID'] +")\">Delete</button></td></tr>";
    	result += ""
    });
    result += "</table>";

    return result;
}

function displayMatches(results) {

    contactList = results["results"];
    console.log("Results:"+JSON.stringify(contactList));
    document.getElementById("searchresults").innerHTML = formatMatches(contactList);
    
}

function findMatches(search) {
	// only include / after find if search not empty
	search = search.trim();
    if (search != "") search = "/" + search;

	console.log("Search:" + search);
    fetch(baseUrl + '/contact/find' + search, {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => displayMatches(json))
        .catch(error => {
            {
                alert("Find Error: Something went wrong:" + error);
            }
        })
}

/* Add contact functions */
function processAdd(results) {
    console.log("Add:", results["status"]);
    document.getElementById("addfirst").value = "";
    document.getElementById("addlast").value = "";
    document.getElementById("addphone").value = "";
    document.getElementById("addemail").value = "";
    document.getElementById("addSSN").value = "";
    document.getElementById("addmeal").value = "";
    document.getElementById("addyakarma").value = "";

    findMatches(" ");

}

function addContact() {
    console.log("Attempting to add an entry");
    console.log("First:" + $('#addfirst').val());
    console.log("Last:"+$('#addlast').val());
    console.log("Phone:"+$('#addphone').val());
    console.log("Type:"+$('#addtype').text());
    console.log("Email:"+$('#addemail').val());
    console.log("SSN:"+$('#addSSN').val());
    console.log("MealPlan:"+$('#addmeal').val());
    console.log("Yakarma:"+$('#addyakarma').val());
    $('#searchresults').empty();
    fetch(baseUrl + '/contact/add/' + $('#addfirst').val() + "/" + $('#addlast').val() + "/" + $('#addphone').val() + "/" + $('#addtype').text() + "/" + $('#addemail').val() + "/" + $('#addSSN').val() + "/" + $('#addmeal').val() + "/" + $('#addyakarma').val(), {
            method: 'get'
        })
        .then(response => response.json())
        .then(json => processAdd(json))
        .catch(error => {
            {
                alert("Add Error: Something went wrong:" + error);
            }
        })
}


function editContact(row) {
    console.log("start edit data: "+row+JSON.stringify(contactList[row]));

    console.log("First name of record: " + contactList[row]["First"] + " " + contactList[row]["Last"]);
    editid = contactList[row]["ID"];
    
    console.log("ID is " + contactList[row]["ID"] + ", first is "+contactList[row]["First"]+", editemail is "+contactList[row]["Email"]);
    console.log("")
    

	document.getElementById("editfirst").value = contactList[row]["First"];
	document.getElementById("editlast").value = contactList[row]["Last"];
	document.getElementById("editphone").value = contactList[row]["Phone"];
	document.getElementById("edittype").innerText = contactList[row]["Type"];
	document.getElementById("editemail").value = contactList[row]["Email"];
	document.getElementById("editmeal").value = contactList[row]["Meal_Plan"];
    if (contactList[row]["SSN"]!=null) {
    	document.getElementById("editSSN").value = contactList[row]["SSN"];
    }
	document.getElementById("edityakarma").value = contactList[row]["Yakarma"];
	
	//Save ID in modal
	var modal = document.querySelector("#editContact");
	modal.setAttribute("editid",editid);

}


function updateContact() {

	// Get ID in the modal
	var modal = document.querySelector("#editContact");
	id = modal.getAttribute("editid");
	
    console.log("Attempting to edit an entry:"+id); 

    fetch(baseUrl + '/contact/update/' + id + '/' + document.getElementById("editfirst").value 
    		+ '/' + document.getElementById("editlast").value + '/' + document.getElementById("editphone").value 
    		+ '/' + document.getElementById("edittype").innerText + '/' + document.getElementById("editemail").value
    		+ '/' + document.getElementById("editSSN").value + '/' + document.getElementById("editmeal").value
    		+ '/' + document.getElementById("edityakarma").value, {
                method: 'get'
            })
        .then(alert("Record for " + document.getElementById("editfirst").value + ' ' + document.getElementById("editlast").value + " updated"))
        .catch(error => {
            {
                alert("Edit Error: something went wrong:" + error);
            }
        });
        
    findMatches(" ");

}


function deleteContact(id) {

    console.log("Attempting to delete an entry:" + id);
    fetch(baseUrl + '/contact/delete/' + id, {
            method: 'get'
        })
        .then(alert("Deleted Record: " + id))
        .catch(error => {
            {
                alert("Delete Error: Something went wrong:" + error);
            }
        });
     findMatches(" ");

}


