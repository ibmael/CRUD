// get the js inputs
var contactNameInput = document.getElementById("contactName");
var contactPhoneInput = document.getElementById("contactPhone");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");
var contactNotesInput = document.getElementById("contactNotes");
var contactGroupInput = document.getElementById("contactGroup");
var favInput = document.getElementById("fav");
var emergencyInput = document.getElementById("emergency");
// get the search input
var searchInput = document.getElementById("searchInput");

// get the modal
var contactModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop")
);

// get the js buttons
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

// display
var contactsDisplay = document.getElementById("contactsDisplay");

// array to store the data and to push new data
var contactList = [];
var globalIndex;

// if the local storage is not empty and has the key of 'Contacts Storage' display the contacts
if (localStorage.getItem("Contacts Storage") != null) {
  contactList = JSON.parse(localStorage.getItem("Contacts Storage"));
  displayContacts();
}

// add contact function
function addContact() {
  var name = contactNameInput.value.trim();
  var phone = contactPhoneInput.value.trim();

  contactNameInput.style.border = "";
  contactPhoneInput.style.border = "";

  var valid = true;

  if (name === "") {
    contactNameInput.style.border = "2px solid red";
    valid = false;
  }

  if (phone === "") {
    contactPhoneInput.style.border = "2px solid red";
    valid = false;
  }

  if (!valid) return;

  var contactObj = {
    contactName: contactNameInput.value,
    contactPhone: contactPhoneInput.value,
    contactEmail: contactEmailInput.value,
    contactAddress: contactAddressInput.value,
    contactGroup: contactGroupInput.value,
    contactNotes: contactNotesInput.value,
    favorite: favInput.checked,
    emergency: emergencyInput.checked,
  };

  // push the new contact to the array
  contactList.push(contactObj);
  // set localStorage ( setup the local storage ) || save the array to the local storage
  localStorage.setItem("Contacts Storage", JSON.stringify(contactList));
  // clear the form
  clearForm();
  // display the contacts
  displayContacts();
}

// clear values function || reset the form
function clearForm() {
  contactNameInput.value = "";
  contactPhoneInput.value = "";
  contactEmailInput.value = "";
  contactAddressInput.value = "";
  contactNotesInput.value = "";
  contactGroupInput.value = "";
  favInput.checked = false;
  emergencyInput.checked = false;
}

function displayContacts(list = contactList) {
  var box = "";

  for (var i = 0; i < list.length; i++) {
    box += `
      <div class="col-md-6">
        <div class="stat-card h-100">
          
          <h6 class="fw-bold mb-1">${list[i].contactName}</h6>
          <p class="m-0">${list[i].contactPhone}</p>

          ${
            list[i].contactEmail
              ? `<small class="d-block text-muted">${list[i].contactEmail}</small>`
              : ""
          }

          ${
            list[i].contactAddress
              ? `<small class="d-block mt-1">
                <i class="fa-solid fa-location-dot me-1"></i>
                ${list[i].contactAddress}
               </small>`
              : ""
          }

          ${
            list[i].contactNotes
              ? `<p class="mt-2 small text-secondary">
                ${list[i].contactNotes}
               </p>`
              : ""
          }

          <div class="mt-2">
            <span class="badge bg-info">${list[i].contactGroup}</span>
            ${
              list[i].favorite
                ? '<span class="badge bg-warning ms-1">Fav</span>'
                : ""
            }
            ${
              list[i].emergency
                ? '<span class="badge bg-danger ms-1">Emergency</span>'
                : ""
            }
          </div>

          <div class="mt-3 d-flex gap-2">
            <button class="btn btn-sm btn-danger" onclick="deleteContact(${i})">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-sm btn-primary" onclick="editContact(${i})">
              <i class="fa-solid fa-pen"></i>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  contactsDisplay.innerHTML = box;

  // empty state change
  if (contactList.length === 0) {
    document.getElementById("emptyState").classList.remove("d-none");
  } else {
    document.getElementById("emptyState").classList.add("d-none");
  }
}

// delete contact function
function deleteContact(index) {
  contactList.splice(index, 1);
  localStorage.setItem("Contacts Storage", JSON.stringify(contactList));
  displayContacts();
}

// edit contact function
function editContact(index) {
  globalIndex = index;

  contactNameInput.value = contactList[index].contactName;
  contactPhoneInput.value = contactList[index].contactPhone;
  contactEmailInput.value = contactList[index].contactEmail;
  contactAddressInput.value = contactList[index].contactAddress;
  contactGroupInput.value = contactList[index].contactGroup;
  contactNotesInput.value = contactList[index].contactNotes;
  favInput.checked = contactList[index].favorite;
  emergencyInput.checked = contactList[index].emergency;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  contactModal.show();
}

function updateContact() {
   var name = contactNameInput.value.trim();
  var phone = contactPhoneInput.value.trim();

  contactNameInput.style.border = "";
  contactPhoneInput.style.border = "";

  var valid = true;

  if (name === "") {
    contactNameInput.style.border = "2px solid red";
    valid = false;
  }

  if (phone === "") {
    contactPhoneInput.style.border = "2px solid red";
    valid = false;
  }

  if (!valid) return; 

  contactList[globalIndex] = {
    contactName: contactNameInput.value,
    contactPhone: contactPhoneInput.value,
    contactEmail: contactEmailInput.value,
    contactAddress: contactAddressInput.value,
    contactGroup: contactGroupInput.value,
    contactNotes: contactNotesInput.value,
    favorite: favInput.checked,
    emergency: emergencyInput.checked,
  };

  localStorage.setItem("Contacts Storage", JSON.stringify(contactList));
  displayContacts();
  clearForm();

  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  contactModal.hide();
}

// reset to add mode function
function resetToAddMode() {
  clearForm();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

// search function
function searchContact() {
  var searchArr = [];
  var term = searchInput.value.trim().toLowerCase();

  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].contactName.toLowerCase().includes(term)) {
      searchArr.push(contactList[i]);
    }
  }

  displayContacts(searchArr);
}
