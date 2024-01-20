# GitHub User Repositories Viewer

## Introduction

This project is designed to fetch and display GitHub user information and their public repositories. It includes a simple form for inputting a GitHub username, after which it renders the user's details and their public repositories.

## Running the Project Locally

1. **Clone the Repository:** Clone the project to your local machine using:

   ```bash
   git clone https://github.com/farhanalws4u/repository_visualizer.git
   ```

2. **Open with Visual Studio Code:** Open the project in Visual Studio Code.

3. **Live Server Extension:** Ensure you have the Live Server extension installed in VS Code.

4. **Launch the Project:** Open `index.html`, right-click on the file, and select "Open with Live Server". The project should now open in your default web browser.

## Hosted Project

Access the live version of the project [here](https://farhanalws4u.github.io/repository_visualizer/).

## Features and Enhancements

### Additional Changes

- **Fork Count in Repository Card:** Each repository card now displays the number of forks.
- **Repository Link:** Direct link to the GitHub repository on each card for easy access.

### Project Functionalities

- **User Information:** Fetches and displays GitHub user's name, bio, and profile picture.
- **Public Repositories:** Renders public repositories in a card format.
- **Server-Side Pagination:** Implements pagination to handle repository display.
- **Repositories Selector:** A dropdown to select the number of repositories to be shown per page.
- **Loading Indicator:** Shows a loader animation while fetching data from GitHub's API.
- **Input Form:** A simple form to enter a GitHub username.
