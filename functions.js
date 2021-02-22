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

fetch(API.READ.URL + "/person?cnp=2901112265544")


function searchPersons(cnp) {
    console.warn("search", cnp, allPersons);
    return allPersons.filter(function (p) {
        return p.cnp.indexOf(cnp) > -1;
    });
}


function addPerson() {
    const cnp = document.querySelector("input[name=cnp]").value;
    const firstName = document.querySelector("input[name=firstName]").value;
    const lastName = document.querySelector("input[name=lastName]").value;

    const person = {
        cnp,
        firstName,
        lastName
    };
    console.info("Saving...", person, JSON.stringify(person));

    fetch(API.CREATE.URL, {
        method: API.CREATE.METHOD,
        headers: {
            "Content-Type": "application/json"
        },
        body: API.CREATE.METHOD === "GET" ? null : JSON.stringify(person)
    })
        .then(res => res.json())
        .then(r => {
            if (r.success) {
                loadList();
            }
        });
}

function addEventListner() {
    const search = document.getElementById('search');
    search.addEventListener("input", e => {
        const cnp = e.target.value;
        const foundPerson = searchPersons(cnp);
        insertPersons(foundPerson);
    });

    const saveBtn = document.querySelector('#list tfoot button');
    saveBtn.addEventListener("click", addPerson);
}

addEventListner();

