const Guild = require('./models/guild');
const TicketSystem = require('./models/ticket');
const Infraction = require('./models/infraction');
const Level = require('./models/level');
//alter adds, force is fresh. don't do force...


//Guild.sync({ alter: true });
//TicketSystem.sync({ alter: true })
//Infraction.sync({ alter: true });
Level.sync({ alter: true })