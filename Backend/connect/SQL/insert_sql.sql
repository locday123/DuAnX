USE DuanX;

INSERT INTO ACCOUNT(passAccount, nameAccount, emailAccount, sexAccount, phoneAccount, imagesAccount)
VALUES ('locday123', 'Hoàng Xuân Lộc', 'xuanloc060393@gmail.com', 1, '0374536393','user_S001.jpg');

INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('Điện thoại', 'dien-thoai', NULL, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone', 'iphone', 1, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('Samsung', 'samsung', 1, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Series', '14-series', 2, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Pro Max', '14-pro-max', 4, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Pro', '14-pro', 4, true);


INSERT INTO MENU VALUES (1, 'Tài khoản', 'root', null);
INSERT INTO MENU VALUES (2, 'Tài khoản', '/account', 1);
INSERT INTO MENU VALUES (3, 'Danh mục', 'root', null);
INSERT INTO MENU VALUES (4, 'Danh mục', '/category', 3);
INSERT INTO MENU VALUES (5, 'Sản phẩm', 'root', null);
INSERT INTO MENU VALUES (6, 'Sản phẩm', '/product', 5);
INSERT INTO MENU VALUES (7, 'Dung lượng', '/storage', 5);
INSERT INTO MENU VALUES (8, 'Tiện ích', 'root', null);
INSERT INTO MENU VALUES (9, 'Quản lý file', '/file-manager', 8);


INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(128000,'128GB');

INSERT INTO PRODUCT(nameProduct, urlProduct, priceProduct, priceThrough, metaTitle, metaDescription, productBox, idStorage, idCategory)
VALUES('nameProduct', 'urlProduct', 1000000,11000000, 'metaTitle', 'metaDescription', 'productBox', 1, 1)

