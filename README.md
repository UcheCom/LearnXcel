# LearnXcel - MVP
**13th May 2024**

## TEAM MEMBERS
* Alban Okoby
* Benjamin Atsu
* Uchenna Oko
* Zahira Khattou

## OVERVIEW
LearnXcel is a dynamic e-learning platform meticulously crafted to enhance learning experiences through captivating courses, interactive quizzes, and engaging content. Users have the freedom to delve into a multitude of subjects, monitor their advancement, and seamlessly interact with both instructors and peers. 

## LEARNING OBJECTIVES

### Frontend Engineer
* **Proficiency in Frontend Technologies:** Gain expertise in HTML, CSS, and JavaScript, along with modern frameworks like React, Angular, or Vue.js, enabling you to build responsive and interactive user interfaces.
* **User Experience Design:** Understand the principles of user interface (UI) and user experience (UX) design to create intuitive and visually appealing web applications that meet user needs and expectations.
* **Cross-Browser Compatibility:** Learn how to ensure cross-browser compatibility and optimize performance to deliver consistent and seamless experiences across different devices and browsers.
* **Responsive Web Design:** Acquire the knowledge and techniques to design and implement responsive web layouts that adapt gracefully to various screen sizes and devices, enhancing usability and accessibility.

### Backend Engineer
* **Proficiency in Backend Technologies:** Develop a deep understanding of server-side programming languages such as Python, JavaScript (Node.js), or Java, along with frameworks like Django, Express.js, or Spring Boot.
* **Database Management:** Learn how to design and manage databases using SQL or NoSQL technologies like MySQL, PostgreSQL, MongoDB, or Firebase, ensuring efficient data storage, retrieval, and manipulation.
* **API Development:** Master the art of designing, building, and consuming RESTful or GraphQL APIs to enable communication between frontend and backend systems, facilitating data exchange and application integration.
* **Security Best Practices:** Understand common security threats and vulnerabilities and learn how to implement robust authentication, authorization, and data encryption mechanisms to protect sensitive information and ensure the security of your applications.
* **Scalability and Performance Optimization:** Acquire strategies and techniques for optimizing the performance and scalability of backend systems, including load balancing, caching, asynchronous processing, and horizontal scaling.
DevOps Practices: Familiarize yourself with DevOps principles and practices, including continuous integration (CI), continuous deployment (CD), infrastructure as code (IaC), and containerization (e.g., Docker), to streamline the development, deployment, and operation of your applications.

## Both Engineers
* **Version Control:** Master version control systems like Git to collaborate effectively with team members, track changes, and manage code repositories efficiently.
* **Testing and Debugging:** Learning testing frameworks and techniques for both frontend (e.g., Jest, Enzyme) and backend (e.g., Pytest, JUnit) code helps ensure the reliability and stability of applications.
* **Agile Methodologies:** Embracing agile principles and practices (e.g., Scrum, Kanban) fosters collaboration, adaptability, and iterative development, leading to faster delivery of high-quality software products.
* **Communication:** Effective communication is crucial for collaborating with team members, understanding project requirements, and articulating technical concepts to non-technical stakeholders.
* **Problem-Solving:** Developing strong problem-solving skills enables engineers to identify issues, analyze root causes, and devise effective solutions, whether it's debugging code or optimizing system performance.
* **Teamwork:** Being able to work collaboratively in cross-functional teams fosters creativity, innovation, and mutual support, leading to more successful project outcomes.
* **Time Management:** Effective time management skills help engineers prioritize tasks, meet deadlines, and balance competing demands, ensuring projects stay on track and deliverables are completed efficiently.

## ARCHITECTURE
[Architecture](https://lucid.app/lucidspark/e9d08e4f-3e03-4c26-9619-5b23fc0a26bc/edit?viewport_loc=-1627%2C-541%2C6029%2C2644%2C0_0&invitationId=inv_b09fb55f-5320-4f94-9a99-cf3f4b51b80d
)

[MYSQL Schema](https://dbdiagram.io/d/LearnXcel-DataBase-6642c70f9e85a46d55c23590)

## APIs

### User Endpoints
**Get User Information**
* GET /users/:user_id
    * Retrieves information about a specific user.

**Create a New User**
* POST /users
    * Creates a new user with the provided information.

**Update User Information**
* PUT /users/:user_id
    * Updates information for a specific user.

**Delete User**
* DELETE /users/:user_id
    * Deletes a specific user.


### Course Endpoints
**Get All Courses**
* GET /courses
    * Retrieves a list of all courses.

**Get Course Information**
* GET /courses/:course_id
    * Retrieves information about a specific course.

**Create a New Course**
* POST /courses
    * Creates a new course with provided information.

**Update Course Information**
* PUT /courses/:course_id
    * Updates information for a specific course.

**Delete Course**
* DELETE /courses/:course_id
    * Deletes a specific course.

### Lesson Endpoints
**Get All Lessons for a Course**
* GET /courses/:course_id/lessons
    * Retrieves a list of all lessons for a specific course.

**Get Lesson Information**
* GET /lessons/:lesson_id
    * Retrieves information about a specific lesson.

**Create a New Lesson**
* POST /lessons
    * Creates a new lesson with provided information.

**Update Lesson Information**
* PUT /lessons/:lesson_id
    * Updates information for a specific lesson.

**Delete Lesson**
* DELETE /lessons/:lesson_id
    * Deletes a specific lesson.

### Quiz Endpoints
**Get All Quizzes for a Lesson**
* GET /lessons/:lesson_id/quizzes
    * Retrieves a list of all quizzes for a specific lesson.

**Get Quiz Information**
* GET /quizzes/:quiz_id
    * Retrieves information about a specific quiz.

**Create a New Quiz**
* POST /quizzes
    * Creates a new quiz with provided information.

**Update Quiz Information**
* PUT /quizzes/:quiz_id
    * Updates information for a specific quiz.

**Delete Quiz**
* DELETE /quizzes/:quiz_id
    * Deletes a specific quiz.

### Question Endpoints
**Get All the Questions for a Quiz**
* GET /quizzes/:quiz_id/questions
    * Retrieves a list of all questions for a specific quiz.

**Get Question Information**
* GET /questions/:question_id
    * Retrieves information about a specific question.

**Create a New Question**
* POST /questions
    * Creates a new question with the provided information.

**Update Question Information**
* PUT /questions/:question_id
    * Updates information for a specific question.

**Delete Question**
* DELETE /questions/:question_id
    * Deletes a specific question.

### Option Endpoints
**Get All Options for a Question**
* GET /questions/:question_id/options
    * Retrieves a list of all options for a specific question.
**Get Option Information**
* GET /options/:option_id
    * Retrieves information about a specific option.
**Create a New Option**
* POST /options
    * Creates a new option with the provided information.
**Update Option Information**
* PUT /options/:option_id
    * Updates information for a specific option.
**Delete Option**
* DELETE /options/:option_id
    * Deletes a specific option.

### User Progress Endpoints
**Get User Progress for a Course**
* GET /users/:user_id/courses/:course_id/progress
    * Retrieves progress information for a specific user in a specific course.
**Update User Progress**
* PUT /users/:user_id/progress/:progress_id
    * Updates progress information for a specific user.