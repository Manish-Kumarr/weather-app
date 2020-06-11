const form = document.querySelector('form')
const address = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const tempmin = document.querySelector('#temp-min')
const tempmax = document.querySelector('#temp-max')
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = address.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ' '
    tempmin.textContent=''
    tempmax.textContent=''
    pressure.textContent=''
    humidity.textContent=''


    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
               tempmin.textContent=data.temp_Min
               tempmax.textContent=data.temp_Max
               pressure.textContent=data.pressure
               humidity.textContent=data.humidity
                msg2.textContent = data.temprature
                msg1.textContent = data.location

            }

        })
    })
})