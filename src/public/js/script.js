document.addEventListener('DOMContentLoaded', async () => {
    const login = document.getElementById('login-container');
    const anon = document.getElementById('anon-container');
    const logged = document.getElementById('logged-container');

    const handleResponse = (statusCode) => {
        if (statusCode === 401) {
            // user is not logged in
            login.style.display = 'block';
            anon.style.display = 'none';
            logged.style.display = 'none';
            return;
        } else if (statusCode === 403) {
            // we detected something fishy here
            anon.style.display = 'block';
            logged.style.display = 'none';
            login.style.display = 'none';
            return;
        } else if (statusCode === 200 || statusCode === 204) {
            // everything is fine, we have the user data
            logged.style.display = 'block';
            anon.style.display = 'none';
            login.style.display = 'none';
        } else {
            // something very weird happened, congratulations !
            anon.style.display = 'block';
            logged.style.display = 'none';
            login.style.display = 'none';
        }
    };

    // hide everything
    login.style.display = 'none';
    anon.style.display = 'none';
    logged.style.display = 'none';

    // prevent form from submitting
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });

    // login button
    document.getElementById('login-button').addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        handleResponse(response.status);
    });


    // get data from server
    const authDetails = await fetch('/api/me');
    handleResponse(authDetails.status);

});

