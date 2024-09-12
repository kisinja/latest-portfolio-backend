const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Initialize DOMPurify with JSDOM to simulate a browser environment for Node.js
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Function to sanitize user input (blog content, etc.)
const sanitizeContent = (dirtyContent) => {
    return purify.sanitize(dirtyContent);
};

module.exports = { sanitizeContent };