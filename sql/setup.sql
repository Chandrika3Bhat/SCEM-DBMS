-- Drop the existing database if it exists (old database name)
DROP DATABASE IF EXISTS college_events;

-- Create the new database
CREATE DATABASE new_college_events;

-- Use the newly created database
USE new_college_events;

-- Users Table  
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    venue VARCHAR(255),
    type VARCHAR(50),
    organizer_id INT,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE SET NULL -- Set null if the organizer is deleted
);

-- Registrations Table
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Delete registrations when the user is deleted
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE -- Delete registrations when the event is deleted
);

-- Feedback Table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    user_id INT,
    feedback TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE, -- Delete feedback when the event is deleted
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Delete feedback when the user is deleted
);

-- Trigger for Event Cancellation
DELIMITER $$

CREATE TRIGGER before_event_delete
BEFORE DELETE ON events
FOR EACH ROW
BEGIN
    -- Insert a feedback record for each user who registered for the event
    INSERT INTO feedback (event_id, user_id, feedback)
    SELECT OLD.id, user_id, 'Event was cancelled' 
    FROM registrations 
    WHERE event_id = OLD.id;
END$$

DELIMITER ;
