let socket = io ("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const UserName = prompt("Enter your UserName to join");
socket.emit('new-user-joined', UserName);

socket.on('user-joined', (UserName) => {
    append(`${UserName} joined the chat`, 'right');
});

socket.on('receive', (data) => {
    append(`${data.UserName}: ${data.message}`, 'left');
});
socket.on('left', (UserName) => {
    append(`${UserName} left the chat`, 'left');
});