# Shortly

Shortly is a simple web service that generates short URLs from long ones. It was created by Fran P. as a personal project, and the public version is closed to some users. Of course, you can deploy it by yourself using Docker. Is currently hosted at https://shortly.franp.site.

## Features

- Shorten any long URL
- Simple and easy to use API
- Users register and login

## Endpoints

### Endpoint: ```GET /get-user```

* Description: Retrieves user data using email/username and password.

* Headers:

  | Header Key | Required | Type   | Description                         |
  | ---------- | -------- | ------ | ----------------------------------- |
  | url        | Yes      | String | Original URL to shorten             |
  | email      | Yes      | String | User email address                  |
  | username   | Yes      | String | User username                       |
  | password   | Yes      | String | User password     

* Result: Returns user data.

### Endpoint: ```POST /sign-up```

* Description: Creates a new user.

* Headers:

  | Header Key          | Required | Type                | Description                                                             |
  | ------------------- | -------- | ------------------- | ----------------------------------------------------------------------- |
  | email               | Yes      | String              | User email address                                                      |
  | username            | Yes      | String              | User username                                                           |
  | password            | Yes      | String              | User password                                                           |
  | role                | Yes      | String (enum: ADMIN)| User role (ADMIN is the only valid value currently supported)           |
  | sponsor_uid         | No       | String              | Sponsor ID                                                              |
  | first_user_password | No       | String              | Password of the first user created by this admin (for admin users only) |


* Result: Returns a success message indicating that the user was added.

### Endpoint: ```POST /add-url```

* Description: Adds a new short URL.

* Headers:

  | Header Key | Required | Type   | Description                 |
  | ---------- | -------- | ------ | --------------------------- |
  | url        | Yes      | String | Original URL to shorten     |
  | email      | Yes      | String | User email address          |
  | username   | Yes      | String | User username               |
  | password   | Yes      | String | User password               |

* Result: Returns the new short URL.

### Endpoint: ```GET /:urlId```

* Description: Redirects to the original URL associated with the given short URL ID.

* Headers: N/A

* Result: Redirects the user to the original URL.

## Running Shortly using Docker Compose

To run the Shortly API using Docker Compose, follow these steps:

Install Docker and Docker Compose: If you haven't already, you'll need to install Docker and Docker Compose on your computer.

1. Clone the repository: Clone the Shortly API repository to your computer using Git:
    ```bash
    git clone git@github.com:FranP-code/shortly.git
    ```

2. Build the Docker image: Open a terminal in the root directory of the project and run the following command to build the Docker image:
    ```bash
    docker-compose build
    ```

3. Run the Docker container: Once the Docker image is built, you can run a container based on it using the following command:bash
    ```bash
    docker-compose up
    ```



5. Access the API: You can now access the Shortly API by visiting http://localhost:3000 in your web browser or sending requests to the API endpoint using tools like ```curl```.

## Environment Variables

The API can be configured using environment variables. The following variables can be set in a ```.env``` file in the root directory of the project:
- ```NODE_ENV```: The environment in which the API is running, either "development" or "production". Defaults to "development".