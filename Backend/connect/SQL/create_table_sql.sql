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
	phoneAccount VARCHAR(15),
	dateAccount DATE,
    dateAdd DATE DEFAULT (CURRENT_DATE),
    imagesAccount VARCHAR(15),
	UNIQUE (idAccount),
	CONSTRAINT PRIMARY_KEY_ACCOUNT PRIMARY KEY(idIncrement, idAccount)
);

CREATE TABLE CATEGORY(
	idCategory INTEGER AUTO_INCREMENT,
    nameCategory VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    linkCategory VARCHAR(255) unique,
    rootCategory INTEGER DEFAULT NULL,
    levelMenu INTEGER(20) DEFAULT 0,
    parentMenu VARCHAR(20),
    metaTitle VARCHAR(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaDescription VARCHAR(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaKeyword VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    statusCategory BOOLEAN,
    dateAdd DATE DEFAULT (CURRENT_DATE),
    sortingCategory INTEGER,
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
    urlProduct VARCHAR(255) UNIQUE,
    priceProduct INTEGER DEFAULT(0),
    priceThrough INTEGER DEFAULT(0),
    imageProduct VARCHAR(255) DEFAULT("no-images-product.jpg"),
    idStorage INTEGER,
    idCategory INTEGER,
    metaTitle VARCHAR(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaDescription VARCHAR(155) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    metaKeyword VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    productBox VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    shortDescription VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    reviewArticle TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    dateAdd DATE DEFAULT (CURRENT_DATE),
    statusProduct BOOLEAN DEFAULT (0),
    CONSTRAINT PRIMARY_KEY_PRODUCT PRIMARY KEY(idIncrement),
    CONSTRAINT FOREIGN_KEY_OF_PRODUCT_TO_CATEGORY FOREIGN KEY(idCategory) REFERENCES CATEGORY(idCategory),
    CONSTRAINT FOREIGN_KEY_OF_PRODUCT_TO_STORAGE FOREIGN KEY(idStorage) REFERENCES STORAGE(idStorage)
);