const insertUpdateBtn = document.getElementById("btnInsertUpdate");
const clearRecordsBtn = document.getElementById("btnClearRecords");
const clearFieldsBtn = document.getElementById("btnClearFields");
const saveBtn = document.getElementById("btnSaveData");
const tableRecords = document.getElementById("tableRecords");
const sortCriteriaDropdown = document.getElementById("sortCriteriaDropdown");
const sortOrderDropdown = document.getElementById("sortOrderDropdown");

let recordsArray = JSON.parse(localStorage.getItem('records')) || [];

const tableHeaderLabels = ["First Name", "Middle Name", "Last Name", "Age", "Action"];

iterateRecords();

if (recordsArray.length === 0) {
    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";
} else {
    document.getElementById("status").style.display = "none";
}

insertUpdateBtn.addEventListener("click", () => {
    const inputFields = document.getElementsByTagName("input");

    if(insertUpdateBtn.value === "insert") {
        for(const field of inputFields) {
            if(field.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }

        let record = {
            firstName: inputFields[0].value.trim(),
            middleName: inputFields[1].value.trim(),
            lastName: inputFields[2].value.trim(),
            age:   parseInt(inputFields[3].value.trim())      
        };
    
        for(const field of inputFields) {
            field.value = "";
        }
      
        recordsArray.push(record);

        sortAndDisplayRecords();
        iterateRecords();
    } else {
        for(const field of inputFields) {
            if(field.value.trim() === "") {
                alert("Please complete all the text inputs!");
                return;
            }
        }
        recordsArray[parseInt(insertUpdateBtn.value)].firstName = inputFields[0].value.trim();
        recordsArray[parseInt(insertUpdateBtn.value)].middleName = inputFields[1].value.trim();
        recordsArray[parseInt(insertUpdateBtn.value)].lastName = inputFields[2].value.trim();
        recordsArray[parseInt(insertUpdateBtn.value)].age = parseInt(inputFields[3].value.trim());
        
        iterateRecords();

        for(const field of inputFields) {
            field.value = "";
        }

        insertUpdateBtn.innerHTML = "Insert";
        insertUpdateBtn.value = "insert";
    }
});

clearFieldsBtn.addEventListener("click", () => {
    const inputFields = document.getElementsByTagName("input");

    for(const field of inputFields) {
        field.value = "";
    }

    insertUpdateBtn.innerHTML = "Insert";
    insertUpdateBtn.value = "insert";
});

clearRecordsBtn.addEventListener("click", () => {
    recordsArray = [];
    localStorage.clear();

    while(tableRecords.hasChildNodes()) {
        tableRecords.removeChild(tableRecords.firstChild);
    }

    document.getElementById("status").style.display = "inline";
    document.getElementById("status").innerHTML = "No Records...";

    insertUpdateBtn.innerHTML = "Insert";
    insertUpdateBtn.value = "insert";

});

saveBtn.addEventListener("click", () => {
    localStorage.setItem('records', JSON.stringify(recordsArray));
});

sortCriteriaDropdown.addEventListener("click", () => {
    sortAndDisplayRecords();
});

sortOrderDropdown.addEventListener("click", () => {
    sortAndDisplayRecords();
});

function sortAndDisplayRecords() {
    const sortCriteria = sortCriteriaDropdown.value;
    const sortOrder = sortOrderDropdown.value;
    if (sortCriteria && sortOrder) {
        sortRecords(sortCriteria, sortOrder);
        iterateRecords();
    }
}

function sortRecords(criteria, order) {
    recordsArray.sort((a, b) => {
        const valueA = a[criteria];
        const valueB = b[criteria];
        if (order === "asc") {
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        } else if (order === "desc") {
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
            return 0;
        }
    });
}

function iterateRecords() {
    while (tableRecords.hasChildNodes()) {
        tableRecords.removeChild(tableRecords.firstChild);
    }

    if (recordsArray.length > 0) {
        document.getElementById("status").style.display = "none";

        const tableHeaderRow = document.createElement("tr");
        const tableHeader = document.createElement("thead");
        tableHeaderRow.style.borderTop = "1px solid black";
        tableHeaderRow.style.borderBottom = "1px solid black";

        for (let i = 0; i < 5; i++) {
            const tableHeaderCell = document.createElement("th");
            tableHeaderCell.style.padding = "5px";

            if (i !== 4) {
                tableHeaderCell.style.borderRight = "1px solid black";
            }

            tableHeaderCell.innerHTML = tableHeaderLabels[i];
            tableHeaderRow.appendChild(tableHeaderCell);
        }

        tableHeader.appendChild(tableHeaderRow);
        tableRecords.appendChild(tableHeader);

        const tableBody = document.createElement("tbody");

        recordsArray.forEach((rec, i) => {

            const tableRow = document.createElement("tr");
            const firstNameCell = document.createElement("td");
            const middleNameCell = document.createElement("td");
            const lastNameCell = document.createElement("td");
            const ageCell = document.createElement("td");
            const actionBtnCell = document.createElement("td");
            const deleteBtn = document.createElement("button");
            const updateBtn = document.createElement("button");

            firstNameCell.style.borderRight = "1px solid black";
            firstNameCell.style.padding = "10px";

            middleNameCell.style.borderRight = "1px solid black";
            middleNameCell.style.padding = "10px";

            lastNameCell.style.borderRight = "1px solid black";
            lastNameCell.style.padding = "10px";

            ageCell.style.borderRight = "1px solid black";
            ageCell.style.padding = "10px";

            actionBtnCell.style.padding = "10px";

            tableRow.style.borderBottom = "1px solid black";

            firstNameCell.innerHTML = rec.firstName;
            middleNameCell.innerHTML = rec.middleName;
            lastNameCell.innerHTML = rec.lastName;
            ageCell.innerHTML = rec.age;

            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("onclick", `deleteData(${i})`);
            deleteBtn.style.marginRight = "5px";

            updateBtn.innerHTML = "Edit";
            updateBtn.setAttribute("value", "update");
            updateBtn.setAttribute("onclick", `updateData(${i})`);
            updateBtn.style.marginRight = "5px";

            actionBtnCell.appendChild(deleteBtn);
            actionBtnCell.appendChild(updateBtn);

            tableRow.appendChild(firstNameCell);
            tableRow.appendChild(middleNameCell);
            tableRow.appendChild(lastNameCell);
            tableRow.appendChild(ageCell);
            tableRow.appendChild(actionBtnCell);

            tableBody.appendChild(tableRow);
        });

        tableRecords.appendChild(tableBody);

    } else {
        document.getElementById("status").style.display = "inline";
        document.getElementById("status").innerHTML = "No Records...";
    }
}

function deleteData(index) {
    recordsArray.splice(index, 1);
    iterateRecords();
}

function updateData(index) {
    const inputFields = document.getElementsByTagName("input");

    inputFields[0].value = recordsArray[index].firstName;
    inputFields[1].value = recordsArray[index].middleName;
    inputFields[2].value = recordsArray[index].lastName;
    inputFields[3].value = recordsArray[index].age;

    insertUpdateBtn.innerHTML = "Update";
    insertUpdateBtn.value = `${index}`;
}
