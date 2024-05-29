# LearnXcel

LearnXcel is a web-based learning management system built using Flask and SQLAlchemy. It supports user authentication, course management, lesson and quiz management, and user progress tracking.

## Features

- User authentication and authorization
- Course creation and management
- Lesson and quiz creation and management
- User progress tracking

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/UcheCom/learnxcel.git
    cd learnxcel/backend
    ```

2. **Create a virtual environment**:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Set up the database**:
    Update the `SQLALCHEMY_DATABASE_URI` in `app.py` with your database credentials.

5. **Run the application**:
    ```sh
    flask run
    ```

## API Endpoints

- **User Endpoints**:
    - `GET /users`: Retrieve all users.
    - `POST /users`: Create a new user.
    - `GET /users/<int:user_id>`: Retrieve a user by ID.
    - `PUT /users/<int:user_id>`: Update a user by ID.
    - `DELETE /users/<int:user_id>`: Delete a user by ID.

- **Course Endpoints**:
    - `GET /courses`: Retrieve all courses.
    - `POST /courses`: Create a new course.

- **Authentication Endpoints**:
    - `POST /register`: Register a new user.
    - `POST /login`: Login a user and get a JWT token.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project will be licensed under the MIT License.