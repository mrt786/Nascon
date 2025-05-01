const db = require('../startup/db');

const venues = [
  { venue_name: "C-301", capacity: 150, location: "C Block" },
  { venue_name: "C-410", capacity: 120, location: "C Block" },
  { venue_name: "Auditorium", capacity: 300, location: "A Block" },
  { venue_name: "MEDC", capacity: 60, location: "A Block" },
  { venue_name: "CS Lawn", capacity: 500, location: "CS Lawn" },
  { venue_name: "Cricket Ground", capacity: 400, location: "Cricket Ground" },
  { venue_name: "Cafeteria", capacity: 200, location: "Cafeteria" },
  { venue_name: "LRC", capacity: 50, location: "C Block" },
  { venue_name: "DLD Lab", capacity: 40, location: "B Block" },
  { venue_name: "Margalla Lab 1", capacity: 35, location: "C Block" },
  { venue_name: "Karakoram Lab 2", capacity: 35, location: "A Block" },
  { venue_name: "Mehran Lab 3", capacity: 35, location: "A Block" },
];

async function seedVenues() {
  try {
    const [rows] = await db.query('SELECT venue_name FROM venues');
    const existingNames = new Set(rows.map(row => row.venue_name));

    const missingEntries = venues.filter(venue => !existingNames.has(venue.venue_name));

    for (const venue of missingEntries) {
      await db.query(
        'INSERT INTO venues (venue_name, capacity, location) VALUES (?, ?, ?)',
        [venue.venue_name, venue.capacity, venue.location]
      );
    }

    console.log(`[VENUES] Seed complete. ${missingEntries.length} new entries inserted.`);
  } catch (err) {
    console.error('[VENUES] Error during seed:', err);
  }
}

module.exports = seedVenues;
