document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('captcha-form');
    const verifyButton = document.getElementById('verify-button');
    let environmentalData = {
        keystrokes: [],
        mouseMovements: [],
        deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        },
        timestamps: {
            pageLoad: Date.now()
        }
    };

    // Capture keystrokes
    form.addEventListener('keydown', (event) => {
        environmentalData.keystrokes.push({
            key: event.key,
            time: Date.now()
        });
    });

    // Capture mouse movements
    form.addEventListener('mousemove', (event) => {
        environmentalData.mouseMovements.push({
            x: event.clientX,
            y: event.clientY,
            time: Date.now()
        });
    });

    // Simulate verification process
    verifyButton.addEventListener('click', () => {
        environmentalData.timestamps.verificationStart = Date.now();
        sendToAPI(environmentalData);
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        environmentalData.timestamps.formSubmit = Date.now();
        sendToAPI(environmentalData);
        alert('Form submitted for verification!');
    });

    // Send data to API
    function sendToAPI(data) {
        fetch('https://example.com/api/verify', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
