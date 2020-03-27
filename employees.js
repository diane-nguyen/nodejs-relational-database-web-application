module.exports = function(){
	var express = require('express');
	var router = express.Router();

	//get list of employees to display in table
	function getEmployees(res, mysql, context, complete){
		var query = 'SELECT EmployeeID, Fname, Lname, Position FROM `Employees`;';
		mysql.pool.query(query, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			context.allstaff  = results;
			complete();
		});
	}

	//Function used to get single employee, used to update employee
	function getEmployee(res, mysql, context, id, complete){
		var sql = "SELECT EmployeeID as id, Employees.Fname, Employees.Lname, Employees.Position FROM Employees WHERE EmployeeID = ?";
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

	//route to display main employee page
	router.get('/', function(req, res){
		var callbackCount = 0;
		var context = {};
		context.jsscripts = ["deleteEmployee.js","filterpeople.js","filterwing.js"];
		var mysql = req.app.get('mysql');
		getEmployees(res, mysql, context, complete);
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
			   // console.log("Session: %j", context );
				res.render('employees', context);
			}
		}
	});


	//Adds new employee into employees table
	//Redirects to router.get('/') and executes what is in there. Updates page to reflect new employee
	router.post('/', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "INSERT INTO `Employees` (Fname, Lname, Position) VALUES (?,?,?)";
		var inserts = [req.body.Fname, req.body.Lname, req.body.Position];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
			if(error){
				console.log(JSON.stringify(error))
				res.write(JSON.stringify(error));
				res.end();
			}else{
				res.redirect('/employees');
			}
		});
	});

	//Display one employee, used to update employee
	router.get('/:id', function(req, res){
		callbackCount = 0;
		var context = {};
		var mysql = req.app.get('mysql');
		getEmployee(res, mysql, context, req.params.id, complete);
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.render('update-employee', context);
			}

		}
	});

	//Router to update employee
	router.put('/:id', function(req, res){
		var mysql = req.app.get('mysql');
		var sql = "UPDATE Employees SET Employees.Fname=?, Lname=?, Position=? WHERE Employees.EmployeeID=?";
		var inserts = [req.body.Fname, req.body.Lname, req.body.Position, req.params.id];

		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
			if(error){
			   // console.log(error)
				res.write(JSON.stringify(error));
			}else{
				res.status(200);
			}
			res.end();
		});
	});

	//route to delete employee, uses stored procedure (see end)
	router.delete('/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "CALL DeleteEmployee(?)";
	var inserts = [req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		   // console.log(error)
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}   
		})
	})
	
	//end of routes
	return router;
}();


/*
Funciton defintion of stored procedure DeleteEmployee(empID) for reference:

DELIMITER $$ 
CREATE PROCEDURE DeleteEmployee(IN empID int)
BEGIN
    DELETE FROM
    	Employee_Exhibits
    WHERE
    	Employee_Exhibits.FK_EmployeeID = empID;
        
	DELETE FROM
    	Employees
    WHERE
    	Employees.EmployeeID = empID;
    
END$$
DELIMITER ;

*/