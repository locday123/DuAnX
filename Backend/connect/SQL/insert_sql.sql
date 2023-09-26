USE DuanX;

INSERT INTO ACCOUNT(passAccount, nameAccount, emailAccount, sexAccount, phoneAccount, imagesAccount)
VALUES ('locday123', 'Hoàng Xuân Lộc', 'xuanloc060393@gmail.com', 1, '0374536393','user_S001.jpg');

INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('Điện thoại', 'dien-thoai', NULL, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone', 'iphone', 1, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('Samsung', 'samsung', 1, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Series', '14-series', 2, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Pro Max', '14-pro-max', 4, true);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory, statusCategory) VALUES('iPhone 14 Pro', '14-pro', 4, true);


INSERT INTO MENU VALUES (1, 'Tài khoản', '/account', null);
INSERT INTO MENU VALUES (2, 'Quản lý tài khoản', '/quan-ly-tai-khoan', 1);
INSERT INTO MENU VALUES (3, 'Thêm tài khoản', '/them-tai-khoan', 1);
INSERT INTO MENU VALUES (4, 'Danh mục', '/category', null);
INSERT INTO MENU VALUES (5, 'Quản lý danh mục', '/category', 4);

INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(128000,'128GB');
INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(256000,'256GB');
INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(1000000,'1TB');
INSERT INTO STORAGE(spaceStorage, nameSpace) VALUES(2000000,'2TB');

INSERT INTO PRODUCT(nameProduct, linkProduct, priceProduct, imageProduct, productBox, idStorage, idCategory)
VALUES('nameProduct', 'linkProduct', 1000000, 'imageProduct', 'productBox', 1, 1)

