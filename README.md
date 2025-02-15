# Log Parser Dashboard

## Overview
Log Parser Dashboard is a web application designed to parse and visualize log data efficiently. The project consists of a **Node.js** backend and a **Vue.js** frontend.

#Project Dashboard Link: [Log Parser Dashboard](https://log-parser-dashboard-aywq-git-main-sinha001s-projects.vercel.app/)

## Features
- Upload and parse log files
- Visualize logs with a user-friendly dashboard
- Filter and search log entries
- Deployable on **Vercel**

## Directory Structure
```
log-parser-dashboard/
├── Backend/          # Backend API for parsing logs
│   ├── index.js
│   ├── package.json
│   ├── parser.js
│   └── vercel.json
└── Frontend/
    └── log-dashboard/
        ├── src/
        │   ├── App.vue
        │   ├── main.js
        │   └── components/
        │       └── LogDashboard.vue
        ├── public/
        │   └── index.html
        ├── package.json
        └── vue.config.js
```

## Technologies Used
### Backend
- **Node.js**
- **Express.js**

### Frontend
- **Vue.js**
- **Vue Router**

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **Vue CLI** (for frontend development)

### Setup Backend
```sh
cd Backend
npm install
node index.js
```

### Setup Frontend
```sh
cd Frontend/log-dashboard
npm install
npm run serve
```

## Deployment
### Deploying to Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy backend:
   ```sh
   cd Backend
   vercel
   ```
3. Deploy frontend:
   ```sh
   cd Frontend/log-dashboard
   vercel
   ```

## Usage
- Start the backend server
- Run the frontend application
- Upload log files and analyze logs on the dashboard

## Demo
![Dashboard Screenshot 1](/screenshots/sample1.png)
![Dashboard Screenshot 2](/screenshots/sample2.png)
![Dashboard Screenshot 3](/screenshots/sample3.png)

## Contributing
Feel free to submit issues and pull requests via [GitHub](https://github.com/sinha001/Log-Parser_Dashboard).

## License
This project is licensed under the **MIT License**.
