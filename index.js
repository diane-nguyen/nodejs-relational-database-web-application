// console.log("Connected");

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStaffing(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingID, Employees.EmployeeID, Employees.Position, Exhibits.ExhibitName, Exhibits.WingName ' +  
                    'FROM Exhibits INNER JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibits.WingID ' +
                    'INNER JOIN Employees ON Employees.EmployeeID = Employee_Exhibits.FK_EmployeeID;';
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        console.log("init results: " + results);

            context.staffing  = results;
            complete();
        });
    }


    function getArtifacts(res, mysql, context, complete){
        var query = 'SELECT Exhibits.WingName, Exhibits.ExhibitName, Artifacts.Name, Artifacts.ArtifactID, Artifacts.ArtistOrOrigin, Artifacts.Year, Artifacts.Price FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID;' ;
        mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifacts  = results;
            complete();
        });
    }


    router.get('/', function(req, res){

            var callbackCount = 0;
            var context = {};
            //context.jsscripts = ["deleteEmployee.js","filterpeople.js","searchpeople.js"];
            // context.jsscripts = ["deleteEmployee.js","filterwing.js"];
            var mysql = req.app.get('mysql');
            getArtifacts(res, mysql, context, complete);
            getStaffing(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 2){
                    res.render('home', context);
                }

            }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:exhibit', function(req, res){
        console.log("Filter page");
            var callbackCount = 0;
            var context = {};
            context.jsscripts = ["deleteEmployee.js","filterwing.js"];
            var mysql = req.app.get('mysql');
            getExhibitFilterList(res, mysql, context, complete);
            //getStaffingLists(res, mysql, context, complete);
            //GetStaffingByWingName(req, res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 3){
                        res.render('home', context);
                }
            }
    });


    return router;
}();
