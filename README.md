# charity-service
Backend service for Charity Explorer

# To run locally
Assumption: You have node.js, npm, mongodb etc installed.
1. Clone the git repo.
```git clone https://github.com/storaskar/charity-service.git```
2. Install the dependencies
```$ npm install ```
3. Run mongo server, in the mongo shell, create db.
```use <db_name>```
4. Also, pre-populate "charities" data. To do this copy/paste "db.charities.insert" command from `scripts/charities_load.js` and run in mongo shell.
5. Create ```.env``` file which lists your local mongdoDB_uri
```MONGODB_URI=mongodb://<db_user>:<db_password>@<db_server>:<db_port>/<db_name>```
6. Start the application
```npm start```
7. You can test whether application started or not by going to `http://localhost:4000`. You should see welcome message if app started successfully.
