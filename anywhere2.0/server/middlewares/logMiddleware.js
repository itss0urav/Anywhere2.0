// logMiddleware.js

// Array to store logs
let logs = [];

// Middleware function to log request and response details
const logMiddleware = (req, res, next) => {
  // Object to store log details
  const log = {
    requestCode: `${req.method} ${req.originalUrl}`, // Request method and URL
    responseCode: null, // Will be populated with response status code
    message: null // Will be populated with response message
  };

  // Override res.send() to capture response body
  const originalSend = res.send;
  res.send = function(body) {
    res.locals.body = body; // Store response body in res.locals
    return originalSend.call(this, body);
  };

  // Event listener for when response is finished
  res.on('finish', () => {
    log.responseCode = res.statusCode; // Populate response status code
    const responseBody = JSON.parse(res.locals.body || '{}'); // Parse response body
    log.message = responseBody.message || ''; // Populate response message

    // If logs array has reached its maximum size, remove the oldest log
    if (logs.length >= 30) {
      logs.shift();
    }

    // Push the log object into logs array
    logs.push(log);
  });

  next(); // Call next middleware
};

// Route handler to get logs
const getLogs = (req, res) => {
  res.json(logs); // Send logs array as JSON response
};

// Export middleware and route handler
module.exports = { logMiddleware, getLogs };
