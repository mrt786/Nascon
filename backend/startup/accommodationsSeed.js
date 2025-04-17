const db = require('../startup/db');

const accommodations = [
  { location: "A-101", availability: true, capacity: 9, price: 3573 },
  { location: "B-203", availability: true, capacity: 8, price: 3675 },
  { location: "C-315", availability: true, capacity: 10, price: 2596 },
  { location: "A-207", availability: true, capacity: 7, price: 1607 },
  { location: "C-114", availability: true, capacity: 4, price: 1775 },
  { location: "B-103", availability: true, capacity: 2, price: 2496 },
  { location: "A-301", availability: true, capacity: 10, price: 1062 },
  { location: "C-212", availability: true, capacity: 2, price: 1472 },
  { location: "B-305", availability: true, capacity: 2, price: 3112 },
  { location: "A-215", availability: true, capacity: 3, price: 3226 },
  { location: "B-111", availability: true, capacity: 5, price: 3479 },
  { location: "C-213", availability: true, capacity: 3, price: 2459 },
  { location: "A-308", availability: true, capacity: 10, price: 1523 },
  { location: "C-109", availability: true, capacity: 6, price: 1330 },
  { location: "B-201", availability: true, capacity: 3, price: 2488 },
];

async function seedAccommodations() {
  try {
    const [rows] = await db.query('SELECT location FROM accommodations');
    const existingLocations = new Set(rows.map(row => row.location));

    const missingEntries = accommodations.filter(acc => !existingLocations.has(acc.location));

    for (const acc of missingEntries) {
      await db.query(
        'INSERT INTO accommodations (location, availability, capacity, price, booking_count) VALUES (?, ?, ?, ?, ?)',
        [acc.location, acc.availability, acc.capacity, acc.price, 0]
      );
    }

    console.log(`[ACCOMMODATIONS] Seed complete. ${missingEntries.length} new entries inserted.`);
  } catch (err) {
    console.error('[ACCOMMODATIONS] Error during seed:', err);
  }
}

module.exports = seedAccommodations;
