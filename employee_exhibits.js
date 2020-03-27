module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getEmployees(res, mysql, context, complete){
        var query = 'SELECT Employees.EmployeeID, CONCAT(Employees.Fname, " ", Employees.Lname) As fullName FROM Employees;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allstaff  = results;
            complete();
        });
    }

    //Function used to get single schedule, used to update schedules
	function getSchedule(res, mysql, context, id, complete){
        var sql = 'SELECT Employee_Exhibits.ID as id, Employees.EmployeeID, Employees.Fname, Employees.Lname, Employees.Position, Exhibits.WingName, Employee_Exhibits.NumberOfShifts, Employee_Exhibits.Tours ' +
                  'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                  'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID WHERE Employee_Exhibits.id = ?';
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			context.staff = results[0];
			complete();
		});
	}
    
    //SELECT Employee_Exhibits.ID as id, Employees.EmployeeID, Employees.Fname, Employees.Lname, Employees.Position, Exhibits.WingName, Employee_Exhibits.NumberOfShifts, Employee_Exhibits.Tours FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID
    //SELECT Employee_Exhibits.ID as id, Employees.EmployeeID, Employees.Fname, Employees.Lname, Employees.Position, Exhibits.WingName, Employee_Exhibits.NumberOfShifts, Employee_Exhibits.Tours FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID WHERE Employee_Exhibits.id = ?
    //***function to get relevant data for the update page
    function getEmployeeAssignment(res, mysql, context, id, complete){
        // var query = 'SELECT Exhibits.WingName, Exhibits.ExhibitName, Artifacts.Name, Artifacts.ArtifactID, Artifacts.ArtistOrOrigin, Artifacts.Year, Artifacts.Price FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID;' ;
        var query = 'SELECT Employee_Exhibits.ID as id, Employees.EmployeeID, Employees.Fname, Employees.Lname, Employees.Position, Exhibits.WingName, Employee_Exhibits.NumberOfShifts, Employee_Exhibits.Tours ' +
                    'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                    'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID;';
        var inserts = [id];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staff = results[0];
            // complete();
        });

        //Get the list for the wings
        var query = 'SELECT Exhibits.WingID,  Exhibits.WingName FROM Exhibits;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wingList  = results; 
            complete();           
        });
        
    }

    function getExhibitWing(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, CONCAT(Exhibits.ExhibitName, " / ", Exhibits.WingName) As ExhibitWing FROM Exhibits;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.allExhibitWings  = results;
            complete();
        });
    }

    function getWingFilterList(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID,  Exhibits.WingName FROM Exhibits;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wingList  = results;
            complete();
        });
    }

    //SELECT Artifacts.Name, Artifacts.ArtifactID, Exhibits.WingName FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID
    function getArtifactUpdateLists(res, mysql, context, complete){
        var query = 'SELECT Artifacts.Name, Artifacts.ArtifactID, Exhibits.WingName, Exhibits.WingID FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.updateArtifactList  = results;
            complete();
        });
    }

    function getStaffingLists(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Exhibits.ExhibitName, Exhibits.WingName FROM Exhibits; ';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.addstaffing  = results;
            complete();
        });
    }

    //**
    function getStaffing(res, mysql, context, complete){
        var query = 'SELECT Employee_Exhibits.ID, Employees.EmployeeID, Employees.Fname, Employees.Lname, Employees.Position, Exhibits.WingName, Exhibits.ExhibitName, Employee_Exhibits.NumberOfShifts, Employee_Exhibits.Tours ' +
                    'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                    'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staffing  = results;
            complete();
        });
    }

    function GetStaffingByWingName(req, res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Employees.EmployeeID, Employees.Position, Exhibits.ExhibitName, Exhibits.WingName ' +  
                    'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                    'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID' +
                    ' WHERE Exhibits.WingID = ?;';
        var inserts = [req.params.wing];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staffing  = results;
            complete();
        });
    }

    router.get('/', function(req, res){

            var callbackCount = 0;
            var context = {};
            context.jsscripts = ["deleteEmployee.js","filterpeople.js","filterwing.js"];
            // context.jsscripts = ["filterwing.js"];
            var mysql = req.app.get('mysql');
            getStaffing(res, mysql, context, complete);
            getStaffingLists(res, mysql, context, complete);
            getEmployees(res, mysql, context, complete);
            getExhibitWing(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 4){
                    // console.log("Session: %j", context );
                    res.render('employee_exhibits', context);
                }

            }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Employee_Exhibits` (FK_EmployeeID, FK_WingID, NumberOfShifts, Tours) VALUES (?,?,?,?)";
        var inserts = [req.body.FK_EmployeeID, req.body.FK_WingID, req.body.NumberOfShifts, req.body.Tours];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/employee_exhibits');
            }
        });
    });

    /* Display one person for the specific purpose of updating people */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterwing.js"];
        var mysql = req.app.get('mysql');
        //getEmployeeAssignment(res, mysql, context, req.params.id, complete);
        getSchedule(res, mysql, context, req.params.id, complete);
        getExhibitWing(res, mysql, context, complete);
        //getArtifactUpdateLists(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-employee-exhibit', context);
            }

        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Employee_Exhibits SET Employee_Exhibits.Tours=?, Employee_Exhibits.NumberOfShifts=?, Employee_Exhibits.FK_WingID=? WHERE Employee_Exhibits.ID=?";
        var inserts = [req.body.Tours, req.body.NumberOfShifts, req.body.FK_WingID, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });


    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Employee_Exhibits WHERE ID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    
    return router;
}();
