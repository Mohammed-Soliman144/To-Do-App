# To-Do App

A responsive and interactive To-Do List application built with **HTML5, CSS3, and Vanilla JavaScript**. It allows users to manage daily tasks by creating, editing, completing, deleting, and filtering tasks, with persistent data storage using the browser's LocalStorage API.

**[Live Demo](https://mohammed-soliman144.github.io/To-Do-App/)** · **[GitHub Repository](https://github.com/Mohammed-Soliman144/To-Do-App)**

---

## Features

- **Task Management:** Add new tasks, edit existing tasks, and delete individual tasks.
- **Task Completion:** Mark tasks as completed or active using interactive checkboxes.
- **Task Filtering:** Filter tasks by All, Active, and Completed statuses.
- **Persistent Storage:** Automatically save and retrieve tasks using LocalStorage, preserving data across page reloads.
- **Clear Completed Tasks:** Remove all completed tasks with a single action.
- **Dynamic Task Counter:** Display the number of remaining active tasks.
- **Dynamic Date:** Display the current date using the JavaScript Internationalization API.
- **Empty State:** Display a dedicated message when no tasks match the selected filter.
- **Responsive Layout:** Adapt the interface to different screen sizes.
- **Interactive UI:** Provide visual feedback for task actions and user interactions.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure and application markup |
| CSS3 | Styling, responsive layouts, and interactive states |
| JavaScript (ES6+) | Application logic and functionality |
| JavaScript ES Modules | Modular code organization |
| DOM API | Dynamic rendering and event handling |
| LocalStorage API | Client-side data persistence |
| Intl API | Dynamic date formatting |

## Project Architecture

The application follows a modular JavaScript structure, separating DOM selectors, application state, event handling, and utility functions.

```text
To-Do-App/
│
├── index.html
│
└── src/
    ├── js/
    │   ├── main.js
    │   ├── selectors.js
    │   ├── state.js
    │   └── utils.js
    │
    └── styles/
        ├── globals.css
        ├── reset.css
        └── tokens.css
```

### JavaScript Modules

- **main.js:** Application entry point responsible for registering event listeners and coordinating application interactions.
- **selectors.js:** Centralizes DOM element references to avoid repeated DOM queries across modules.
- **state.js:** Manages application state, including adding, retrieving, updating, and removing tasks.
- **utils.js:** Contains reusable functions for task management, filtering, LocalStorage synchronization, DOM updates, and application initialization.

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- A modern web browser.
- Git installed on your machine.
- Visual Studio Code (recommended).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohammed-Soliman144/To-Do-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd To-Do-App
   ```

3. Open the project using Visual Studio Code.

4. Launch `index.html` using the Live Server extension or another local static server.

No additional package installation or build process is required.

## How to Use

1. Enter a task in the input field.
2. Click the add button to create a new task.
3. Use the checkbox to mark a task as completed or active.
4. Click the edit button to modify an existing task.
5. Click the delete button to remove an individual task.
6. Use the All, Active, and Completed filters to organize your task list.
7. Click Clear Completed to remove all completed tasks.

Your tasks are automatically saved in LocalStorage and restored when you revisit the application in the same browser.

## Key Learning Outcomes

This project provided practical experience with:

- Structuring applications using native JavaScript ES Modules.
- Managing application state independently of the DOM.
- Implementing event delegation for dynamically generated elements.
- Working with DOM manipulation and HTML templates.
- Synchronizing application state with browser LocalStorage.
- Implementing filtering and task management functionality.
- Organizing CSS using design tokens, reset styles, and component-based class naming.
- Using modern JavaScript APIs for date formatting.

## Author

**Muhammed Soliman**

- GitHub: [@Mohammed-Soliman144](https://github.com/Mohammed-Soliman144)
- LinkedIn: [Muhammad Soliman](https://www.linkedin.com/in/muhammad-soliman144/)
