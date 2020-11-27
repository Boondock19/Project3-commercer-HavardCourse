document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  const NewEmail = document.querySelector("#compose-form")
  NewEmail.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch('/emails', {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body:  document.querySelector('#compose-body').value,
      }),
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      load_mailbox("sent")
    });
  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  if (mailbox==="inbox") {
    fetch('/emails/inbox')
    .then(response => response.json())
    .then(emails => {
      console.log(emails);
      emails.forEach(function (emails) {
        const email = document.createElement("div");
        email.className="Email";
        email.innerHTML=`<div class="card-body email" id="item-${emails.id}">
        ${emails.sender} this is inbox | ${emails.subject} | ${emails.timestamp}
        </div>`;
        document.querySelector("#emails-view").append(email);
      });
  })
}
    
  if (mailbox==="sent") {
     fetch('/emails/sent')
    .then(response => response.json())
    .then(emails => {
      console.log(emails);
      emails.forEach(function (emails) {
        const email = document.createElement("div");
        email.className="Email";
        email.innerHTML=`<div class="card-body email" id="item-${emails.id}">
        ${emails.recipients} this is sent | ${emails.subject} | ${emails.timestamp}
        </div>`;
        document.querySelector("#emails-view").append(email);
       })
    });
  }
    
  
    
    
    const header5 = document.createElement("h5");
    header5.innerHTML="This is the testing of inbox page ";
    document.querySelector("#emails-view").append(header5);
}

