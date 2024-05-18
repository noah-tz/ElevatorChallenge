# Elevator Challenge README

## Object Descriptions
The Elevator Challenge project comprises several key objects that interact to implement the elevator system:

`Buildings` class
- Represents a building within the project.
- Encapsulates floors and the elevator system for that building.

`Floor (Factory-Created)` class
- Represents an individual floor within a building.
- Represents an individual floor within a building.

`FloorFactory` class
- Generates floors on demand.
- Provides a static function to return a component containing the created floors.

`DisplayTimer` class
- Object responsible for displaying the remaining time until an elevator's arrival on each floor.

`Elevators` class
- Represents the elevator system for a single building.
- Contains a function to create elevators based on requirements and implements the algorithm for finding the fastest available elevator for a given request.

`Elevator` class
- Represents an individual elevator within the elevator system.
- Maintains a queue of pending requests for that elevator.
- Includes functions to calculate arrival time for a new request considering the existing queue, move the elevator between floors based on the request queue, and handle the ascent and descent of the elevator.

`Tools` (file)
A collection of utility functions used across the project:
- `Timer` class: Represents a timer with the ability to check the remaining time.
- `roundToNearestHalf`: Rounds a decimal time value to the nearest half-second.
- `getSecondsForSingleOrder`: Calculates the time it takes for an elevator to travel directly between two specified floors.
- `sleep`: Implements a sleep function for introducing delays in the project.





### Project Description

The Elevator Challenge simulates a multi-elevator system in a high-rise building. Each floor has a call button to request an elevator. The system intelligently selects the fastest available elevator to serve each request. Ride requests do not affect the wait times of previous reservations.

Upon requesting an elevator, a floor display indicates the remaining time until its arrival. The call button remains illuminated until the elevator arrives. the elevator waits two seconds before proceeding to the next request. Elevator movement speed is 0.5 seconds per floor (can be changed in the settings file).


### Elevator Selection Algorithm

Each elevator maintains a list of pending requests. For a new request, the system calculates the total time it would take for each elevator to complete its current route and reach the requested floor. The elevator with the shortest estimated time is selected to serve the request.

### Special Requirements

- Object-oriented programming (OOP) principles must be followed.
- Entities should be created using a factory pattern.

### Changes and extensions

A settings file allows configuring parameters such as elevator speed, number of floors, number of elevators per building, and the number of buildings in the project.

### Installation Instructions

1. Clone the repository: git clone git@github.com:noah-tz/ElevatorChallenge.git 
2. Install dependencies: npm i
3. Run the application: npm start

### Usage

- Call an elevator from a floor using the corresponding button.
- Observe the floor display indicating the remaining time until the elevator's arrival.
- Watch the elevator move between floors and serve requests.

### Notes

- The project is written in TypeScript for execution.
- The code is organized following OOP principles and employs a factory pattern for object creation.
- The settings file allows for customization of project parameters.
