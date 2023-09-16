create database DuanX;
USE DuanX;

CREATE TABLE ACCOUNT
(
	idIncrement INTEGER AUTO_INCREMENT,
    idAccount VARCHAR(10),
	passAccount VARCHAR(15),
	nameAccount VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	emailAccount VARCHAR(255),
	sexAccount BOOLEAN,
	phoneAccount VARCHAR(10),
	dateAccount DATE,
    imagesAccount VARCHAR(15),
	UNIQUE (idAccount),
	CONSTRAINT KEY_ACCOUNT PRIMARY KEY(idIncrement, idAccount)
);

CREATE TABLE CATEGORY(
	idCategory INTEGER AUTO_INCREMENT,
    nameCategory VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    linkCategory VARCHAR(255) unique,
    rootCategory INTEGER,
    metaTitle VARCHAR(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaDescription VARCHAR(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    statusCategory BOOLEAN, 
    CONSTRAINT KEY_CATEGORY PRIMARY KEY(idCategory)
);

CREATE TABLE MENU
(
	idMenu INTEGER AUTO_INCREMENT,
	nameMenu VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	linkMenu VARCHAR(255),
	rootMenu INTEGER,
	CONSTRAINT KEY_MENU PRIMARY KEY(idMenu, linkMenu)
);