# Bike-Share-Optimization-Platform
## Introduction
The Bike-Share-Optimization-Platform is a web application designed to offer an optimized biking experience for users seeking time-efficient and cost-effective travel routes. Utilizing a combination of a user-friendly map interface and a operation section, the application allows users to select starting points and destinations, intelligently planning the best routes based on two key factors: time cost and spend cost.

By setting a preference, users can balance their desire to minimize spending with the need for speed, customizing their journey to suit their individual needs. The application employs algorithms including smart pruning and dynamic programming to generate results that approximate the 'ideal skyline results'. The approximate skyline results closely match the actual skyline outcomes, effectively balances optimal routing against the computational challenge of computing all paths in a complete graph, offering a practical solution for users to tailor their journey efficiently.

The platform's core innovation lies in its ability to provide quick, effective, and personalized biking routes, making it an invaluable tool for urban commuters and leisure cyclists alike.

## Installation
Follow these steps to set up the Bike-Share-Optimization-Platform on your local machine:

Clone the Repository
First, clone the repository to your local machine using:

```
git clone https://github.com/KyleHYX/Bike-Share-Optimization-Platform.git
```

Set Up the Frontend
Navigate to the frontend directory:
```
cd Bike-Share-Optimization-Platform/frontend
```

Create Environment File
Create a file named .env in this directory and add the following content:
```
REACT_APP_GOOGLE_MAP_API_KEY=<Your_Google_API_Key>
FRONTEND_PORT=<Your_Frontend_Port>
```
Replace <Your_Google_API_Key> with your Google Maps API key and <Your_Frontend_Port> with the desired port number for the frontend.

Set Up the Backend
In a new command prompt window, navigate to the backend directory:

```
cd Bike-Share-Optimization-Platform/backend
```

Create Environment File
Create a file named .env in this directory and add the following content:
```
BACKEND_PORT=<Your_Backend_Port>
```
Replace <Your_Backend_Port> with the desired port number for the backend.

Start the Frontend
Start the frontend application by running the following command in the frontend directory:
```
npm start
```

Start the Backend
In the other command prompt window (with the backend directory), start the backend server by running:
```
python3 run.py
```
## Basic Usage
Once the Bike-Share-Optimization-Platform is up and running, follow these steps to plan your optimized bike route:

### Selecting Start and Destination
***Input Start and Destination***: On the application's interface, you can input the starting point and destination. This can be done by typing in the location or selecting from a dropdown menu.
***Marking on the Map***: The locations you select for the start and destination will be marked on the interactive map.
### Adjusting Preferences
***Preference Slider***: Adjust your travel preferences using the slider provided. This slider allows you to balance between spend cost and speed.
Move the slider towards one end to favor lower spending but potentially slower travel.
Move it towards the other end to favor faster travel at a higher cost.
### Viewing the Route
***Route Display***: After setting your preferences, the route that best matches your criteria will be drawn on the map.
Exchange Instructions and Information: Along with the route, you will receive detailed instructions for exchanges (if any) and information about the estimated time and cost for the journey.
