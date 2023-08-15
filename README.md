# CS50W Capstone Project

# Description

My final project's name is Travelsome. It is an web application where users can find hotels around the world. Users can register, login and logout. Each user has its own individual profile in which they have a _Favorites_ list and can add or remove hotels from their favorites list. Users can explore different options by providing a city name, number of adults and the check in and check out dates and they will be provided with hotels that they can visit. Upon clicking the _Visit now_ button, they are taken to that particular hotel's page. Here the user is provided with all kinds of information such as: gallery of images, amenities, details about the hotel and a map which is pinpointed to the hotel's location.

# Distinctiveness and Complexity

My web application is build in the backed with Django and frontend is made with React and Typescript. This web application is _not_ an e-commerce site or a social media platform nor does it resemble one. The application is called Travelsome and it is a website in which you can search for different cities around the world and it will show you different hotels which you can visit based on the location, date and number of adults provided.

## Project's files

The project has two main folders:

1. backend
2. frontend

### 1. Backend

Inside the backend folder is the backend of the application. It has been build using Django. There is the **db.sqlite3** which is the database and inside the "my*project" folder are the files that make up the backend, most notable ones are: \_models.py, serializers.py, settings.py, urls.py and views.py*.

### 2. Frontend

The frontend has been build using React and Typescript. The _frontend_ folder includes all the frontend files. There is the _node_modules_ folder which contains all the packages installed in order to build this application. Inside the _src_ folder is where the "magic" happens. There we have the _components_ folder which includes all the components used to build each page of the website. The _pages_ folder contains all the "pages" of the website which are being built using the components from the previous folder. The aesthetics of the application has been achieved using _tailwind css_.

## Running the application

In order to properly run the application, you need to change directory inside the backend folder and run `python manage.py runserver`. To run the frontend you need to open a different terminal and change directory inside the frontend folder and run `npm start`.
