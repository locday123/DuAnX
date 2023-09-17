USE DuanX;

CREATE TRIGGER idAccount_Increment BEFORE INSERT ON ACCOUNT
FOR EACH ROW
SET NEW.idAccount = CONCAT('S',LPAD(
(SELECT `auto_increment` 
  FROM INFORMATION_SCHEMA.TABLES    
  WHERE table_name = 'ACCOUNT')
,3,'0'));

delimiter //
CREATE TRIGGER rootCategoryEdit BEFORE INSERT ON CATEGORY
FOR EACH ROW 
BEGIN
	IF NEW.rootCategory IS NULL THEN
		SET NEW.rootCategory = 0;
	END IF;
END; //
delimiter ;

delimiter //
CREATE TRIGGER addRowtempCateogry AFTER DELETE ON CATEGORY
FOR EACH ROW 
BEGIN
	CREATE TEMPORARY TABLE temp_DeleteCategory (idCategory INTEGER);
    INSERT INTO temp_DeleteCategory (idCategory) (SELECT idCategory from Category where rootCategory = OLD.idCategory );
END; //
delimiter ;

delimiter //
CREATE TRIGGER removeChild AFTER INSERT ON temp_DeleteCategory
FOR EACH ROW 
BEGIN
	DELETE FROM CATEGORY WHERE idCategory IN (SELECT idCategory FROM temp_DeleteCategory); 
    DROP TEMPORARY TABLE temp_DeleteCategory;
END; //
delimiter ;

