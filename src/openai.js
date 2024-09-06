const getResponse = async (text) => {
    const response = await fetch('http://127.0.0.1:6969/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({msg : text})
    }
    );

    const json = await response.json();
    return json;
}

export default getResponse;
