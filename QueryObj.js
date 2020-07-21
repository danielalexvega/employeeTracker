module.exports = class QueryObj {

    constructor(connection) {
        this.connection = connection;
    }
    //departmentList quaries (name and ID)
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
    // get an ID given a department name
    // departmentList query
    queryDepartmentID = (department) => new Promise((resolve, reject) => {
        connection.query('SELECT id FROM departmentList WHERE name=?', [department], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    // get a name given a department ID
    queryDepartmentName = (department_id) => new Promise((resolve, reject) => {
        this.connection.query('SELECT name"Department" FROM departmentList WHERE id=?', [department_id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    // gets all the roles in the company - roleList query
    queryAllRoles = () => new Promise((resolve, reject) => {
        this.connection.query('SELECT title"Title" FROM roleList', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    //given a department name, get ALL the roles
    queryAllDepartmentRoles = (department) => new Promise((resolve, reject) => {
        this.connection.query('SELECT d.name "Department", r.title "Role" FROM departmentList d, roleList r WHERE d.name=? AND d.id=r.department_id', [department], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
    // get all salaries 
    queryAllSalaries = () => new Promise((resolve, reject) => {
        this.connection.query('SELECT salary"Salary" FROM roleList', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
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
    // given a name, find a role
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
    // given a name, get me the id of your manager ("I'd like to speak to your manager" - Karen)
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
    // given a name, find a manager (first and last name)
    queryManager = (manager_id) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT first_name"FirstName", last_name"Last Name", r.title "Role" FROM employeeList e, roleList r WHERE e.id=? AND e.role_id = r.id', [id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });
    // given a name, get a role, return a salary
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
    //given a name, get a role, return a department
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
    //given a department name, find all the employees
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
    //given a role, find all the employees
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
    // get all the managers
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
    queryAllEmployeesByManager = (manager_id) => new Promise((resolve, reject) => {
        this.connection.query(
            'SELECT d.name"Department", r.title"Role", e.first_name"First Name", e.last_name "Last Name" FROM departmentList d, roleList r, employeeList e WHERE e.manager_id=? AND e.role_id=r.id AND r.department_id=d.id', [manager_id], (err, res) => {
                if (err) {
                    console.log("It didn't work dumb dumb");
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });

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

    removeEmployee = (first_name, last_name) => new Promise((resolve, reject) => {
        this.connection.query(
            'DELETE FROM employeeList WHERE first_name=? AND last_name=?', [first_name, last_name], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
    });








    // update... 
};



/*

returnsPromise().then((information) => {

}).then((moreinformation) => {

}).then(...)

async await

let information = await returnsPromsie();
console.log(information);

let something = await otherthing();




*/