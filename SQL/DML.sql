 -- Display Main Exhibit Staffing with Optional Filtering (if filter fields not NULL)
 SELECT 
 	Exhibit.WingID, Employee.EmployeeID, Employee.Position, Exhibit.ExhibitName, Exhibit.WingName
 FROM 
 	Exhibit
 	JOIN Employee_Exhibits ON Employee_Exhibits.FK_WingID = Exhibit.WingID
 	JOIN Employee ON Employee.EmployeeID = Employee_Exhibits.FK_EmployeeID
WHERE
	Exhibit.WingName = :WingNameFilter AND 
						(Employee.Fname LIKE :EmployeeNameFilter OR Employee.Lname LIKE :EmployeeNameFilter) AND 
						Employee.Position = :EmployeePositionFilter


 -- Display Main Exhibit Artifacts with Optional Filtering (if filter fields not NULL)
 SELECT 
 	Exhibit.ExhibitName, Exhibit.WingName, Artifact.ArtifactName, Artifact.ArtistOrOrigin, Artifact.Year, Artifact.Price
 FROM 
 	Exhibit
 	JOIN Artifact ON Artifact.WingID = Exhibit.WingID
WHERE
	Exhibit.WingName = :WingNameFilter AND 
						Artifact.ArtifactName LIKE :ArtifactNameFilter

-- get employee name
SELECT Fname, Lname FROM Employees 
-- get employee position
SELECT Position From Employees
-- get artifact name
SELECT Name FROM Artifacts
-- get wing name
SELECT WingName, ExhibitName FROM Exhibits


-- EMPLOYEES
-- Query for add a new Employee  with colon : character being used to 
-- denote the variables that will have data from the backend programming language
-- add employee
INSERT INTO 
	Employees (Fname, Lname, Position)
VALUES 
	(:FnameInput, :LnameInput, :PositionInput);

-- Query for update an Employee  with colon : character being used to 
-- denote the variables that will have data from the backend programming language
-- edit employee
UPDATE 
	Employees (Fname, Lname, Position)
SET 
	Fname = :FnameInput, Lname = :LnameInput, Position = :PositionInput
WHERE 
	EmployeeID = :EmployeeIDSelect;

-- Query to delete Employee with colon : character being used to 
-- denote the variables that will have data from the backend programming language
-- delete employee
DELETE FROM 
	Employees 
WHERE
	Fname = :FnameInput AND Lname = :LnameInput AND Position = :PositionInput
  
-- ARTIFACTS
-- add artifact
INSERT INTO 
	Artifacts (Name, ArtistOrOrgin, Year, Price) 
VALUES 
	(:NameInput, :ArtistOrOrginInput, :YearInput, :PriceInput);
  
-- edit artifact 
UPDATE 
	Artifacts (Name, ArtistOrOrgin, Year, Price) 
SET 
	Name = :NameInput, ArtistOrOrgin = :ArtistOrOrginInput, Year = :YearInput, Price = :PriceInput 
WHERE 
	ArtifactID = :ArtifactIDSelect;
  
-- delete artifact
DELETE 
	Artifacts 
WHERE 
	Name = :NameInput, ArtistOrOrgin = :ArtistOrOrginInput, Year = :YearInput, Price = :PriceInput

-- EXHIBITS
-- edit wing 
UPDATE 
	Exhibits (WingName, ThemeEra, NumberOfPieces) 
SET 
	WingName = :WingNameInput, ThemeEra = :ThemeEraInput, NumberOfPieces = :NumberOfPiecesInput 
WHERE 
	WingID = :WingIDSelect;

-- insert
INSERT INTO 
	Exhibits (ExhibitName, WingName, ThemeEra, NumberOfPieces) 
VALUES 
	(?, ?, ?, ?);
