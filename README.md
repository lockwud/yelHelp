# yelHelp ReadMe

This README provides an overview of the Yelhelp project, its purpose, key features, and setup instructions.
Project Overview

# Yelhelp is a healthcare-focused social networking platform designed to connect patients with doctors and facilitate communication between users. It utilizes Prisma ORM for database management and PostgreSQL as the backend database.

Key Features

    User authentication and profile management
    Doctor-patient relationship establishment
    Appointment scheduling system
    Messaging functionality
    Friend request and acceptance system
    Notification system for various events

# Database Schema

The project uses a PostgreSQL database managed by Prisma ORM. The schema defines several models:
Models

    User: Represents individual users of the platform
        Fields: id, fullname, gender, email, password, contact, address, photoUrl, photoKey, otp, verified, createdAt, updatedAt, friends

    Doctor: Represents medical professionals
        Fields: id, firstname, surname, othername, email, password, contact, photoUrl, photoKey, otp, otpexpires, token, tokenexpires, createdAt, updatedAt, del_flag

    Friends: Manages friendships between users
        Fields: id, userId, friendId, status, requesterId, responseId, message, createdAt, updatedAt, del_flag

    Appointment: Handles doctor-patient appointments
        Fields: id, doctorId, patientId, appointmentDate, appointmentTime, status, createdAt, updatedAt, del_flag

    Message: Manages private messaging between users
        Fields: id, senderId, receiverId, message, createdAt, updatedAt, del_flag

    ViewOncemessage: Tracks viewed messages
        Fields: id, userId, messageId, receiverId, viewed, createdAt, updatedAt, del_flag

    Chat: Manages group chats
        Fields: id, userId, friendId, createdAt, updatedAt, del_flag

    Notification: Handles various notifications for users
        Fields: id, userId, type, message, createdAt, updatedAt, del_flag

Enums

    notificationStatus: Defines statuses for notifications (unread, read, seen)
    notificationType: Defines types of notifications (friend_request, appointment_request, etc.)
    status: Defines statuses for appointments and friendships (pending, accepted, rejected, etc.)
    gender: Defines gender options (male, female, trans)

# Setup Instructions

    Clone the repository:

git clone https://github.com/lockwud/yelhelp.git

    Install dependencies:

npm install

    Set up environment variables:
        Create a .env file in the root directory
        Add your PostgreSQL database URL:

DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

    Generate Prisma client:

npx prisma generate

    Run migrations:

npx prisma migrate dev

    Start the application:

npm start

# Contributing

Contributions to Yelhelp are welcome! Please feel free to submit issues or pull requests.
License

Yelhelp is released under the MIT License. See the LICENSE file for details.
Contact

For any questions or feedback, please contact us at oklement3@gmail.com.