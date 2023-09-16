USE DuanX;

DELIMITER //
CREATE PROCEDURE deleteChildCategory(IN idCategory INTEGER)
BEGIN
	UPDATE Category
	SET nameCategory = "null"
	WHERE idCategory in (Select idCategory from (SELECT idCategory from Category where rootCategory = idCategory) as t );
END; //
DELIMITER ;