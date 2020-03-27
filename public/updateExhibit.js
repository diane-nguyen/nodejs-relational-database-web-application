function updateExhibit(id){
    $.ajax({
        url: '/exhibit/' + id,
        type: 'PUT',
        data: $('#update-exhibit').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
