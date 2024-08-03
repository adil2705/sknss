const userName = document.getElementById('username');
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const userMessage = document.getElementById('msg');
const messageDisplay = document.querySelector('.messageDisplay');
const submit = document.getElementById('submit');




// send data to the server
function sendToServer(username, email, phone, msg){
const data = {name: username, email: email, phone: phone , msg: msg};
axios.post('contact.php', data).then(response=>{
    messageDisplay.innerHTML = response.data;

    messageDisplay.classList.add('success');
    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';
    userMessage.value = '';
    setTimeout(()=>{
        messageDisplay.innerHTML = '';
        messageDisplay.classList.remove('success');
    }, 3000);
})
}




// validate the Name and Email and Subject fields

const textRegex = /[^a-zA-Z0-9]/;
const phoneRegex = /^\s*[0-9]{10}\s*$/;
const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;



// validate

function validate( username, email, phone, msg){
 if(!username || !email || !phone || !msg){
    addError('Please enter a username & email !');
    return false;
 }

 if(textRegex.test(username)){
    addError('Please enter a valid Name !');
    return false;
 }

 if(!email.match(emailRegex)){
    addError('Please enter a valid email !');
    return false;
 }

//  if (!phoneRegex.test(phone)) {
//     addError('Please enter a valid phone number!');
//     return false;
// }
 
sendToServer(username, email, phone, msg);

}

// add error class
function addError( text){
    messageDisplay.innerHTML = text;
    messageDisplay.classList.add('error');

    setTimeout(()=>{
        messageDisplay.innerHTML = '';
        messageDisplay.classList.remove('error');
    },3000)
}




// triger 

submit.addEventListener('click',()=>{
    const username = userName.value.trim().toLowerCase();
    const email = userEmail.value.trim().toLowerCase();
    const phone = userPhone;
    const msg = userMessage.value.trim().toLowerCase();

     validate(username, email, phone, msg);

})


