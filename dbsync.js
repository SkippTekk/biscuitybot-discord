const Guild = require('./models/guild');
const Infraction = require('./models/infraction');

Guild.sync({ alter: true }); // adds the new data in.
Infraction.sync({ alter: true });