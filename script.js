// Auth Logic
function auth() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    // Credentials strictly as requested
    if (user === "zamxs" && pass === "bokep") {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-hub').classList.remove('hidden');
    } else {
        alert("ACCESS DENIED. WRONG KEY.");
    }
}

// REAL QR Generator (Bisa di-scan)
function generateQR() {
    const qrDiv = document.getElementById('qr-result');
    const text = document.getElementById('qr-text').value;
    qrDiv.innerHTML = ""; // Clear old QR
    
    if(text.trim() !== "") {
        new QRCode(qrDiv, {
            text: text,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
    }
}

// Source Fetcher Logic
async function fetchSource() {
    const url = document.getElementById('target-url').value;
    const status = document.getElementById('status-fetch');
    
    status.innerText = "INITIALIZING BREACH...";
    
    try {
        // Menggunakan Proxy CORS agar bisa fetch di browser
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.contents) {
            // Otomatis download file berisi source code target
            const blob = new Blob([data.contents], { type: 'text/html' });
            const el = document.createElement('a');
            el.href = URL.createObjectURL(blob);
            el.download = "stolen_source.html";
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
            status.innerText = "SUCCESS: SOURCE EXTRACTED!";
        }
    } catch (e) {
        status.innerText = "ERROR: TARGET SECURED (CORS BLOCK)";
    }
}
