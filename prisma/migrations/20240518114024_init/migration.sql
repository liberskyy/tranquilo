-- CreateTable
CREATE TABLE "Grants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "grantId" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "scope" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "emailBody" TEXT NOT NULL,
    "folders" TEXT,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL,
    "grantId" TEXT NOT NULL
);
