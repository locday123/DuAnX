USE DuanX;

INSERT INTO ACCOUNT(passAccount, nameAccount, emailAccount, sexAccount, phoneAccount, imagesAccount)
VALUES ('locday123', 'Hoàng Xuân Lộc', 'xuanloc060393@gmail.com', 1, '0374536393','user_S001.jpg');

INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory) VALUES('Điện thoại', 'dien-thoai', null);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory) VALUES('iPhone', 'iphone', null);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory) VALUES('Samsung', 'samsung', null);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory) VALUES('iPhone 14 Series', '14-series', null);
INSERT INTO CATEGORY(nameCategory, linkCategory, rootCategory) VALUES('iPhone 14 Pro Max', '14-pro-max', null);


INSERT INTO MENU VALUES (1, 'Tài khoản', '/account', null);
INSERT INTO MENU VALUES (2, 'Quản lý tài khoản', '/quan-ly-tai-khoan', 1);
INSERT INTO MENU VALUES (3, 'Thêm tài khoản', '/them-tai-khoan', 1);
INSERT INTO MENU VALUES (4, 'Sản phẩm', '/product', null);
INSERT INTO MENU VALUES (5, 'Quản lý sản phẩm', '/quan-ly-san-pham', 4);
INSERT INTO MENU VALUES (6, 'Quản lý danh mục', '/quan-ly-danh-muc', 4);