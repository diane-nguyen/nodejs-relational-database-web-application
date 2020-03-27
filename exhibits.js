module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* 
    Display unqiue wing name when filtering. Repeated wing names are not shown. 
    Used in Filter Column Information 
    */
    function getWingFilterList(res, mysql, context, complete){
        var query = 'SELECT DISTINCT Exhibits.WingName FROM Exhibits;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wingList  = results;
            complete();
        });
    }

    /* 
    Display unique exhibit names when filtering. 
    Used in Choose Exhibit drop down
    */
    function getExhibitFilterList(res, mysql, context, complete){
        var query = 'SELECT distinct Exhibits.ExhibitName FROM Exhibits;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ExhibitList  = results;
            complete();
        });
    }

    /* 
    
    */
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

    /* 
    
    */
    function getStaffing(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Employees.EmployeeID, Employees.Position, Exhibits.ExhibitName, Exhibits.WingName ' +  
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

    function GetStaffingByExhibit(req, res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Employees.EmployeeID, Employees.Position, Exhibits.ExhibitName, Exhibits.WingName ' +  
                    'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                    'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID' +
                    ' WHERE Exhibits.ExhibitName = ?;';
        var inserts = [req.params.exhibit];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.staffing  = results;
            complete();
        });
    }

    //get the list of artifacts to display under 'Exhibit Artifacts'
    function getArtifacts(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Exhibits.WingName, Exhibits.ExhibitName, Artifacts.Name, Artifacts.ArtifactID, Artifacts.ArtistOrOrigin, Artifacts.Year, Artifacts.Price FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID;' ;
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifacts  = results;
            complete();
        });
    }

    function getFilteredArtifacts(res, mysql, context, filter, complete){
        var query = 'SELECT Exhibits.WingName, Exhibits.ExhibitName, Artifacts.Name, Artifacts.ArtifactID, Artifacts.ArtistOrOrigin, Artifacts.Year, '+
                    'Artifacts.Price FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID WHERE Exhibits.ExhibitName=?;' ;
        var inserts = [filter];
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log("RESULTS: " + results)
            context.artifacts = results;
            complete();
        });
    }
    /* 

    Update callback # when adding more functions to get route
    */
    router.get('/', function(req, res){

            var callbackCount = 0;
            var context = {};
            context.jsscripts = ["deleteEmployee.js","filterpeople.js","filterwing.js"];
            // context.jsscripts = ["filterwing.js"];
            var mysql = req.app.get('mysql');
            getWingFilterList(res, mysql, context, complete);
            getExhibitFilterList(res, mysql, context, complete);
            getArtifacts(res, mysql, context, complete);
            getStaffing(res, mysql, context, complete);
            getStaffingLists(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 5){
                   // console.log("Session: %j", context );
                    res.render('exhibits', context);
                }

            }
    });

    //Update callback # when adding more functions to filter
    router.get('/filter/exhibit/:exhibit', function(req, res){
        //console.log("Filter Exhibit page");
            var callbackCount = 0;
            var context = {};
        context.jsscripts = ["deleteEmployee.js","filterpeople.js","filterwing.js"];
            var mysql = req.app.get('mysql');
            getWingFilterList(res, mysql, context, complete);
            GetStaffingByExhibit(req, res, mysql, context, complete);
            getFilteredArtifacts(res, mysql, context,req.params.exhibit, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 3){
                        res.render('exhibits', context);
                }
            }
    });

    /*  Add new exhibit */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        // var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        //var sql = "INSERT INTO `Employee_Exhibits` (FK_EmployeeID, FK_WingID) VALUES (?, (SELECT WingID from Exhibits WHERE WingID=?))";
        var sql = "INSERT INTO Exhibits (ExhibitName, WingName, ThemeEra, NumberOfPieces) VALUES (?, ?, ?, ?)";
        var inserts = [req.body.ExhibitName, req.body.WingName, req.body.ThemeEra, req.body.NumberOfPieces];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/exhibits');
            }
        });
    });

    return router;
}();
