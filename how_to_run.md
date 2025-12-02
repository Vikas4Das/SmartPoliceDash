

# ✅ *STEP-BY-STEP: How to Run Your Smart Police Tracker Project*

### ✔ Works on Windows, Mac, Linux

### ✔ Works for Vite + React (your project is using Vite)

---

# *1️⃣ Extract the ZIP file*

Right-click the ZIP → *Extract All*
(or unzip with WinRAR / 7zip)

➡ After extraction, you should see something like:


smart-police-frontend/
   ├── node_modules/
   ├── src/
   ├── public/
   ├── index.html
   ├── package.json
   ├── vite.config.js


---

# *2️⃣ Open the project in VS Code*

🟢 Open VS Code
🟢 Click: *File → Open Folder*
🟢 Select → smart-police-frontend

---

# *3️⃣ Delete old node_modules (if included in ZIP)*

Sometimes ZIP contains broken node_modules.
To avoid errors, remove it:


delete folder → node_modules


---

# *4️⃣ Install dependencies*

Open terminal in VS Code:


npm install


This will recreate the node_modules folder.

📌 If you see errors like "npm is not recognized", install Node.js:
👉 [https://nodejs.org](https://nodejs.org)

---

# *5️⃣ Run the development server*

After installation completes:


npm run dev


You will see something like:


  VITE v5.0.0  ready in 500 ms
  ➜  Local:   http://localhost:5173/


Click on this link to open your app in browser.

---

# *6️⃣ OPTIONAL: If you get errors*

Here are the common fixes:

---

### *❌ Error: Node version too old*

Fix:


node -v


If below 16.0, update Node from:
👉 [https://nodejs.org](https://nodejs.org)

---

### *❌ Error: Missing dependencies*

Run:


npm install


---

### *❌ Error: “vite is not recognized”*

Vite is inside your project, so run:


npm run dev


---

### *❌ Blank page / white screen*

Run:


npm run dev


Then check browser console (F12).

---

# *7️⃣ Build production version (optional)*


npm run build


---

# 📌 FINAL SUMMARY

### ✔ Extract ZIP

### ✔ Open folder in VS Code

### ✔ Delete old node_modules

### ✔ Run:


npm install
npm run dev


Your project will open at:

👉 [http://localhost:5173/](http://localhost:5173/)

