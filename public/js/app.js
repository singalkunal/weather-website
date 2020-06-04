const weatherForm = document.querySelector('form')
const input = document.querySelector('input')

const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg2.classList.remove('message')
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + input.value).then((response) => {
        response.json().then((data) => {
            

            if(data.error)
            {
                // msg1.classList.add('message')
                return msg1.textContent = data.error
            }
            
            msg1.textContent = data.location

            msg2.textContent = data.forecast
            // msg2.classList.add('message')
        })
    })
})