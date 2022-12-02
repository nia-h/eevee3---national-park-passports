-- CreateTable
CREATE TABLE "users" (
    "pk_user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zipcode" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("pk_user_id")
);

-- CreateTable
CREATE TABLE "Park" (
    "pk_park_id" TEXT NOT NULL,
    "park_name" TEXT NOT NULL,
    "park_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Park_pkey" PRIMARY KEY ("pk_park_id")
);

-- CreateTable
CREATE TABLE "visitedPark" (
    "pk_uvp_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "fk_park_id" TEXT NOT NULL,
    "fav" BOOLEAN NOT NULL,

    CONSTRAINT "visitedPark_pkey" PRIMARY KEY ("pk_uvp_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Park_park_name_key" ON "Park"("park_name");

-- CreateIndex
CREATE UNIQUE INDEX "Park_park_code_key" ON "Park"("park_code");

-- AddForeignKey
ALTER TABLE "visitedPark" ADD CONSTRAINT "visitedPark_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("pk_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitedPark" ADD CONSTRAINT "visitedPark_fk_park_id_fkey" FOREIGN KEY ("fk_park_id") REFERENCES "Park"("pk_park_id") ON DELETE RESTRICT ON UPDATE CASCADE;
