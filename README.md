# WebApp for Mindmap Generation Using LLM

This WebApp allows users to input a topic, which is then processed by a Large Language Model (LLM) to generate a mindmap. The mindmap is created using PlanUML and displayed interactively on a canvas with drag-and-zoom features. Users can also edit the mindmap and update the generated visualization.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Flow Overview](#flow-overview)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [To-Do List](#to-do-list)

## Technologies Used
- **Front-end:** Next.js, Tailwind CSS
- **Back-end:** FastAPI (Python) or Slim Framework (PHP)
- **LLMs:** OpenAI API (for text generation and mindmap output)
- **Visualization:** ReactJS Canvas with Konva for mindmap interaction
- **Mindmap Generation:** PlanUML for rendering the mindmap
- **Database:** MySQL/PostgreSQL (for storing user input and request logs)

## Features
- **User Input:** Allows users to submit a topic or task for mindmap generation (e.g., planning a marketing campaign).
- **LLM Interaction:** Sends the input to the OpenAI API to generate related content.
- **Mindmap Generation:** Converts the content from the LLM into a visual mindmap using PlanUML.
- **Interactive Canvas:** Displays the mindmap using ReactJS Canvas and Konva, allowing for drag, zoom in/out, and editing.
- **Data Storage:** Stores input data and request logs in the database for tracking purposes (including token usage and cost).
- **Editable Mindmap:** Users can edit the content of the mindmap and update the visual representation accordingly.

## Flow Overview
1. **User Input:** 
   - The user enters a topic or question, e.g., "Plan a marketing campaign for a new board game mobile app in the Philippines. Include considerations about key messages, success metrics, and possible channels."
2. **Generate Button:**
   - The user clicks on the "Generate" button, which triggers a call to the backend API.
3. **LLM Interaction:**
   - The backend sends the user input to OpenAI's API, which processes the input and generates a textual mindmap.
4. **Mindmap Generation:**
   - The backend returns the generated content, which is then used to create a visual mindmap using PlanUML.
5. **Display on Canvas:**
   - The mindmap is displayed on the canvas, and the user can interact with it (drag, zoom, edit).
6. **Database Logging:**
   - The system logs the user input and the request metadata (tokens used, API cost) in the database for future reference.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-url
   cd your-project-directory
   ```

2. Install dependencies:
   - **Frontend (Next.js + Tailwind CSS)**:
     ```bash
     npm install
     ```

   - **Backend (FastAPI or Slim Framework)**:
     Install Python dependencies (if using FastAPI):
     ```bash
     pip install -r requirements.txt
     ```

     Or PHP dependencies (if using Slim Framework):
     ```bash
     composer install
     ```

3. Set up environment variables:
   - Set the OpenAI API key in the environment configuration.
   - Configure the database connection (MySQL/PostgreSQL).

4. Run the development server:
   - **Frontend:**
     ```bash
     npm run dev
     ```

   - **Backend:**
     ```bash
     uvicorn main:app --reload  # For FastAPI
     php -S localhost:8000      # For Slim Framework
     ```

5. Access the WebApp at `http://localhost:3000`.

## Database Schema

Two essential tables will be used:

1. **User Input Table**
   - **id (INT, PRIMARY KEY):** Unique identifier for each input.
   - **user_input (TEXT):** The topic or task provided by the user.
   - **timestamp (TIMESTAMP):** Date and time when the input was submitted.

2. **Request Log Table**
   - **id (INT, PRIMARY KEY):** Unique identifier for each request log.
   - **user_input_id (INT, FOREIGN KEY):** Links to the User Input Table.
   - **tokens_used (INT):** Number of tokens used in the OpenAI API call.
   - **cost (DECIMAL):** Cost incurred for the API call.
   - **timestamp (TIMESTAMP):** Date and time when the request was processed.

## To-Do List

- **Login System:** Implement authentication to allow users to save and access their mindmaps.
- **Map Auto-Completion:** Add functionality for auto-completing the mindmap structure based on predefined templates.
- **UI Adjustments:**
  - Update heading, navbar, and other UI elements to improve user experience.
  - Implement filtering and sorting options for displaying mindmap nodes.
  - Fix bugs related to the UI filter tree (see issue: [React Hook Form Discussion](https://github.com/orgs/react-hook-form/discussions/11379)).

---
