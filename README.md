# Restaurants

"Restaurants" shares various delicious restaurant information.

## Features

-   Display restaurants on multiple pages
-   Search restaurants by name or category
-   Reorder restaurants
-   Flash messages
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

<br />

2. Move to the Restaurants directory

```
cd Restaurants
```

<br />

3. Restore the dependencies

```
npm install
```

<br />

4. Create example environment configs

```
npm run env:create
```

<br />

5. Launch Mysql Server

Launch your mysql server, and edit environment config files in folder "env".<br />
There are two config files in it, ".env.development.local" and ".env.production.local".<br />
Change the "DB_MYSQL_USERNAME", "DB_MYSQL_PASSWORD", "SESSION_SECRET" to match your mysql server connection settings.

<br />

6. Create a new database and seed test data.

```
npm run db:create
npm run seed
```

<br />

7. Launch the application

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

![image](https://github.com/LoS-Light/Restaurants/blob/main/screenshots/restaurants-01.jpg)
![image](https://github.com/LoS-Light/Restaurants/blob/main/screenshots/restaurants-02.jpg)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
