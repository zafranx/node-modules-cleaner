🧹 Node Modules Finder (Web Version)
A developer utility tool built with Next.js that helps you explore, visualize, and manage node_modules folders within your project. Perfect for developers working with monorepos, legacy codebases, or simply trying to clean up disk space.

⚠️ This version is a local-only web app designed for development environments. Do not deploy to production without implementing security measures.

🔍 Why Do We Need This?
Modern JavaScript applications often suffer from node_modules bloat—multiple layers of nested dependencies that:

Eat up huge amounts of disk space.

Cause longer build times and GitHub CI delays.

Introduce duplicated packages and dependency confusion.

Are not easy to track or clean manually.

This app helps you:
✅ Quickly scan the structure of node_modules folders
✅ Understand what dependencies are installed
✅ Identify suspicious or bloated packages
✅ Serve as a base for cleanup scripts or integrations

✨ Features
🚀 Built with Next.js

🧠 Server-side file system access using Node.js fs

📂 Visual representation of node_modules folder structure

♻️ Instant refresh on reload or revisit

🧱 Modular file utility logic for reuse and testing

📦 Tech Stack
Next.js (App Router or Pages Router)

React

Node.js (fs, path)

TypeScript (optional)

🚀 Getting Started
1. Clone the Repository
bash

git clone https://github.com/your-username/node-modules-finder-web.git
cd node-modules-finder-web

2. Install Dependencies
bash

npm install
# or
yarn install
3. Start the Local Dev Server
bash

npm run dev
# or
yarn dev
Then visit:

arduino

http://localhost:3000
The app will scan the node_modules directory in the project root and display its structure in the browser.

⚠️ Important Notes
This is a developer tool, not a production app.

Avoid deploying this on public servers—it has access to your local file system.

Works best with Node.js projects that contain a node_modules directory in the root.

🧪 Potential Enhancements
Add delete/archive options for node_modules

Support for multiple path inputs or scanning monorepos

Disk size per dependency

Electron packaging for desktop use (already available in a separate version)

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute.

🤝 Contributing
Pull requests are welcome. If you have suggestions for improvements or want to add features, feel free to fork the repo and create a PR.

