const LOGGING_ENDPOINT = "http://20.207.122.201/evaluation-service/logs";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDM5NSwiaWF0IjoxNzc3Njk5NDk1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZTBhNDNmZDQtOTMzNy00MDY2LWJkODItYTBlOTEzMGRhNjgxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlzaGFrIGoiLCJzdWIiOiI1YmY2OTYyNC03MGNlLTQyNTctODExZC05M2YzNGQ1YzdmOTYifSwiZW1haWwiOiJ2ajcyMzVAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ2aXNoYWsgaiIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE0MCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjViZjY5NjI0LTcwY2UtNDI1Ny04MTFkLTkzZjM0ZDVjN2Y5NiIsImNsaWVudFNlY3JldCI6InpWalhiVGNiRU1XSGJOZW0ifQ.-_3GdwCj30zVPZZBx5YYDN_IB9rBr5dL6sb7p5eHiaU";

export async function Log(stack, level, packageName, message) {
    try {
        const payload = {
            stack,
            level,
            package: packageName,
            message,
            timestamp: new Date().toISOString()
        };

        const response = await fetch(LOGGING_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AUTH_TOKEN}`
            },
            body: JSON.stringify(payload)
        });
    } catch (e) {
    }
}
