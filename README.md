# CS50W Capstone Project

# Distictiveness and complexity

- The project's name is Travelsome. It has been built using a Javascript library called React. And it uses Django in the backend. The main focus of the project was to learn how to use React as a Javascript library.
- When first visiting the website, the user is presented with the homepage. When clicking the button on the homepage the user is redirected to the login/register route. The register route presents the user with a form asking for credetials. The form uses a library called 'yup' which is used for frontend validation. Then React makes a request to the backend using another library called "axios". The data is then passed through a serializer (which is a way to parse JSON into Python objects) to validate the data. Then it it saved in the database using the register view associated with the url.
- After the user is logged in, he can then visit a route called "hotels" in which the user is presented with a bunch of hotels. I have used a free trial from an API that provides information about different kinds of hotels. This was quite the challenge as I had to use Typescript in order to make sure I recieve the expected data and it proved to be very useful in debugging.
- The user can provide some search information, and based on that information, React will make a call using Axios library to the API and get a response. Using Axios has been proven useful because it is quite easy to configure errors and display a Loading icon until the API has given back a response.
- After logging in, the user also has access to a route called "favorites" in which he can add hotels to his favorites. Adding and removing hotels from a favorites list was not difficult until I came across the problem of having a unique list of favorites for each unique user. In order to solve this issue, I chose to store the JWT Authentication token (unique to every user), the user's unique ID, and the hotel ID and name. Then make a request to the appropriate view handling all this data.
- In order to display the user's name in the navbar I have chosen to store the user's name inside a "store" using Redux Toolkit. React being a component based library, some components have access to some data, others dont. In order to try to minimize the use of "prop drilling" storing the name in a "store" means that all the components have access to that data. Also this is all handled by the frontend, no need to make a request to the backend to recieve the username.
- The aestethics of the website have been achieved with Tailwind CSS and DaisyUI.

## Project's files

The project has two main folders:

1. backend
2. frontend

### 1. Backend

Inside the backend folder is the backend of the application. It has been build using Django.

- _admin.py_ - contains the registration of the models.
- _models.py_ - has the 2 models the backend is built upon.
- _serializers.py_ - contains the serializers that handles the data coming from the frontend.
- _settings.py_ - has some custom settings such as enabling JWT Authentication.
- _urls.py_ - has the urls of the project.
- _views.py_ - contains all the views associated with the URLs.

### 2. Frontend

The frontend has been build using React and Typescript. The _frontend_ folder includes all the frontend files. Inside the **src** folder there are the following files:

**components** folder which contains the following components:

- _Adults.tsx_ - is a component used for selecting the number of adults.
- _Amenities.tsx_ - contains the amenities specific for each hotel.
- _HeroSection.tsx_ - has the hero section of the homepage.
- _HotelHeader.tsx_ - has the header for each hotel.
- _Hotels.tsx_ - contains the process of fetching data and displaying the hotels.
- _Images.tsx_ - is responsible for displaying the images of the hotels.
- _Logout.tsx_ - displays the logout form.
- _Map.tsx_ - handles displaying a map with coordinates of each individual hotel.
- _Modal.tsx_ - contains a modal with a gallery of images of a hotel.
- _Navbar.tsx_ - has the navbar of the website.
- _SearchBar.tsx_ - displays a searchbar and handles fetching data based on the given search.
- _useHotelData.tsx_ - is a custom hook made for reusability, handling fetching data about a hotel.
- _userInput.tsx_ - is a component that contains all the data inputs and fetches data based on that request.

**pages** folder contains all the pages of the application:

- _Auth.jsx_ - is a component used to protect specific routes from accessing based on the status of authentication of the user.
- _Favorites.tsx_ - contains the process of locally storing some data used for fetching a list of the favorite hotels of the user and hadles the process of removing favorites.
- _Home.tsx_ - is the homepage.
- _HotelDetails.tsx_ - is a page that displays details about a hotel.
- _HotelsFeed.tsx_ - is a page that displays the data inputs and all the hotels with a brief description.
- _Login.tsx_ - is a page that displays the login form and handles the login process.
- _Registertsx_ - displays the register form and handles the register process.
- _store.ts_ - is a file that contains information that can be accessed by any component in the application, such as username and JWT Token.

**static** folder contains a single file:

- _heropicture.jpg_ - is the picture from the homepage.

**App.css** contains the CSS used for the "X" button and a couple other CSS tweaks.

**App.tsx** contains all the routes of the application and gets the user from the "store" so the username does not dissappear from the navbar upon refreshing the page.

## Running the application

In order to properly run the application, you need to change directory inside the backend folder and run `python manage.py runserver`. To run the frontend you need to open a different terminal and change directory inside the frontend folder and run `npm start`.

```
capstone
├─ backend
│  ├─ build_files.sh
│  ├─ db.sqlite3
│  ├─ manage.py
│  ├─ my_project
│  │  ├─ admin.py
│  │  ├─ asgi.py
│  │  ├─ migrations
│  │  │  ├─ 0001_initial.py
│  │  │  ├─ 0002_delete_customer.py
│  │  │  ├─ 0003_favoritehotel.py
│  │  │  ├─ 0004_rename_hotel_id_favoritehotel_hotelid_and_more.py
│  │  │  ├─ 0005_alter_favoritehotel_user.py
│  │  │  ├─ 0006_alter_favoritehotel_user.py
│  │  │  ├─ __init__.py
│  │  │  └─ __pycache__
│  │  │     ├─ 0001_initial.cpython-311.pyc
│  │  │     ├─ 0002_abstract.cpython-311.pyc
│  │  │     ├─ 0002_delete_customer.cpython-311.pyc
│  │  │     ├─ 0003_favoritehotel.cpython-311.pyc
│  │  │     ├─ 0003_rename_abstract_abstractuser.cpython-311.pyc
│  │  │     ├─ 0004_rename_hotel_id_favoritehotel_hotelid_and_more.cpython-311.pyc
│  │  │     ├─ 0004_user_delete_abstractuser.cpython-311.pyc
│  │  │     ├─ 0005_alter_favoritehotel_user.cpython-311.pyc
│  │  │     ├─ 0005_rename_user_customuser.cpython-311.pyc
│  │  │     ├─ 0006_alter_favoritehotel_user.cpython-311.pyc
│  │  │     └─ __init__.cpython-311.pyc
│  │  ├─ models.py
│  │  ├─ serializers.py
│  │  ├─ settings.py
│  │  ├─ urls.py
│  │  ├─ views.py
│  │  ├─ wsgi.py
│  │  ├─ __init__.py
│  │  └─ __pycache__
│  │     ├─ admin.cpython-311.pyc
│  │     ├─ models.cpython-311.pyc
│  │     ├─ serializers.cpython-311.pyc
│  │     ├─ settings.cpython-311.pyc
│  │     ├─ urls.cpython-311.pyc
│  │     ├─ validations.cpython-311.pyc
│  │     ├─ views.cpython-311.pyc
│  │     ├─ wsgi.cpython-311.pyc
│  │     └─ __init__.cpython-311.pyc
│  ├─ README.md
│  ├─ requirements.txt
│  └─ vercel.json
├─ frontend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ Adults.tsx
│  │  │  ├─ Amenities.tsx
│  │  │  ├─ HeroSection.tsx
│  │  │  ├─ HotelHeader.tsx
│  │  │  ├─ Hotels.tsx
│  │  │  ├─ Images.tsx
│  │  │  ├─ Logout.tsx
│  │  │  ├─ Map.tsx
│  │  │  ├─ Modal.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ SearchBar.tsx
│  │  │  ├─ useHotelData.ts
│  │  │  └─ userInput.tsx
│  │  ├─ index.tsx
│  │  ├─ pages
│  │  │  ├─ Auth.jsx
│  │  │  ├─ Favorites.tsx
│  │  │  ├─ Home.tsx
│  │  │  ├─ HotelDetails.tsx
│  │  │  ├─ HotelsFeed.tsx
│  │  │  ├─ Login.tsx
│  │  │  ├─ Register.tsx
│  │  │  └─ store.ts
│  │  ├─ react-app-env.d.ts
│  │  └─ static
│  │     └─ heropicture.jpg
│  ├─ tailwind.config.js
│  └─ tsconfig.json
└─ README.md

```