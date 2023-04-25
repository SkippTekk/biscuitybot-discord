const Guild = require('./models/guild');
const Infraction = require('./models/infraction');
const Logging = require('./models/logging');
const TicketSystem = require('./models/ticket');
//alter adds, force is fresh. don't do force...


Guild.sync({ alter: true });
Infraction.sync({ alter: true });
Logging.sync({ alter: true });
TicketSystem.sync({ alter: true })