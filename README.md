# Distributed WebSocket Messaging Application

This application is a demo that enables real-time communication over websockets between individuals on different servers, from Server S(1) to Server S(N). It allows for seamless communication and can be autoscaled, making it suitable for distributed environments.

## Usage

When running `docker-compose up`, a total of 3 backend and 3 client containers will be launched. Each client container will connect to the respective backend container.

Client Applications:

- http://localhost:80
- http://localhost:81
- http://localhost:82

Backend Applications:

- http://localhost:3000
- http://localhost:3001
- http://localhost:3002

Hence, the mappings will be as follows:

- http://localhost:80 -> http://localhost:3000
- http://localhost:81 -> http://localhost:3001
- http://localhost:82 -> http://localhost:3002

## Technologies Used

The application utilizes the following technologies:

1. NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.
2. Redis IO Adapter: An adapter for Socket.IO that allows communication between multiple Node.js processes or servers using Redis as the pub/sub mechanism.
3. Socket.IO: A library that enables real-time, bidirectional, and event-based communication between web clients and servers.
4. MongoDB: A NoSQL document database used for storing and retrieving data.
5. Redis: An in-memory data structure store used as a cache and for pub/sub messaging.
6. JavaScript: The programming language used for the frontend development.
7. Tailwind CSS: A utility-first CSS framework used for styling the application.

## Installation

1. Clone or download the application from the repository.
2. Run `docker-compose up` to start the backend and client containers.
3. Access the client applications through the provided URLs.
4. Interact with the application to test real-time communication between the distributed servers.


