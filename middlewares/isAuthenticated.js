// middlewares/isAuthenticated.js
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { // Assuming `isAuthenticated` is a method that checks login status
        next(); // Proceed to the next middleware/route handler
    } else {
        // User is not logged in. Redirect or send an error
        res.status(401).json({ message :'You must be logged in to access this resource.'});
    }
}

module.exports = isLoggedIn;
