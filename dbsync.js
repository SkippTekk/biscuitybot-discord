const Guild = require('./models/guild');
const Infraction = require('./models/infraction');
const Logging = require('./models/logging');
const TicketSystem = require('./models/ticket');
//alter adds, force is fresh. don't do force...


Guild.sync({ force: true });
Infraction.sync({ force: true });
Logging.sync({ force: true });
TicketSystem.sync({ force: true })