function handleSubmit(event) {
    event.preventDefault()

    let url = document.getElementById('url').value

    if (Client.checkURL(url)) {
        console.log(':: Request Made ::')

        postData('http://localhost:8081/articles', { url }).then(function (res) {
            console.log(res)
            document.getElementById('agreement').innerHTML = `Agreement: ${res.agreement}`
            document.getElementById('subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`
            document.getElementById('confidence').innerHTML = `Confidence: ${res.confidence}`
            document.getElementById('irony').innerHTML = `Irony: ${res.irony}`
            document.getElementById('score_tag').innerHTML = `Score Tag: ${res.score_tag}`
        })
    } else {
        alert('Looks like an invalid URL, kindly try again with a valid URL.')
    }
}

// This is starter code
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log('error', error)
    }
}

export { handleSubmit }
