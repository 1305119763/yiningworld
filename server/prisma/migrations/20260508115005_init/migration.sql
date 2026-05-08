-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "nativeLanguage" TEXT NOT NULL DEFAULT 'zh',
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastStudyDate" DATETIME
);

-- CreateTable
CREATE TABLE "learning_languages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'A1',
    CONSTRAINT "learning_languages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "learning_progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'A1',
    "vocabLearned" INTEGER NOT NULL DEFAULT 0,
    "vocabTotal" INTEGER NOT NULL DEFAULT 100,
    "masteryRate" REAL NOT NULL DEFAULT 0,
    "grammarCompleted" INTEGER NOT NULL DEFAULT 0,
    "grammarTotal" INTEGER NOT NULL DEFAULT 20,
    "grammarAccuracy" REAL NOT NULL DEFAULT 0,
    "speakingPracticed" INTEGER NOT NULL DEFAULT 0,
    "speakingAvgScore" REAL NOT NULL DEFAULT 0,
    "listeningPracticed" INTEGER NOT NULL DEFAULT 0,
    "listeningAvgScore" REAL NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "learning_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "requirementType" TEXT NOT NULL,
    "requirementValue" INTEGER NOT NULL,
    "xpReward" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user_achievements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "community_groups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "learning_languages_userId_language_key" ON "learning_languages"("userId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "learning_progress_userId_language_key" ON "learning_progress"("userId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "user_achievements_userId_achievementId_key" ON "user_achievements"("userId", "achievementId");
