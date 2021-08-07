console.log('Loading main.js');

fetch('https://randomuser.me/api/?results=10')
.then(function(response) {
    // extract the json from the response
    console.log("Response Status: ", response.status);
    return response.json();
}).then(function(json) {
    // do something with the json payload
    console.log("Response Payload: ", json);
    processJson(json);
})

let processJson = (json) => {
    // Loop throught the results array and process one contact at a time
    for (let i = 0; i < json.results.length; i++) {
        let contact = json.results[i];
        processContact(contact);
    }
}

// process one contact at a time and update the dom with that contacts info
let processContact = (contact) => {
    let firstName = contact.name.first;
    let lastName = contact.name.last;
    let email = contact.email;
    let city = contact.location.city;
}