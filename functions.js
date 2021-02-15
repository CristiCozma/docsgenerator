const API = {
    CREATE: {
        URL: "http://localhost:3000/docsgenerator/create",
        METHOD: "POST"
    },
    READ: {
        URL: "http://localhost:3000/docsgenerator",
        METHOD: "GET"
    }
};

console.log("test script");

function insertPersons(persons) {
    const tbody = document.querySelector('#list tbody');
    tbody.innerHTML = getPersonsHtml(persons);
}

function getPersonsHtml(persons) {
    return persons.map(getPersonHtml).join("");
}

function getPersonHtml(person) {
    const cnp = person.cnp;
    const firstName = person.firstName;
    const lastName = person.lastName;
    return `<tr>
        <td>${person.cnp}</td>
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
    </tr>`;
}

function loadList() {
    fetch(API.READ.URL)
        .then(res => res.json())
        .then(data => {
            allPersons = data;
            insertPersons(data);
        });
}

loadList();



function searchPersons(text) {
    console.warn("search", text, allPersons);
    return allPersons.filter(person => {
        return person.cnp.indexOf(text) > -1;
    });
}

function addEventListner() {
    const search = document.querySelector('#search');
    search.addEventListener("input", e => {
        const text = e.target.value;
        const filtrate = searchPersons(text);
        insertPersons(filtrate);
    });
}

addEventListner();
