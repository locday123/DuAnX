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
	CONSTRAINT PRIMARY_KEY_ACCOUNT PRIMARY KEY(idIncrement, idAccount)
);

CREATE TABLE CATEGORY(
	idCategory INTEGER AUTO_INCREMENT,
    nameCategory VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    linkCategory VARCHAR(255) unique,
    rootCategory INTEGER DEFAULT NULL,
    metaTitle VARCHAR(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaDescription VARCHAR(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    statusCategory BOOLEAN, 
    CONSTRAINT KEY_CATEGORY PRIMARY KEY(idCategory),
	CONSTRAINT FOREIGN_KEY_CATEGORY FOREIGN KEY(rootCategory) REFERENCES CATEGORY(idCategory) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE MENU
(
	idMenu INTEGER AUTO_INCREMENT,
	nameMenu VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	linkMenu VARCHAR(255),
	rootMenu INTEGER,
	CONSTRAINT KEY_MENU PRIMARY KEY(idMenu, linkMenu)
);

CREATE TABLE STORAGE
(
	idStorage INTEGER AUTO_INCREMENT,
    spaceStorage INTEGER unique,
    nameSpace VARCHAR(20),
    CONSTRAINT KEY_STORAGE PRIMARY KEY(idStorage)
);

CREATE TABLE PRODUCT
(
	idIncrement INTEGER AUTO_INCREMENT,
	idProduct VARCHAR(15),
    nameProduct VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    linkProduct VARCHAR(255),
    priceProduct INTEGER,
    priceThrough INTEGER,
    imageProduct VARCHAR(255),
    metaTitle VARCHAR(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaDescription VARCHAR(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    productBox VARCHAR(255),
    idStorage INTEGER,
    idCategory INTEGER,
    CONSTRAINT PRIMARY_KEY_PRODUCT PRIMARY KEY(idIncrement, idProduct),
    CONSTRAINT FOREIGN_KEY_OF_PRODUCT_TO_CATEGORY FOREIGN KEY(idCategory) REFERENCES CATEGORY(idCategory),
    CONSTRAINT FOREIGN_KEY_OF_PRODUCT_TO_STORAGE FOREIGN KEY(idStorage) REFERENCES STORAGE(idStorage)
);