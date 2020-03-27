console.log("Connectd to wing filter");

function filterByWingName() {
    //get the id of the selected homeworld from the filter dropdown
    var wing_id = document.getElementById('wing_filter').value
    //construct the URL and redirect to it
    window.location = '/exhibits/filter/' + parseInt(wing_id)
}


function deleteStaffing(id){
	console.log("DETELETE ID: " + id);
    $.ajax({
        url: '/exhibits/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};



function updateExhibit(id){
    $.ajax({
        url: '/exhibits/' + id,
        type: 'PUT',
        data: $('#update-exhibit').serialize(),
        success: function(result){
            window.location.replace(".");
        }
    })
};


function selectExhibit(id){
    $("#wing-selector").val(id);
}