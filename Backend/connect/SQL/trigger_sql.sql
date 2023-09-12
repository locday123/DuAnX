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