CREATE TABLE qr_events (
id TEXT PRIMARY KEY NOT NULL,
title TEXT NOT NULL, place TEXT NOT NULL,
latitude REAL NOT NULL, longitude REAL NOT NULL, radius REAL NOT NULL,
starts_at INTEGER NOT NULL, ends_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
token TEXT NOT NULL, owner_hash TEXT NOT NULL,
closed INTEGER NOT NULL DEFAULT 0, created_at INTEGER NOT NULL
);
--> statement-breakpoint
CREATE TABLE qr_attendance (
event_id TEXT NOT NULL REFERENCES qr_events(id),
member_id INTEGER NOT NULL, member_name TEXT NOT NULL,
checked_at INTEGER NOT NULL, distance_m REAL NOT NULL, accuracy_m REAL NOT NULL,
PRIMARY KEY (event_id, member_id)
);