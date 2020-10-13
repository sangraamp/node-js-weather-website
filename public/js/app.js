// Client side JS

const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const successMessage = document.querySelector('#success-message')
const errorMessage = document.querySelector('#error-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevents the default of page refreshing when 
    // form is submitted
    const location = search.value

    errorMessage.textContent = ''
    successMessage.textContent = 'Loading...'

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                successMessage.textContent = ''
                errorMessage.textContent = data.error
                return
            }
            successMessage.innerHTML = data.forecast + '<br><br>' + data.location
        })
    })
})

/* 
innerText returns: "This element has extra spacing and contains a span element."
innerHTML returns: "   This element has extra spacing     and contains <span>a span element</span>."
textContent returns: "   This element has extra spacing    and contains a span element."

The innerText property returns just the text, without spacing and inner element tags.
The innerHTML property returns the text, including all spacing and inner element tags.
The textContent property returns the text with spacing, but without inner element tags. */