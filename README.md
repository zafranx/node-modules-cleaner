🧹 Node Modules Finder (Web Version)
This is a web-based tool built using Next.js that helps you explore the contents of the node_modules directory of your local project. It scans the filesystem on the server side and displays the folder structure through a modern React interface.

⚠️ This version is intended for local development use only. It relies on server-side file access and should not be deployed publicly without strict security controls.

📦 Features
✅ Built using Next.js with App Router or Pages Router

✅ Server-side scanning of the node_modules folder

✅ Simple UI for listing installed packages

✅ Automatically updates list when revisiting the page

✅ Uses built-in API route for scanning filesystem

🚀 Getting Started
Follow these steps to run the app locally.

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/node-modules-finder-web.git
cd node-modules-finder-web
2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Run the Development Server
bash
Copy
Edit
npm run dev
# or
yarn dev
Now, open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
📁 Project Structure
pgsql
Copy
Edit
.
├── pages/
│   ├── index.tsx              # Main UI to show node_modules
│   └── api/
│       └── read-node-modules  # API route to read directories
│
├── utils/
│   └── fileUtils.ts           # Logic to read folders using fs
│
├── public/
├── styles/
├── package.json
🧰 Technologies Used
Next.js

React

Node.js fs module

⚠️ Disclaimer
This application accesses your file system through Node.js and is meant to be run locally only. Do not deploy this to a production server or expose it over the internet without implementing proper authentication and sandboxing.
