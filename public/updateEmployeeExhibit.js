function updateEmployeeExhibit(id){
    $.ajax({
        url: '/employee_exhibits/' + id,
        type: 'PUT',
        data: $('#update-employee-exhibits').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
