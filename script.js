const socket = io('http://localhost:3000', { transports : ['websocket'] })
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const nameUser = prompt('What is you name?')
socket.emit('new-user', nameUser)

socket.on('chat-message', data => {
    appendMessage(`${data.name} > ${data.message}`)
})

socket.on('user-connected', nameUser => {
    appendMessage(`${String(nameUser)} connected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}