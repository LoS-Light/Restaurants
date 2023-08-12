# Restaurants

"Restaurants" shares various delicious restaurant information.

## Features

-   Display all restaurants
-   Search restaurants by name or category
-   Create a new restaurant
-   Check restaurant information
-   Edit restaurant information
-   Delete restaurant information

## Environment requirements

-   Node.js v18
-   MySQL server v8

## Installation

1. Clone the repository

```
git clone https://github.com/LoS-Light/Restaurants.git
```

2. Move to the Restaurants directory

```
cd Restaurants
```

3. Restore the dependencies

```
npm install
```

4. Launch Mysql Server

Launch your mysql server, and edit environment config files in folder "env".
There are two config files in it, ".env.development.local" and ".env.production.local".
Change the "DB_MYSQL_USERNAME" and "DB_MYSQL_PASSWORD" to match your mysql server connection settings.

5. Create a new database and seed test data.
```
npm run db:create
npm run seed
```

6. Launch the application

Run app in development mode
```
npm run dev
```

or

Run app in production mode
```
npm run build
npm run start
```

In your browser, open http://localhost:3000 to see the website.

## Demo

https://rests.loslight.com

## Screenshots

![image](https://github.com/LoS-Light/ShortUrl/blob/main/screenshots/restaurants-01.jpg)
![image](https://github.com/LoS-Light/ShortUrl/blob/main/screenshots/restaurants-02.jpg)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
