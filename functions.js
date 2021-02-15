/*const API {
    CREATE: {
        URL: "http://localhost:3000/docsgenerator-json/create",
        METHOD: "POST"
    },
    READ: {
        URL: "http://localhost:3000/docsgenerator-json",
        METHOD: "GET"
    }
};
*/

console.log("test script");

function insertPersons(persons) {
    const tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml(persons) {
    return getPersonHtml(persons[1]) + getPersonHtml(persons[0]) + getPersonHtml(persons[2]);
}

function getPersonHtml(person) {
    return `<tr>
        <td>${person.cnp}</td>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
    </tr>`;
}

fetch('persons.json')
    .then(res => res.json())
    .then(data => {
        insertPersons(data);
    });
