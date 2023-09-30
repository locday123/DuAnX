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
INSERT INTO MENU VALUES (2, 'Quản lý tài khoản', '/account', 1);
INSERT INTO MENU VALUES (3, 'Danh mục', 'root', null);
INSERT INTO MENU VALUES (4, 'Quản lý danh mục', '/category', 3);
INSERT INTO MENU VALUES (5, 'Sản phẩm', 'root', null);
INSERT INTO MENU VALUES (6, 'Quản lý sản phẩm', '/product', 5);
INSERT INTO MENU VALUES (7, 'Quản lý thông tin', '/storage', 5);

INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(128000,'128GB');

INSERT INTO PRODUCT(nameProduct, linkProduct, priceProduct, imageProduct, productBox, idStorage, idCategory)
VALUES('nameProduct', 'linkProduct', 1000000, 'imageProduct', 'productBox', 1, 1)

