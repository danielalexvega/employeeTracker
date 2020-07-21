const mysql = require('mysql');
const { askMainQuestion, askDepartmentName, askMangerName, askNewFullName, askNewEmployeeRole, askNewRole,
    askManger, askIfManger, askRemoveFullName, askUpdateEmployee, askUpdateEmployeeRole,
    askUpdateManager, askNewRoleDepartment, askNewRoleSalary, askRemoveRole, askUpdateRole, 
    askUpdateRoleTitle, askUpdateRoleSalary, askNewDepartment,
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
        case ('View all managers'):  
            viewAllManagers();
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
            updateEmployeeRole();    
            break;
        case ('Update employee manager'):
            updateEmployeeManager(); 
            break;
        case ('Update manager status'):
            updateManagerStatus(); 
            break;
        case ('View all roles'):
            viewAllRoles();    
            break;
        case ('Add role'):
            addRole();         
            break;
        case ('Remove role'):    
            removeRole();
            break;
        case ('Update role title'):   
            updateRole();
            break;
        case ('Update salary'):
            updateSalary();    
            break;
        case ('View all departments'):
            viewAllDepartments();     
            break;
        case ('Add department'):
            addDepartment();
            break;
        case ('Remove department'):
            RemoveDepartment();
            break;
        case ('Exit'):
            console.log('Have a nice day!');
            break;
    }
}

const displayStartover = () => {
    console.log('\n');
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
//Show all departments
const viewAllDepartments = async () => {
    let departments = await query.queryAllDepartments();
    console.table(departments);
    displayStartover();
}
//View all employees
const viewAllEmployees = async () => {
    let employees = await query.queryAllEmployees();
    console.table(employees);
    displayStartover();
}
//View all managers
const viewAllManagers = async () => {
    let managers = await query.queryAllManagers();
    console.table(managers);
    displayStartover();
}
//View all employees by Department
const viewAllEmployeesByDepartment = async () => {
    let departments = await query.queryAllDepartments();
    departments = departments.map(obj => obj.Departments);

    let departmentChoice = await askDepartmentName(departments);
    departmentChoice = departmentChoice.response;

    let departmentEmployees = await query.queryAllEmployeesByDepartment(departmentChoice);
    console.table(departmentEmployees);
    displayStartover();
}
//Add an employee to the company
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
    let managerID = null;

    if (managerChoice.response === 'No Manager') {
        managerID = null;
    } else {
        let nameArr = managerChoice.response.split(" ");
        let managerID = await query.queryID(nameArr);
        managerID = managerID[0].id;
    }

    let isManager = await askIfManger();
    isManager = isManager.response;

    console.log(`
Now adding new employee: ${firstName} ${lastName} is a ${newRole}`);

    if (managerID === null) {
        await query.addNewEmployeeNoManager(firstName, lastName, roleID, isManager);
    } else {
        await query.addNewEmployee(firstName, lastName, roleID, managerID, isManager);
    }
    displayStartover();
}
//Remove an employee from the company
const removeEmployee = async () => {
    let employees = await query.queryAllEmployees();
    employees = employees.map(obj => obj['First Name'] + ' ' + obj['Last Name']);

    let removeFullName = await askRemoveFullName(employees);
    let [firstName, lastName] = removeFullName.response.split(" ");

    console.log(`
    Now removing ${firstName} ${lastName}`);

    await query.removeEmployee(firstName, lastName);
    displayStartover();
}
//Update an employee's role in the company
const updateEmployeeRole = async () => {
    let employees = await query.queryAllEmployees();
    employees = employees.map(obj => obj['First Name'] + ' ' + obj['Last Name'] + ' - ' + obj['Role']);

    let updateEmployee = await askUpdateEmployee(employees);
    updateEmployee = updateEmployee.response.split(' ');
    let updateFirstName = updateEmployee[0];
    let updateLastName = updateEmployee[1];

    let roles = await query.queryAllRoles();
    roles = roles.map(obj => obj.Title);

    let updateRole = await askUpdateEmployeeRole(roles);
    updateRole = updateRole.response;

    let updateRoleID = await query.queryRoleID(updateRole);
    updateRoleID = updateRoleID[0].id;

    console.log(`
    Now updating ${updateFirstName} ${updateLastName} - New role: ${updateRole}`);

    await query.updateEmployeeRole(updateRoleID, updateFirstName, updateLastName);
    let startOver = await askStartOver();
    startOver.response ? start() : end();
}
//Update an employee's manager
const updateEmployeeManager = async () => {
    let employees = await query.queryAllEmployees();
    employees = employees.map(obj => obj['First Name'] + ' ' + obj['Last Name'] + ' - ' + obj['Role']);

    let updateEmployee = await askUpdateEmployee(employees);
    updateEmployee = updateEmployee.response.split(' ');
    let updateFirstName = updateEmployee[0];
    let updateLastName = updateEmployee[1];

    let managerID = await query.queryManagerID(updateFirstName, updateLastName);
    managerID = managerID[0].manager_id;

    let managerName = await query.queryEmployeeByID(managerID);
    managerName = managerName[0].first_name + ' ' + managerName[0].last_name;

    console.log(`${updateFirstName} ${updateLastName}'s current manager is ${managerName}.`)
    console.log('\n');

    let managers = await query.queryAllManagers();
    managers = managers.map(obj => obj.first_name + " " + obj.last_name);

    let updatedManager = await askUpdateManager(managers);
    updatedManager = updatedManager.response.split(' ');
    let updatedManagerFirstName = updatedManager[0];
    let updatedManagerLastName = updatedManager[1];

    let newManagerID = await query.queryID(updatedManager);
    newManagerID = newManagerID[0].id;
    console.log(`
    ${updateFirstName} ${updateLastName}'s new manager is ${updatedManagerFirstName} ${updatedManagerLastName}.`)

    await query.updateEmployeeManager(newManagerID, updateFirstName, updateLastName);
    displayStartover();
}
//Update whether an employee is a manager
const updateManagerStatus = async () => {
    let employees = await query.queryAllEmployees();
    employees = employees.map(obj => obj['First Name'] + ' ' + obj['Last Name'] + ' - ' + obj['Role']);

    let updateEmployee = await askUpdateEmployee(employees);
    updateEmployee = updateEmployee.response.split(' ');
    let [firstName, lastName] = updateEmployee;

    let managerStatus = await query.queryManagerStatus(firstName, lastName);
    managerStatus = (managerStatus[0].isManager === 1 ? true : false);
    if (managerStatus === true) {
        console.log(`
        ${firstName} ${lastName} will no longer be a manager.`)
        console.log('\n');
    } else {
        console.log(`
        ${firstName} ${lastName} will now be promoted to manager.`)
        console.log('\n');
    }

    await query.updateManagerStatus((!managerStatus), firstName, lastName);
    displayStartover();
}
//View all employees by manager
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
    displayStartover();
}
//View all roles in the company
const viewAllRoles = async () => {
    let roles = await query.queryAllRoles();
    console.log(`
    Here is a list of all the current roles:`);
    console.table(roles);
    displayStartover();
}
//Add a new role to the company
const addRole = async () => {
    let newRoleTitle = await askNewRole();
    newRoleTitle = newRoleTitle.response;

    let departments = await query.queryAllDepartments();
    departments = departments.map(obj => obj.Departments);

    let newRoleDepartment = await askNewRoleDepartment(departments);
    newRoleDepartment = newRoleDepartment.response;

    let newRoleSalary = await askNewRoleSalary();
    newRoleSalary = parseInt(newRoleSalary.response);

    let newRoleDepartmentID = await query.queryDepartmentID(newRoleDepartment);
    newRoleDepartmentID = newRoleDepartmentID[0].id;

    console.log(`
    Now adding role ${newRoleTitle} in the ${newRoleDepartment} department`);
    await query.addNewRole(newRoleTitle, newRoleSalary, newRoleDepartmentID);
    displayStartover();
}
//Remove a role from the company
const removeRole = async () => {
    let roles = await query.queryAllRoles();
    roles = roles.map(obj => obj.Title);

    let removeChoice = await askRemoveRole(roles);
    removeChoice = removeChoice.response;

    console.log(`
    Now removing the following role: ${removeChoice}`);

    await query.removeRole(removeChoice);
    displayStartover();
}
//Update a role in the company
const updateRole = async () => {
    let roles = await query.queryAllRoles();
    roles = roles.map(obj => obj.Title);

    let updateChoice = await askUpdateRole(roles);
    updateChoice = updateChoice.response;

    let updateTitle = await askUpdateRoleTitle();
    updateTitle = updateTitle.response;

    console.log(`
    Now updating the role '${updateChoice}' to '${updateTitle}'`);
    await query.updateRoleTitle(updateTitle, updateChoice);
    displayStartover();
}
//Update a role's salary in the company
const updateSalary = async () => {
    let roles = await query.queryAllRoles();
    roles = roles.map(obj => obj.Title);

    let updateChoice = await askUpdateRole(roles);
    updateChoice = updateChoice.response;

    let salary = await query.querySalaryFromRole(updateChoice);
    salary = salary[0].salary;

    let newSalary = await askUpdateRoleSalary();
    newSalary = newSalary.response;

    console.log(`
    Now updating the salary for role '${updateChoice}' from ${salary} to ${newSalary}`);
    await query.updateSalary(newSalary, updateChoice);

    displayStartover();
}
//Add a new department to the company
const addDepartment = async () => {
    let newDeparment = await askNewDepartment();
    newDeparment = newDeparment.response;

    console.log(`
    Now adding new department ${newDeparment}.`);
    await query.addNewDepartment(newDeparment);
    displayStartover();
}
//Remove a department from the company
const RemoveDepartment = async () => {
    let departments = await query.queryAllDepartments();
    departments = departments.map(obj => obj.Departments);

    let removeDepartment = await askRemoveDepartment(departments);
    removeDepartment = removeDepartment.response;

    console.log(`
    Now removing the following department: ${removeDepartment}`);
    await query.removeDepartment(removeDepartment);
    displayStartover();
}
//End the program, wish them a nice day!
const end = () => {
    console.log('\n Have a nice day! \n');
    connection.end();
}