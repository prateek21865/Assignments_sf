interface Users {
    firstName: string;
    middleName?: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    role: string;
    address?: string;
    createdOn: Date;
    modifiedOn?: Date;
}

class User implements Users {
    constructor(
        public firstName: string,
        public email: string,
        public role: string,
        public createdOn: Date,
        public phoneNumber: string,
        public middleName?: string,
        public lastName?: string,
        public address?: string,
        public modifiedOn?: Date
    ) {}
}

const users: Users[] = [
    new User("Prateek", "prateek.singh@sourcefuse.com", "Intern", new Date('2024-07-12'), "9625366966", "", "Singh", "Noida"),
    new User("Abhi", "abhi21865@gmail.com", "Sr. Software Engineer", new Date('2024-07-12'), "95986673669", "Pratap", "Singh", "Mohali"),
];

document.getElementById('load-data-btn')?.addEventListener('click', () => {
    const table = document.getElementById('user-table') as HTMLTableElement;
    const loadButton = document.getElementById('load-data-btn') as HTMLButtonElement;
    const addButton = document.getElementById('add-data-btn') as HTMLButtonElement;
    table.style.display = 'table';
    addButton.style.display = 'inline-block';
    loadButton.textContent = 'Refresh data';
    populateTable();
});

document.getElementById('add-data-btn')?.addEventListener('click', () => {
    addNewRow();
});

function populateTable() {
    const tbody = document.querySelector('#user-table tbody') as HTMLTableSectionElement;
    tbody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.middleName || ''}</td>
            <td>${user.lastName || ''}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.role}</td>
            <td>${user.address || ''}</td>
            <td>${user.createdOn.toLocaleDateString()}</td>
            <td>${user.modifiedOn ? user.modifiedOn.toLocaleDateString() : ''}</td>
            <td>
                <button onclick="editRow(${index})">Edit</button>
                <button onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

(window as any).editRow = (index: number) => {
    const tbody = document.querySelector('#user-table tbody') as HTMLTableSectionElement;
    const row = tbody.children[index] as HTMLTableRowElement;
    row.innerHTML = `
        <td><input type="text" value="${users[index].firstName}" id="firstName-${index}" required></td>
        <td><input type="text" value="${users[index].middleName || ''}" id="middleName-${index}"></td>
        <td><input type="text" value="${users[index].lastName || ''}" id="lastName-${index}"></td>
        <td><input type="email" value="${users[index].email}" id="email-${index}" required></td>
        <td><input type="text" value="${users[index].phoneNumber}" id="phoneNumber-${index}" required></td>
        <td><input type="text" value="${users[index].role}" id="role-${index}" required></td>
        <td><input type="text" value="${users[index].address || ''}" id="address-${index}"></td>
        <td>${users[index].createdOn.toLocaleDateString()}</td>
        <td>${users[index].modifiedOn ? users[index].modifiedOn.toLocaleDateString() : ''}</td>
        <td>
            <button onclick="saveRow(${index})">Save</button>
            <button onclick="cancelEdit(${index})">Cancel</button>
        </td>
    `;
}

(window as any).saveRow = (index: number) => {
    const firstName = (document.getElementById(`firstName-${index}`) as HTMLInputElement).value;
    const middleName = (document.getElementById(`middleName-${index}`) as HTMLInputElement).value;
    const lastName = (document.getElementById(`lastName-${index}`) as HTMLInputElement).value;
    const email = (document.getElementById(`email-${index}`) as HTMLInputElement).value;
    const phoneNumber = (document.getElementById(`phoneNumber-${index}`) as HTMLInputElement).value;
    const role = (document.getElementById(`role-${index}`) as HTMLInputElement).value;
    const address = (document.getElementById(`address-${index}`) as HTMLInputElement).value;

    users[index] = new User(firstName, email, role, users[index].createdOn, middleName, lastName, phoneNumber, address, new Date());
    populateTable();
}

(window as any).cancelEdit = (index: number) => {
    populateTable();
}

(window as any).deleteRow = (index: number) => {
    users.splice(index, 1);
    populateTable();
}

function addNewRow() {
    const tbody = document.querySelector('#user-table tbody') as HTMLTableSectionElement;
    const row = document.createElement('tr');
    const index = users.length;
    row.innerHTML = `
        <td><input type="text" id="new-firstName" required></td>
        <td><input type="text" id="new-middleName"></td>
        <td><input type="text" id="new-lastName"></td>
        <td><input type="email" id="new-email" required></td>
        <td><input type="text" id="new-phoneNumber" required></td>
        <td><input type="text" id="new-role" required></td>
        <td><input type="text" id="new-address"></td>
        <td>${new Date().toLocaleDateString()}</td>
        <td></td>
        <td>
            <button onclick="saveNewRow()">Save</button>
            <button onclick="cancelNewRow()">Cancel</button>
        </td>
    `;
    tbody.appendChild(row);
}

(window as any).saveNewRow = () => {
    const firstName = (document.getElementById('new-firstName') as HTMLInputElement).value;
    const middleName = (document.getElementById('new-middleName') as HTMLInputElement).value;
    const lastName = (document.getElementById('new-lastName') as HTMLInputElement).value;
    const email = (document.getElementById('new-email') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('new-phoneNumber') as HTMLInputElement).value;
    const role = (document.getElementById('new-role') as HTMLInputElement).value;
    const address = (document.getElementById('new-address') as HTMLInputElement).value;

    users.push(new User(firstName, email, role, new Date(), middleName, lastName, phoneNumber, address));
    populateTable();
}

(window as any).cancelNewRow = () => {
    populateTable();
}
