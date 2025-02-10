# Slobodna europa

## Live demo:

https://slobodna-europa.netlify.app/

## Tech stack:

- React
- TypeScript
- Vite
- Redux
- Material UI
- React Router
- Vitest (Jest-like Vite alternative)
- React Testing Library

---

## Assignment:

### Test Assignment: Mini-CMS for Article Management

#### Task:

Develop a single-page application for managing articles, including listing articles, creating new ones, editing, deleting existing ones.

#### Requirements:

1. Functionality:

- Article List: Display articles with title, author, and publication date.
- Create Article: A form with fields for title, content, author, and publication date.
- Edit Article: Ability to modify an existing article.
- Delete Article: Deletion with confirmation.

1. Additional Requirements (to assess architectural thinking):

- Performance Optimization: Articles can be large (lots of text), so avoid unnecessary re-renders.
- State Management: Use Redux for scalable and predictable state management.
- Error Handling: Display error messages when API requests fail.
- User Experience: Show loading indicators during API calls.
- Unit Testing: Write unit tests for core components using Jest and React Testing Library. Focus on testing component behavior, data flow, and edge cases.

#### Technology Stack:

- React (with TypeScript): for building the UI.
- Redux: for state management.
- Material UI (MUI): for UI components.
- TSS (TypeScript Style Sheets): for styling.
- React Router: for navigation.
- Jest + React Testing Library: for unit testing.

#### API:

Your application should interact with a backend to fetch and manipulate article data. You can choose between GraphQL or REST API.

##### Option 1: REST API (JSONPlaceholder / Mock Server)

- GET /articles — fetch the list of articles
- POST /articles — create a new article
- PUT /articles/:id — update an existing article
- DELETE /articles/:id — delete an article

##### Option 2: GraphQL API (Mock or Apollo Server)

Implement GraphQL queries and mutations for:

- Fetching a list of articles
- Fetching a single article by ID
- Creating a new article
- Updating an article
- Deleting an article

#### Evaluation Criteria:

1. Code Readability and Cleanliness: Use of TypeScript, proper type definitions, and logical project structure.
2. Performance Optimization: Avoid unnecessary re-renders and use memoization where needed.
3. Architecture: The project should be easy to scale and maintain.
4. State Management: Efficient handling of data and state transitions using Redux.
5. UX/UI: Intuitive and user-friendly interface with consistent design using MUI and TSS.
6. Testing: Well-structured unit tests covering core components, verifying functionality, edge cases, and error handling.
7. API Integration: Proper implementation of either REST or GraphQL with clear reasoning behind the chosen approach.

#### Bonus Tasks (Optional):

- Implement search functionality for article titles.
- Add sorting by publication date.
- Implement URL handling: correct reading and persistence of search and sorting state via URL parameters (e.g., ?search=title&sort=date).
