/*
What would you like to do?
list
view all employees
view all employees by department
view all employees by manager
add employee
remove employee
update employee

view all roles
view all departments
*/

const inquirer = require('inquirer');

module.exports = {
    askMainQuestion: () => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View all employees', //no further questions
                    'View all employees by department', //which department [x]
                    'View all employees by manager', //which manager [x]
                    'Add employee', // What's their full name? [x], What's their role? [x] Who's their manager? [x] Are they a manager? [x], 
                    'Remove employee', //What's their full name [x]
                    'Update employee role', //Which employee? [x] What's the new role? [x]
                    'Update employee manager', //Who's their new manager? [x]
                    'Update manager status', //[x]
                    'View all roles', // [x]
                    'Add role', // What is the name of the role? [x] What department? [x] What is the salary? [x]
                    'Remove role', // What is the name of the role? [x]
                    'Update role', // What role do you want to update? [x] 
                    'Update salary', // What is the new salary? [x]
                    'View all departments', // [x]
                    'Add department', // [x] What is the name of the new department? 
                    'Remove department', // [x]Do you want to also terminate the employees in this department? Which department?
                    'Exit'
                ],
                name: 'response'
            }
        ]);
    },
    // Used when asking to 'View employees by Department' pass into the departments
    askDepartmentName: (departments) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which department do you want to view?',
                // choices: ['SALES', 'ENGINEERING', 'FINANCE', 'LEGAL'],
                // I need to get all the departments
                choices: departments,
                name: 'response'
            }
        ])
    },
    // Used when asking to 'View employees by Manager'
    askMangerName: (managers) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which manager are you interested in?',
                choices: managers,
                name: 'response'
            }
        ])
    },
    // Used when adding a new employee
    askNewFullName: () => {
        return inquirer.prompt([
            {
                type: 'input',
                message: "What's the new employee's full name?",
                name: 'response'
            }
        ]);
    },
    askNewEmployeeRole: (roles) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: "What is the new employee's role?",
                // get all the roles
                choices: roles,
                name: 'response'
            }
        ]);
    },
    askManger: (managers) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Who is their manager?',
                choices: managers,
                name: 'response'
            }
        ]);
    },
    askIfManger: () => {
        return inquirer.prompt([
            {
                type: 'confirm',
                message: 'Are they a manager?',
                name: 'response'
            }
        ]);
    },
    // Used when removing an employee pass into it employee array
    askRemoveFullName: (employees) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee do you want to remove?',
                choices: employees,
                name: 'response'
            }
        ]);
    },
    // Used when updating employee pass into it employee array
    askUpdateEmployee: (employees) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: employees,
                name: 'updateFullName'
            }
        ]);
    },
    askUpdateEmployeeRole: (roles) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What is the updated role?',
                choices: roles,
                name: 'updateRole'
            }
        ]);
    },
    askUpdateManager: (managers) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Who is the updated manager?',
                choices: managers,
                name: 'updatedManager'
            }
        ]);
    },
    askUpdateIfManager: () => {
        return inquirer.prompt([
            {
                type: 'confirm',
                message: 'Are you promoting this employee to a manager role?',
                name: 'updateIfManager'
            }
        ]);
    },
    //Used when adding a new role
    askNewRole: () => {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the new role?',
                name: 'newRoleTitle'
            }
        ]);
    },
    askNewRoleDepartment: (departments) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which department is the new role in?',
                choices: departments,
                name: 'newRoleDepartment'
            }
        ])
    },
    askNewRoleSalary: () => {
        return inquirer.prompt([
            {
                type: 'inout',
                message: "What is the new role's salary?",
                name: 'newRoleSalary'
            }
        ]);
    },
    // Used when removing a role 
    askRemoveRole: (roles) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which role do you want to remove?',
                choices: roles,
                name: 'removeRoleTitle'
            }
        ]);
    },
    // Used when updating a role
    askUpdateRole: (roles) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which role do you want to update?',
                choices: roles,
                name: 'updateRole'
            }
        ]);
    },
    askUpdateRoleTitle: () => {
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the role's updated title?",
                name: 'updateRoleTitle'
            }
        ]);
    },
    askUpdateRoleSalary: () => {
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the role's updated salary?",
                name: 'updateRoleSalary'
            }
        ]);
    },
    askNewDepartment: () => {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the new department?',
                name: 'newDepartmentName'
            }
        ]);

    },
    askRemoveDepartment: (departments) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which department do you want to remove?',
                choices: departments,
                name: 'removeDepartmentName'
            }
        ]);
    },
    askStartOver: () => {
        return inquirer.prompt([
            {
                type: 'confirm',
                message: 'Would you like to start over?',
                name: 'response'
            }
        ]);
    }
}