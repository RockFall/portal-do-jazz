-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "instagramUrl" TEXT,
    "websiteUrl" TEXT,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "instagramUrl" TEXT,
    "bio" TEXT,
    "genres" TEXT NOT NULL DEFAULT 'jazz',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME,
    "venueId" TEXT NOT NULL,
    "priceMin" REAL,
    "priceMax" REAL,
    "ticketUrl" TEXT,
    "sourceUrl" TEXT,
    "imageUrl" TEXT,
    "confidenceScore" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventArtist" (
    "eventId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    PRIMARY KEY ("eventId", "artistId"),
    CONSTRAINT "EventArtist_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EventEvidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "rawText" TEXT,
    "sourceUrl" TEXT,
    "collectedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventEvidence_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'news',
    "sourceUrl" TEXT,
    "imageUrl" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
