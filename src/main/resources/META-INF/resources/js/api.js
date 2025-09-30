// API Communication Module

class CodeReviewAPI {
    static async reviewCode(code, language, model = 'gpt-5-nano') {
        const response = await fetch('/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language, model })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to analyze code');
        }

        return await response.json();
    }

    static showError(message) {
        // Provide helpful timeout guidance
        if (message.includes('timeout') || message.includes('Failed to fetch')) {
            message += '<br><br>💡 <strong>Tip:</strong> Complex code analysis can take up to 30 seconds. Please try again or simplify your code sample.';
        }
        
        const output = document.getElementById('output');
        output.innerHTML = `<div class="error">${message}</div>`;
    }
}

window.CodeReviewAPI = CodeReviewAPI;