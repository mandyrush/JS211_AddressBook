// Get 10 users from API
fetch('https://randomuser.me/api/?results=10')
.then(function(response) {
    // Extract the json from the response
    console.log("Response Status: ", response.status);
    return response.json();
}).then(function(json) {
    // Process the json
    console.log("Response Payload: ", json);
    processJson(json);
})

const processJson = (json) => {
    // Sort the json alphabetically
    let sortedJson = json.results.sort((a, b) => {
        let nameA = a.name.last.toLowerCase();
        let nameB = b.name.last.toLowerCase();
        // returns negative number if nameA is before nameB
        // returns positive number if nameB is before nameA
        // returns 0 if both nameA and nameB are the same
        return nameA.localeCompare(nameB);
    })

    // Loop throught the results array and process one contact at a time
    for (let i = 0; i < sortedJson.length; i++) {
        let contact = sortedJson[i];
        processContact(contact);
    }
}

// Process one contact at a time and update the dom with that contacts info
const processContact = (contact) => {
    // Set contact info
    let firstName = contact.name.first;
    let lastName = contact.name.last;
    let contactThumbnail = contact.picture.medium;
    let street = `${contact.location.street.number} ${contact.location.street.name}`;
    let city = contact.location.city;
    let state = contact.location.state;
    let postcode = contact.location.postcode;
    let phone = contact.phone;
    let email = contact.email;
    
    // Get contact list and create list item
    const contactList = document.getElementById('contactList');
    const li = document.createElement('li');

    // Create elements to add to the list item and set their
    // text and attributes
    const h2 = document.createElement('h2');
    h2.innerHTML = `${firstName} ${lastName}`;    

    const img = document.createElement('img');
    img.setAttribute('src', contactThumbnail);

    // Create a paragraph and add the contact info to it
    // Hide the paragraph initially
    const p = document.createElement('p');
    p.innerHTML = `<span class="label">Email:</span> ${email}<br><span class="label">Phone:</span> ${phone}<br>${street}<br>${city}, ${state} ${postcode}`;
    p.classList.add('hide');

    // Set paragraph visible status so we can toggle the button text depending
    // on if we are showing additional info or not
    let showPara = false;

    const button = document.createElement('button'); 
    button.innerHTML = 'View More';
    
    button.addEventListener('click', function () {
        // Every other button click will show/hide the paragraph
        // and change the button text
        p.classList.toggle('hide');
        showPara = !showPara;

        if (showPara) {
            button.innerHTML = 'View Less';
        } else {
            button.innerHTML = 'View More';
        }
    });

    // Add all our new elements to the list item
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(button);

    // Add the list item to the list
    contactList.appendChild(li);
}