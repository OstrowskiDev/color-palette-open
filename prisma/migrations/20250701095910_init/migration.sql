-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palette" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseHue" INTEGER NOT NULL,
    "hueOffsetName" TEXT NOT NULL,
    "presetSLName" TEXT NOT NULL,
    "colorSetNames" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Palette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HueOffset" (
    "name" TEXT NOT NULL,
    "angle" INTEGER[],

    CONSTRAINT "HueOffset_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PresetSL" (
    "name" TEXT NOT NULL,
    "sat" INTEGER NOT NULL,
    "lightRange" INTEGER[],

    CONSTRAINT "PresetSL_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Palette_userId_name_key" ON "Palette"("userId", "name");

-- AddForeignKey
ALTER TABLE "Palette" ADD CONSTRAINT "Palette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palette" ADD CONSTRAINT "Palette_hueOffsetName_fkey" FOREIGN KEY ("hueOffsetName") REFERENCES "HueOffset"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palette" ADD CONSTRAINT "Palette_presetSLName_fkey" FOREIGN KEY ("presetSLName") REFERENCES "PresetSL"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
