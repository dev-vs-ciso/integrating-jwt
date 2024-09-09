// File: public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const messageDiv = document.getElementById('message');
    const generateJwtForm = document.getElementById('generateJwtForm');
    const jwtResult = document.getElementById('jwtResult');

    // Function to fetch the hello message from the API
    async function fetchHelloMessage() {
        try {
            const response = await fetch('/api/hello');
            const data = await response.json();
            messageDiv.textContent = data.message;
        } catch (error) {
            messageDiv.textContent = 'Error fetching message from API';
            console.error('Error:', error);
        }
    }

    // Function to generate JWT
    async function generateJwt(payload) {
        try {
            const response = await fetch('/api/generate-jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Error generating JWT:', error);
            return null;
        }
    }

    // Fetch hello message when page loads
    fetchHelloMessage();

    // Handle form submission for JWT generation
    generateJwtForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        const payload = {
            name: nameInput.value,
            email: emailInput.value,
        };

        const token = await generateJwt(payload);
        if (token) {
            jwtResult.textContent = `Generated JWT: ${token}`;
        } else {
            jwtResult.textContent = 'Failed to generate JWT';
        }
    });
});