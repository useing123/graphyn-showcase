# How to Run This Project

This document provides instructions on how to set up and run both the frontend and backend of this application.

## Frontend (React Native with Expo)

The frontend is a React Native application built with Expo.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [Expo Go](https://expo.dev/go) app on your mobile device (for testing on a physical device) or an Android/iOS simulator.

### Setup and Running

1.  **Install dependencies:**
    Open a terminal in the project root directory (`graphyn-showcase`) and run:
    ```bash
    npm install
    ```

2.  **Start the development server:**
    After the installation is complete, start the Expo development server by running:
    ```bash
    npm start
    ```
    This will open a new tab in your web browser with the Expo Developer Tools.

3.  **Run the app:**
    *   **On a physical device:** Scan the QR code from the Expo Developer Tools using the Expo Go app on your iOS or Android phone.
    *   **On an iOS Simulator:** Press `i` in the terminal where the development server is running.
    *   **On an Android Emulator:** Press `a` in the terminal where the development server is running.
    *   **In a web browser:** Press `w` in the terminal.

## Backend (Encore)

The backend is an Encore project. For detailed instructions on how to set up and run the backend, please refer to the `README.md` file in the backend repository.

*   **Backend Repository:** [https://github.com/useing123/encore_dev_backend_showcase](https://github.com/useing123/encore_dev_backend_showcase)

## Project Feedback

Here are some thoughts on the development process and the project itself:

> Claude code nice but console interface worst than launching this app with vscode extentions,
>
> I can run graphyn it helps me outline first project architecture and stack picking but when we code solution, we have many bugs and it looped on basic errors and I need to help with another tools, and claude code doenst have access to mcp server that will do life harder
>
> It was fun task, I decided to do mobile finance tracking app + Ai agent that will help with tracking, easy to bootstrap project and we can implement more ai features but now I do only chat interface, in future we can add ai powered roast, ai powered fill of transactions, ai powered prediction(we need specific dataset)