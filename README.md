To start the web application you have to create your mongoDb Atlas account and cloudinary account and then setup an .env file in the backend folder with these entries
<pre>
    PORT=
    MONGODB_URI=
    CORS_ORIGIN=*  # All for all urls
    ACCESS_TOKEN_SECRET = 
    ACCESS_TOKEN_EXPIRY = 
    REFRESH_TOKEN_SECRET = 
    REFRESH_TOKEN_EXPIRY = 
    CLOUDINARY_API_SECRET = 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_NAME = 
<pre/>
To start backend: 
In backend folder: <b>npm run start</b>


To start Frontend: 
In frontend folder: <b>npm run dev</b>
