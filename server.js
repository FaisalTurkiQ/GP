const app = require('./app.js')

// Database configuration
require('./config/db');

app.listen(process.env.PORT, () => {
    console.log(`API is listening on port ${process.env.PORT}`);
});
