# Elevator Challenge README


### Project Description

The Elevator Challenge simulates a multi-elevator system in a high-rise building. Each floor has a call button to request an elevator. The system intelligently selects the fastest available elevator to serve each request. New requests do not affect the wait times of previous reservations.


### Elevator Selection Algorithm

Each elevator maintains a list of pending requests. For a new request, the system calculates the total time it would take for each elevator to complete its current route and reach the requested floor. The elevator with the shortest calculated time is selected to serve the request.




## Object Descriptions
The Elevator Challenge project comprises of several key objects that interact to implement the elevator system:

`Buildings` class
- Represents the buildings within the project.
- holds the buildings, using BuildingFactory.


`Building (Factory-Created)` class
- Represents an individual building within a buildings.
- holds the floors and the elevator system for that building.

`BuildingFactory` class
- Produces multiple buildings upon 'settings' file parameters.
- Provides a static function to return a component containing the created buildings.

`Floor (Factory-Created)` class
- Represents an individual floor within a building.
- Holds an elevator order button, calling the elevator system.
- Displays the calculated arrival time

`FloorFactory` class
- Generates floors on demand.
- Provides a static function to return a component containing the created floors.

`DisplayTimer` class
- Responsible for displaying a count down by intervals of 1 second, is used for displaying the remaining time until an elevator's arrival on each floor.
- Activated using the 'start' function

`Elevators` class
- Represents the elevator system for a single building.
- Contains a function to create elevators based on requirements and implements the algorithm for finding the fastest available elevator for a given request.

`Elevator` class
- Represents an individual elevator within the elevator system.
- Maintains a queue of pending requests for that elevator.
- Includes functions to calculate arrival time for a new request considering the existing queue, move the elevator between floors based on the request queue, and handle the ascent and descent of the elevator.

`Utils` (file)
A collection of utility functions used across the project:
- `Timer` class: Represents a timer with the ability to check the remaining time.
- `roundToNearestHalf`: Rounds a decimal time value to the nearest half-second.
- `getSecondsForSingleOrder`: Calculates the time it takes for an elevator to travel directly between two specified floors.
- `sleep`: Implements a sleep function for introducing delays in the project.



### Special Requirements

- Object-oriented programming (OOP) principles must be followed.
- Writing in the TypeScript language.
- Entities should be created using a factory pattern.

### Changes and extensions

A settings file allows configuring parameters such as elevator speed, number of floors, number of elevators per building, and the number of buildings in the project.

### Installation Instructions

1. Clone the repository: git clone git@github.com:noah-tz/ElevatorChallenge.git 
2. Enter the project folder: cd ElevatorChallenge
2. Install dependencies: npm i
3. Run the application: npm start

### Usage

- Call an elevator from a floor using the corresponding button.
- Observe the floor display indicating the remaining time until the elevator's arrival.
- Watch the elevator move between floors and serve requests.

