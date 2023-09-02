create database DuanX;
USE DuanX;

CREATE TABLE ACCOUNT
(
	idIncrement INT AUTO_INCREMENT,
    idAccount VARCHAR(10),
	passAccount VARCHAR(15),
	nameAccount NVARCHAR(255),
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
    linkCategory VARCHAR(255),
    rootCategory INTEGER,
    CONSTRAINT KEY_CATEGORY PRIMARY KEY(idCategory)
);

CREATE TABLE MENU
(
	idMenu INTEGER,
	nameMenu NVARCHAR(255),
	linkMenu VARCHAR(255),
	rootMenu INTEGER,
	CONSTRAINT KEY_MENU PRIMARY KEY(idMenu, linkMenu)
);