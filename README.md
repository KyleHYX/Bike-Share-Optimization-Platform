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

### Features
The Bike-Share-Optimization-Platform offers a range of features designed to enhance the biking experience for both urban commuters and leisure cyclists:

1. Intelligent Route Planning: Utilizes advanced algorithms to plan the best possible routes, considering factors like time cost and spend cost.

2. Interactive Map Interface: A user-friendly map that allows users to select their start and destination points easily.

3. Customizable Preferences: Useres allowed to set their preference for a balance between speed and expenditure. This feature ensures that the route suggested aligns with the user's individual needs and preferences.

4. Approximate Skyline Results: The application employs smart pruning and dynamic programming to generate approximate skyline routes. These routes are almost identical to the actual best routes in terms of cost and time efficiency but are computed with significantly reduced time complexity.

5. Real-Time Route Visualization: The chosen route, along with necessary exchange instructions and cost/time information, is displayed in real-time on the map, providing a clear and comprehensive overview of the journey.

6. Responsive Design: The application is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.

7. Environment-Friendly Travel: By focusing on bike travel, the application promotes an eco-friendly mode of transportation, suitable for urban environments and reducing carbon footprints.
