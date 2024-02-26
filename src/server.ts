require('dotenv').config();
const routesEntry = require('./routes/routes');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.use('/', routesEntry);

app.listen(PORT, () => console.log(`Server is up on: http://localhost:${PORT}`));
