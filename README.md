# Pinterest Clone - MERN Stack

This is a full-stack Pinterest-inspired web application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to upload and manage images, add titles, leave comments on posts, follow/unfollow other users, and more.

## Frontend Features

- User Authentication: Secure login and registration system using JWT (JSON Web Token).
- Responsive Masonry Layout: Uses react-masonry-css for an organized, Pinterest-like grid view.
- Image Upload and Management: Users can upload images, add titles, edit titles after upload, and delete posts.
- Comment System: Allows users to add and delete comments on posts.
- Follow/Unfollow: Follow other users to see their pins in your feed.

- ## Backend Features
- User Authentication: Passwords are securely hashed using bcrypt, and JWTs are used to manage sessions.
- Image Storage: Images are stored in Cloudinary, enabling fast and efficient media management.
- Database: Uses MongoDB to manage and store user profiles, images, comments, and follow relationships.
- File Handling: Supports file uploads with multer and datauri for buffer handling.

## Tech Stack

- **Frontend:** React, Tailwind CSS, 
- **Backend:** Node.js, Express
- **Database:**  MongoDB
- **Cloud Services:** Cloudinary for media uploads

# Getting Started
## Prerequisites

- Node.js (v16 or higher recommended)
- MongoDB (local or cloud-based)
- Cloudinary account (for image storage)

## 1. Clone the repository
- git clone https://github.com/NISHANTCHAUHAN1/MERN-pinterest.git
- cd pinterest-clone

## 2. Install dependencies
- Backend: Navigate to the backend directory and install packages
- cd backend
- npm install

- Frontend: Navigate to the frontend directory and install packages.
- cd ../frontend
- npm install


## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue to discuss your ideas.

# Acknowledgments

- Inspired by Pinterest
- Cloudinary for efficient image handling
- Thanks to OpenAI for ChatGPT



