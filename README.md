# Migrate from Syncfusion Scheduler to Bryntum Scheduler: Backend starter repository

## Set up a MySQL database locally

We'll use the MySQL Workbench GUI to create a database with tables for the scheduler data and to run queries.

Download MySQL Server and MySQL Workbench from the [MySQL community downloads page](https://dev.mysql.com/downloads/). If you’re using Windows, you can use the [MySQL Installer for Windows](https://dev.mysql.com/downloads/installer/) to download the MySQL products.

Install MySQL Server and MySQL Workbench using the default configurations. Configure the MySQL Server to start at system startup for your convenience.

Open the MySQL Workbench desktop application. Open the local instance of the MySQL Server that you configured.

Write MySQL queries in the query tab and execute the queries by pressing the yellow lightning bolt button.

### Create a MySQL database for the Syncfusion Scheduler data: Adding tables and example data

Execute the following query to create a database called `syncfusion_scheduler`:


```sql
CREATE DATABASE syncfusion_scheduler;
```

Set the newly created database for use:

```sql
USE syncfusion_scheduler;
```

Create a table for the appointments data:

```sql
CREATE TABLE `appointments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Text` varchar(200) DEFAULT NULL,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  `StartTimezone` varchar(200) DEFAULT NULL,
  `EndTimezone` varchar(200) DEFAULT NULL,
  `Color` varchar(200) DEFAULT NULL,
  `Location` varchar(200) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `Subject` varchar(200) DEFAULT NULL,
  `IsAllDay` boolean NOT NULL,
  `Categorize` varchar(200) DEFAULT NULL,
  `ResourceId` json NOT NULL,
  `Priority` varchar(200) DEFAULT NULL,
  `RecurrenceID` int(11) DEFAULT NULL,
  `FollowingID` int(11) DEFAULT NULL,
  `ResourceFields` varchar(200) DEFAULT NULL,
  `RecurrenceRule` varchar(200) DEFAULT NULL,
  `RecurrenceExDate` varchar(200) DEFAULT NULL,
   PRIMARY KEY (`Id`)
);
```

The appointments will be the events in the Syncfusion Scheduler.

Create a table for the resources data:

```sql
CREATE TABLE `resources` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Text` varchar(200) DEFAULT NULL,
  `Color` varchar(200) DEFAULT NULL,
   PRIMARY KEY (`Id`)
);
```

Add some example appointments data to the appointments table:

```sql
INSERT INTO appointments (
    `Subject`, 
    `StartTime`, 
    `EndTime`, 
    `IsAllDay`,
    `ResourceId`
) 
VALUES 
    ('Meeting', '2024-04-15T10:00:00', '2024-04-15T12:30:00', false, '[1]'),
    ('Meeting', '2024-04-15T13:00:00', '2024-04-15T15:30:00', false, '[2]'),
    ('Team Sync', '2024-04-15T09:15:00', '2024-04-15T10:00:00', false, '[4]'),
    ('Design Review', '2024-04-15T14:30:00', '2024-04-15T15:30:00', false, '[5]'),
    ('Code Walkthrough', '2024-04-15T11:45:00', '2024-04-15T12:30:00', false, '[6]'),
    ('Intern training', '2024-04-15T14:30:00', '2024-04-15T15:30:00', false, '[7]'),
    ('Stakeholder Update', '2024-04-15T13:45:00', '2024-04-15T14:45:00', false, '[1]'),
    ('Product Strategy Session', '2024-04-15T10:00:00', '2024-04-15T12:00:00', false, '[2]'),
    ('Engineering Sync', '2024-04-15T16:15:00', '2024-04-15T17:30:00', false, '[3]'),
    ('QA Review', '2024-04-15T13:30:00', '2024-04-15T15:00:00', false, '[4]'),
    ('Marketing Brief', '2024-04-15T09:45:00', '2024-04-15T10:45:00', false, '[5]');
```

Add some example resources data to the resources table:

```sql
INSERT INTO resources (
    `Text`, 
    `Color`
) 
VALUES 
    ('Lisa', '#0000e4'),
    ('Rob', '#0013e9'),
    ('Luke', '#021aee'),
    ('Robert', '#3722f6'),
    ('Janine', '#4a26fd'),
    ('Jessica', '#714cfe'),
    ('Marie', '#916eff');
```

View the example appointments data by running the following query:

```sql
SELECT * FROM appointments;
```

View the example resources data by running the following query:

```sql
SELECT * FROM resources;
```

## Set up the backend server

Install the dependencies with the following command:

```bash
npm install
```

In the `utils/dbConnect.js` file, the Express server uses the [MySQL2](https://github.com/sidorares/node-mysql2) library to connect to a MySQL database. A connection pool is created using the MySQL2 `createPool` method. The connection pool is exported into the `server.js` file where it's used to run database queries for CRUD operations using the `query` method.

Create a `.env` file in the root folder and add the following lines for connecting to the MySQL database that we’ll create:

```
HOST=localhost
PORT=1338
DB_USER=root
PASSWORD=
DATABASE=syncfusion_scheduler
FRONTEND_URL="http://localhost:4000"
```

Don’t forget to add the root password for your MySQL server.

## Running the application

Run the server locally using the following command:

```bash
npm start
```
