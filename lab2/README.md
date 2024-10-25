# Install modules

npm i

# Start server

npm run start


# Create db

createdb clubs


# Database connection

psql clubs


# Get database contents

\dt


# Exiting the database session

\q


# All databases

\l


# Info about db

\c clubs


# Create table

\i database.sql

# To restart sequence of clubs ids

ALTER SEQUENCE club_id_seq RESTART WITH 1;