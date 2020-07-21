module.exports = class QueryObj {
    constructor(connection) {
        this.connection = connection;
    }
    //Get all the departments
    queryAllDepartments = () => new Promise((resolve, reject) => {
        this.connection.query('SELECT name"Departments" FROM departmentList', (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
    //Get an ID given a department name
    queryDepartmentID = (department) => new Promise((resolve, reject) => {
        this.connection.query('SELECT id FROM departmentList WHERE name=?', [department], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //Get a name given a department ID
    queryDepartmentName = (department_id) => new Promise((resolve, reject) => {
        this.connection.query('SELECT name"Department" FROM departmentList WHERE id=?', [department_id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //Gets all the roles in the company
    queryAllRoles = () => new Promise((resolve, reject) => {
        this.connection.query('SELECT title"Title" FROM roleList', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //Given a department name, get all the roles
    queryAllDepartmentRoles = (department) => new Promise((resolve, reject) => {
        this.connection.query('SELECT d.name "Department", r.title "Role" FROM departmentList d, roleList r WHERE d.name=? AND d.id=r.department_id', [department], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //Get all Salaries 
    queryAllSalaries = () => new Promise((resolve, reject) => {
        this.connection.query('SELECT salary"Salary" FROM roleList', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //Get all employees 
    queryAllEmployees = () => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT d.name"Department", r.title"Role", e.first_name"First Name", e.last_name"Last Name" FROM departmentList d, roleList r, employeeList e WHERE e.role_id=r.id AND r.department_id=d.id', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a name, find a role
    queryRole = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT e.first_name "First Name", e.last_name "Last Name", r.title "Role" FROM employeeList e, roleList r WHERE first_name=? AND last_name=? AND e.role_id = r.id', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a name, get me the id of your manager ("I'd like to speak to your manager" - Karen)
    queryManagerID = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT manager_id FROM employeeList WHERE first_name=? AND last_name=?', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a name, return a salary
    querySalary = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT e.first_name "First Name", e.last_name "Last Name", r.salary "Salary" FROM employeeList e, roleList r WHERE e.first_name=? AND e.last_name=? AND e.role_id = r.id', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a role, get a salary
    querySalaryFromRole = (role) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT salary FROM roleList WHERE title=?', [role], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a name, get a role and department
    queryDepartment = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT e.first_name "First Name", e.last_name "Last Name", r.title "Role", d.name "Department" FROM employeeList e, roleList r, departmentList d WHERE e.first_name=? AND e.last_name =? AND e.role_id = r.id AND r.department_id=d.id', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a department name, find all the employees
    queryAllEmployeesByDepartment = (info) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT roleList.title"Role", employeeList.first_name"First Name", employeeList.last_name "Last Name" FROM departmentList, roleList, employeeList WHERE departmentList.id = roleList.department_id AND roleList.id = employeeList.role_id AND departmentList.name=?', [info], (err, res) => {
                if (err) {
                    console.log("It didn't work dumb dumb");
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a role, find all the employees
    queryEmployeesByRole = (roleTitle) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT d.name "Department", r.title"Role", e.first_name "First Name", e.last_name "Last Name" FROM departmentList d, roleList r, employeeList e WHERE r.title=? AND d.id=r.department_id AND r.id=e.role_id', [roleTitle], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given an id, return an employee
    queryEmployeeByID = (id) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT first_name, last_name FROM employeeList WHERE id=?', [id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    })
    //Given a name, return if an employee is a manager
    queryManagerStatus = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT isManager FROM employeeList WHERE first_name=? AND last_name=?', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Get all the managers
    queryAllManagers = () => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT name"Department", title"Role", first_name, last_name FROM employeeList INNER JOIN roleList ON isManager=true AND employeeList.role_id=roleList.id INNER JOIN departmentList ON roleList.department_id=departmentList.id', (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a manager id, find all employees under that manager
    queryAllEmployeesByManager = (manager_id) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT d.name"Department", r.title"Role", e.first_name"First Name", e.last_name "Last Name" FROM departmentList d, roleList r, employeeList e WHERE e.manager_id=? AND e.role_id=r.id AND r.department_id=d.id', [manager_id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a name (in an array) get an ID
    queryID = (nameArr) => new Promise((resolve, reject) => {
        let firstName = nameArr[0];
        let lastName = nameArr[1];
        this.connection.query(
            'SELECT employeeList.id FROM employeeList WHERE first_name=? AND last_name=?', [firstName, lastName], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Given a role, get an ID
    queryRoleID = (role) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT roleList.id FROM roleList WHERE title=?', [role], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Add a new employee
    addNewEmployee = (first_name, last_name, role_id, manager_id, isManager) => new Promise((resolve, reject) => {
        this.connection.query(
            'INSERT INTO employeeList(first_name, last_name, role_id, manager_id, isManager) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, role_id, manager_id, isManager], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Add a new employee manager
    addNewEmployeeNoManager = (first_name, last_name, role_id, isManager) => new Promise((resolve, reject) => {
        this.connection.query(
            'INSERT INTO employeeList(first_name, last_name, role_id, manager_id, isManager) VALUES (?, ?, ?, null, ?)', [first_name, last_name, role_id, isManager], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Remove an employee
    removeEmployee = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'DELETE FROM employeeList WHERE first_name=? AND last_name=?', [first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Add a new role
    addNewRole = (title, salary, department_id) => new Promise((resolve, reject) => {
        this.connection.query(
            'INSERT INTO roleList(title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Update an employee role
    updateEmployeeRole = (role_id, first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'UPDATE employeeList SET role_id=? WHERE first_name=? AND last_name=?', [role_id, first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Update employee manager
    updateEmployeeManager = (manager_id, first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'UPDATE employeeList SET manager_id=? WHERE first_name=? AND last_name=?', [manager_id, first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Update manager status, change whether an employee was a manager or not
    updateManagerStatus = (isManager, first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'UPDATE employeeList SET isManager=? WHERE first_name=? AND last_name=?', [isManager, first_name, last_name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Remove role
    removeRole = (role) => new Promise((resolve, reject) => {
        this.connection.query(
            'DELETE FROM roleList WHERE title=?', [role], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Update role title
    updateRoleTitle = (updateTitle, updateChoice) => new Promise((resolve, reject) => {
        this.connection.query(
            'UPDATE roleList SET title=? WHERE title=?', [updateTitle, updateChoice], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Update salary
    updateSalary = (newSalary, role) => new Promise((resolve, reject) => {
        this.connection.query(
            'UPDATE roleList SET salary=? WHERE title=?', [newSalary, role], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Add new department
    addNewDepartment = (name) => new Promise((resolve, reject) => {
        this.connection.query(
            'INSERT INTO departmentList(name) VALUES (?)', [name], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    //Remove department
    removeDepartment = (department) => new Promise((resolve, reject) => {
        this.connection.query(
            'DELETE FROM departmentList WHERE name=?', [department], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
};
