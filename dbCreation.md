#Creation of patients table
CREATE TABLE `hospital`.`patients` ( `id` INT NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(255) NOT NULL , `last_name` VARCHAR(255) NOT NULL , `dob` DATE NOT NULL , `gender` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

#patient_visits
CREATE TABLE `hospital`.`patient_visits` ( `id` INT NOT NULL AUTO_INCREMENT , `date` DATE NOT NULL , `height` DOUBLE NOT NULL , `weight` INT NOT NULL , `bmi` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;