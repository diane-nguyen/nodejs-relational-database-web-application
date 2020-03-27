function deleteStaffing(id){
    $.ajax({
        url: '/employee_exhibits/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
