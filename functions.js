const API = {
    CREATE: {
        URL: "http://localhost:3000/docsgenerator/create",
        METHOD: "POST"
    },
    READ: {
        URL: "http://localhost:3000/docsgenerator",
        METHOD: "GET"
    },
    GET: {
        URL: "http://localhost:3000/docsgenerator/person",
        METHOD: "GET"
    }
};

if (location.host === "cristicozma.github.io") {
    API.READ.URL = "persons2.json";
}

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

let currentPerson;

function inputValue(person) {
    console.info(Object.keys(person));
    Object.keys(person).forEach(key => {
        console.warn('key', key);
        const input = document.querySelector(`input[name=${key}]`);
        if (input) {
            input.value = person[key];
        }

    })
}

function getPerson(cnp) {
    fetch(API.GET.URL + `?cnp=${cnp}`)
        .then(res => res.json())
        .then(persons => {
            const person = persons[0];
            console.log(person);
            currentPerson = person;
            if (person) {
                inputValue(person);
            } else {
                document.querySelector('input[name=cnp]').value = cnp;
            }
        });
}


function searchPersons(cnp) {
    console.warn("search", cnp, allPersons);
    if (location.host === "cristicozma.github.io") {
        API.READ.URL = "persons2.json";
    }
    return allPersons.filter(function (p) {
        return p.cnp.indexOf(cnp) > -1;
    });
}


function addPerson() {
    const person = Array.from(document.querySelectorAll(`input[name]`)).reduce((person, input) => {
        person[input.name] = input.value;
        return person;
    }, {});
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
    const print = document.getElementById('print-button');
    print.addEventListener("click", e => {
        printAndSave();
    });
}

addEventListner();

const searchInput = document.getElementById("search");
const okButton = document.getElementById("submit-button");
okButton.addEventListener("click", () => {
    getPerson(searchInput.value);
});

function printAndSave() {
    if (currentPerson) {
        console.info("da");
        updatePerson();
    }
    else {
        console.info("nu");
        addPerson();
    }
    window.print();
}



// todo
// - click on "Print"
//   - if (crrentPerson) { update() } else { create() }
//   - window.print() (https://github.com/nmatei/simple-quiz-app/blob/master/src/utilities.ts)

// css for print:
// https://github.com/nmatei/simple-quiz-app/blob/master/public/index.html
//  see css/print.css
// hide header and side-bar