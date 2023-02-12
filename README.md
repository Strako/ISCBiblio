# ISCBiblio
  ISC Project description:
  
    This project will contain all the files related to the DB, API's(Nodejs) and Frontend 
    (Fronted) of our project
    
  Routes and links:
  
    -DB: ISCBiblio/DB/ISCBiblio.sql
    -Nodejs files: ISCBiblio/Node
    -Angular files: ISCBilio/Angular
    -Jira SCRUM board: https://proyectofinal22.atlassian.net/jira/software/projects/ISC/boards/2
    
  How to start backend server:
  
    -First import the database located in the "/DB/ISCBiblioFinal.sql"
    -Then open "Node" folder on Visual Studio Code and open the file '/connection/connection.js' 
    and edit the password attribute 'password' and set it to your own database password
    -Finally run 'npm run serve' and the server will start on localhost on port 3000 'localhost:3000'

  How to consume the API:

    -Import the collection inside the '/Postman' folder 
    -Sign in with a valid user / password to get the token and test the API
    -Example:
    
    	{
    	     "mail": "strako@gmail.com",
    	     "password": "1234567"
    	}
