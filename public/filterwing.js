console.log("Connectd to wing filter");

function filterByWingName() {
    //get the id of the selected homeworld from the filter dropdown
    var wing_id = document.getElementById('wing_filter').value
    //construct the URL and redirect to it
    window.location = '/exhibits/filter/wing/' + wing_id
}

function filterByExhibitName() {
    //get the id of the selected homeworld from the filter dropdown
    var ExhibitName = document.getElementById('exhibit_filter').value
    //construct the URL and redirect to it
    window.location = '/exhibits/filter/exhibit/' + ExhibitName
}

// function filterByExhibitName() {
//     //get the id of the selected homeworld from the filter dropdown
//     var ExhibitName = document.getElementById('exhibit_filter').value
//     //construct the URL and redirect to it
//     window.location = '/home/filter/' + parseInt(ExhibitName)
// }


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


//hmm do we need this (do we need to update exhibit for full credit? )
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