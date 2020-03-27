function deleteArtifact(id){
    $.ajax({
        url: '/artifacts/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

