// middleware.js

exports.setPageVariables = (req, res, next) => {
    // Determine if user is Authenticated
    res.locals.isAuthenticated = req.isAuthenticated();

    // Determine if user is on the home page
    res.locals.isHomePage = req.path === '/';

    next();
}

// Add a new middleware function for setting the CSP header
exports.setCSPHeader = (req, res, next) => {
    // Customize your CSP policy here
    const cspHeader = "script-src 'self' 'unsafe-inline' localhost:3000 cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' localhost:3000 cdn.jsdelivr.net";

    res.setHeader('Content-Security-Policy', cspHeader);

    next();
}
