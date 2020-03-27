module.exports = function(){
    var express = require('express');
    var router = express.Router();


    //TODO: get scheduling and artifacts update to not crash after submitting 

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

    //SELECT Artifacts.Name, Artifacts.ArtifactID as id, Artifacts.Price, Artifacts.Year, Exhibits.WingName, Exhibits.WingID FROM `Exhibits` INNER JOIN Artifacts ON Exhibits.WingID = Artifacts.FK_WingID WHERE Artifacts.ArtifactID =?
    function getArtifact(res, mysql, context, id, complete){
        var sql = 'SELECT Artifacts.Name, Artifacts.ArtifactID as id, Artifacts.Price, Artifacts.Year, Exhibits.WingName, Exhibits.WingID FROM `Artifacts` INNER JOIN `Exhibits` ON Artifacts.FK_WingID = Exhibits.WingID WHERE Artifacts.ArtifactID = ?;';
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.artifactInfo = results[0];
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

    //Get route for artifact main page
    router.get('/', function(req, res){
        console.log("LOADING HOME");
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterwing.js", "updateArtifact.js"];
        var mysql = req.app.get('mysql');
        getArtifacts(res, mysql, context, complete);
        getExhibitWing(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
               // console.log("Session: %j", context );
                res.render('artifacts', context);
            }
        }
    });


    //Add new artifact to Artifact table 
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO `Artifacts` (`FK_WingID`, `Name`, `ArtistOrOrigin`, `Year`, `Price`) VALUES (?,?,?,?,?)";
        var inserts = [req.body.FK_WingID, req.body.Name, req.body.ArtistOrOrigin, req.body.Year, req.body.Price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
               // console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/artifacts');
            }
        });
    });

    //Display one artifact used to update artifact   
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["filterwing.js", "updateArtifact.js"];
        var mysql = req.app.get('mysql');
        getArtifact(res, mysql, context, req.params.id, complete);
        getExhibitWing(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-artifact', context);
            }
        }
    });

    // Router to update artifact
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Artifacts SET Artifacts.Name=?, Artifacts.Price=?, Artifacts.Year=?, Artifacts.FK_WingID=? WHERE Artifacts.ArtifactID=?";
        var inserts = [req.body.Name, req.body.Price, req.body.Year, req.body.FK_WingID, req.params.id];
        console.log("INSERTS ARE: " + inserts);

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    //Router to delete artifact
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Artifacts WHERE ArtifactID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
            //  console.log(error)
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
