const mysql = require('mysql');
const { askMainQuestion, askDepartmentName, askMangerName, askNewFullName, askNewEmployeeRole, askNewRole,
    askManger, askIfManger, askRemoveFullName, askUpdateEmployee, askUpdateEmployeeRole,
    askUpdateManager, askUpdateIfManager, askNewRoleDepartment, askNewRoleSalary,
    askRemoveRole, askUpdateRole, askUpdateRoleTitle, askUpdateRoleSalary, askNewDepartment,
    askRemoveDepartment, askStartOver } = require('./questions');

const QueryObj = require('./QueryObj');




const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ahmedCOOLpetMOSES17fire!',
    database: 'employeeDB'
});

const query = new QueryObj(connection);

connection.connect(async (err) => {
    if (err) throw err;
    try {
        start();
        // let test = await query.queryAllDepartments();
        // test = test.map(obj => obj.Departments);
        // console.log(test);


    } catch (err) {
        console.log(err);
    } finally {
        console.log('nothing');
    }
});

const start = async () => {
    let answer = await askMainQuestion();
    answer = answer.response;

    switch (answer) {
        case ('View all employees'):
            viewAllEmployees();
            break;
        case ('View all employees by department'):
            viewAllEmployeesByDepartment();
            break;
        case ('View all employees by manager'):
            viewAllEmployeesByManager();
            break;
        case ('Add employee'):
            addEmployee();
            break;
        case ('Remove employee'):
            removeEmployee();
            break;
        case ('Update employee role'):
        case ('Update employee manager'):
        case ('Update manager status'):
        case ('View all roles'):
            viewAllRoles();
            break;
        case ('Add role'):
        case ('Remove role'):
        case ('Update role'):
        case ('Update salary'):
        case ('View all departments'):
            viewAllDepartments();
            break;
        case ('Add department'):
        case ('Remove department'):
        case ('Exit'):
            console.log('Have a nice day!');
            break;
    }
}

const viewAllDepartments = async () => {
    let departments = await query.queryAllDepartments();
    console.table(departments);
    console.log('\n');
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
// THIS IS COMPELTE
const viewAllEmployees = async () => {
    let employees = await query.queryAllEmployees();
    console.table(employees);
    console.log('\n');
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
// THIS IS COMPLETE
const viewAllEmployeesByDepartment = async () => {
    let departments = await query.queryAllDepartments();
    departments = departments.map(obj => obj.Departments);
    let departmentChoice = await askDepartmentName(departments);
    departmentChoice = departmentChoice.response;
    let departmentEmployees = await query.queryAllEmployeesByDepartment(departmentChoice);
    console.table(departmentEmployees);
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
// THIS IS COMPLETE
const addEmployee = async () => {
    let newFullName = await askNewFullName();
    let [firstName, lastName] = newFullName.response.split(" ");
    let roles = await query.queryAllRoles();
    roles = roles.map(obj => obj.Title);
    let newRole = await askNewEmployeeRole(roles);
    newRole = newRole.response;
    let roleID = await query.queryRoleID(newRole);
    roleID = roleID[0].id;
    let managers = await query.queryAllManagers();
    managers = managers.map(obj => obj.first_name + " " + obj.last_name);
    if (!managers.includes('No Manager')) {
        managers.push('No Manager');
    }
    let managerChoice = await askManger(managers);
    if (managerChoice.response === 'No Manager') {
        managerID = null;
    } else {
        let nameArr = managerChoice.response.split(" ");
        let managerID = await query.queryID(nameArr);
        managerID = managerID[0].id;
    }

    let isManager = await askIfManger();
    isManager = isManager.response;

    if (managerID === null) {
        await query.addNewEmployeeNoManager(firstName, lastName, roleID, isManager);
    } else {
        await query.addNewEmployee(firstName, lastName, roleID, managerID, isManager);
    }

    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
const removeEmployee = async () => {
    let employees = await query.queryAllEmployees();
    employees = employees.map(obj => obj['First Name'] + ' ' + obj['Last Name']);
    let removeFullName = await askRemoveFullName(employees);
    let [firstName, lastName] = removeFullName.response.split(" ");
    console.log(`
    Now removing ${firstName} ${lastName}`);

    await query.removeEmployee(firstName, lastName);
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}

// THIS IS COMPLETE 
const viewAllEmployeesByManager = async () => {
    let managers = await query.queryAllManagers();
    managers = managers.map(obj => obj.first_name + " " + obj.last_name);
    let managerChoice = await askMangerName(managers);
    let nameArr = managerChoice.response.split(' ');
    let managerId = await query.queryID(nameArr);
    managerId = managerId[0].id;
    console.log(`
    The following employees are managed by ${managerChoice.name}:`);
    let employeeList = await query.queryAllEmployeesByManager(managerId);
    console.table(employeeList);
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
// THIS IS COMPLETE
const viewAllRoles = async () => {
    let roles = await query.queryAllRoles();
    console.log(`
    Here is a list of all the current roles:`);
    console.table(roles);
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}


//const getAllEmployeesByDepartment





const end = () => {
    console.log('\n Have a nice day! \n');
    connection.end();
}