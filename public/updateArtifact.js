function updateArtifact(id){
    $.ajax({
        url: '/artifacts/' + id,
        type: 'PUT',
        data: $('#update-artifact').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
