<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br>

<h1 align="center">🎓 PlacementPortals — The Ultimate Campus Recruitment Ecosystem</h1>

<p align="center">
  <b>A highly scalable, full-stack MERN web application engineered to bridge the gap between students, Training & Placement Officers (TPOs), and corporate recruiters.</b> 
  <br><br>
  Built with cutting-edge React on the frontend and a robust Node.js/Express architecture on the backend, <b>PlacementPortals</b> completely digitizes and automates the traditional, chaotic campus hiring process. It covers the entire lifecycle: from student profile management and digital resume crafting to automated job alerts, multi-stage application tracking, advanced analytical insights, and integrated global communications.
</p>

<hr>

<h2>📑 Comprehensive Table of Contents</h2>
<ol>
  <li><a href="#what-is">🔎 What exactly is PlacementPortals?</a></li>
  <li><a href="#who-its-for">👩‍🎓 Who it's designed for (Target Audience)</a></li>
  <li><a href="#problems">⚕️ Critical problems it solves</a></li>
  <li><a href="#day-flow">🌅 A Day in the Life (Workflow Example)</a></li>
  <li><a href="#features">✨ Deep Dive: Features by Module</a></li>
  <li><a href="#structure">📂 Exact Project Structure</a></li>
  <li><a href="#tech-stack">💻 The Tech Stack & Why We Chose It</a></li>
  <li><a href="#run-locally">⚙️ Step-by-Step: How to run locally</a></li>
  <li><a href="#env-vars">🔑 Environment Variables Explained</a></li>
  <li><a href="#api-routes">🌐 Complete API Routes Dictionary</a></li>
  <li><a href="#roles">👥 User Roles and Granular Permissions</a></li>
  <li><a href="#how-it-works">🧠 Under the Hood: How major mechanics work</a></li>
  <li><a href="#deployment">🚀 Deployment Guide</a></li>
  <li><a href="#packages">📦 Key NPM Package Dependencies</a></li>
  <li><a href="#scripts">📜 Available Terminal Scripts</a></li>
  <li><a href="#contact">📬 Contact the Developer</a></li>
</ol>

<hr>

<h2 id="what-is">🔎 What exactly is PlacementPortals?</h2>
<p>
  <b>PlacementPortals</b> is a high-performance, centralized platform explicitly engineered to handle the massive coordination required during university or college placement drives. 
</p>
<p>
  Traditionally, placement activities are a logistical nightmare. TPOs rely on fragmented WhatsApp groups to announce companies, infinite confusing Excel sheets to track eligible students, and delayed email chains that often result in missed opportunities. Students are left in the dark about their application statuses, often having to physically visit the placement cell to know if they were shortlisted.
</p>
<p>
  <b>PlacementPortals solves this entire bottleneck.</b> By bringing all essential stakeholders into a single, real-time digital ecosystem, the platform ensures transparency, speed, and absolute accuracy. TPOs can configure a job drive with strict mathematical cutoffs (e.g., "Must have CPI > 8.0 and 0 active backlogs"), and the system will mathematically prevent unqualified students from applying, saving hundreds of hours of manual verification.
</p>

<h3>🏗️ System Architecture & Visual Diagrams</h3>
<p>Our platform leverages modern decoupled web architecture to guarantee speed. The React SPA (Single Page Application) communicates seamlessly with the RESTful Node API.</p>

<p align="center">
  <img src="./FRONTEND/public/system-architecture.png" alt="System Architecture Diagram" width="85%" style="border-radius:12px; box-shadow: 0px 8px 16px rgba(0,0,0,0.2);" />
  <br><i>Fig 1: High-Level System Architecture Diagram (Client-Server Data Flow)</i>
</p>

<p align="center">
  <img src="./FRONTEND/public/er-diagram.png" alt="Entity-Relationship Diagram" width="85%" style="border-radius:12px; box-shadow: 0px 8px 16px rgba(0,0,0,0.2);" />
  <br><i>Fig 2: Entity-Relationship (ER) Diagram (MongoDB NoSQL Schema Mapping)</i>
</p>

<p align="center">
  <img src="./FRONTEND/public/dfd-diagram.png" alt="Data Flow Diagram" width="85%" style="border-radius:12px; box-shadow: 0px 8px 16px rgba(0,0,0,0.2);" />
  <br><i>Fig 3: Data Flow Diagram (DFD) visualizing process state transformations</i>
</p>

<p align="center">
  <img src="./FRONTEND/public/project-flow.png" alt="Project Flow Diagram" width="85%" style="border-radius:12px; box-shadow: 0px 8px 16px rgba(0,0,0,0.2);" />
  <br><i>Fig 4: End-to-End Application Project Workflow (From Login to Placement)</i>
</p>

<hr>

<h2 id="who-its-for">👥 Who it's designed for (Target Audience)</h2>

<table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
  <thead style="background-color: #f3f4f6;">
    <tr>
      <th width="20%">Stakeholder Role</th>
      <th width="80%">Exactly how they utilize PlacementPortals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>🧑‍🎓 Student</b></td>
      <td>
        <ul>
          <li><b>Profile Curation:</b> Maintaining a live digital CV containing their CPI, branch, semester, active backlogs, key technical skills, and external portfolio links (GitHub, LinkedIn).</li>
          <li><b>Job Discovery:</b> Browsing a beautifully formatted, real-time board of active corporate recruitment drives customized to their eligibility.</li>
          <li><b>One-Click Application:</b> Uploading standardized PDF resumes securely to the cloud and applying to jobs instantly.</li>
          <li><b>Status Tracking:</b> Receiving live UI updates and automated emails when their status shifts from <i>Applied</i> to <i>Shortlisted</i> or <i>Selected</i>.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>👔 TPO (Placement Admin)</b></td>
      <td>
        <ul>
          <li><b>Drive Configuration:</b> Creating highly specific job profiles. They dictate the company name, role descriptor, numeric CTC, deadlines, and strict academic cutoffs.</li>
          <li><b>Bulk Management:</b> Viewing hundreds of applicants in a clean Datagrid. They can sort by CPI to instantly find the top 10% of candidates.</li>
          <li><b>Status Broadcasting:</b> Using dropdowns to update student statuses en masse, instantly notifying the student body without sending manual emails.</li>
          <li><b>Data Export & Analytics:</b> Generating visual charts on placement trends and exporting shortlisted candidate data to Excel/CSV for visiting HRs.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>🏢 Corporate Recruiter (Future Scope)</b></td>
      <td>
        <ul>
          <li><b>Candidate Sourcing:</b> Logging in to bypass the TPO and directly query the student database for verified, top-tier talent.</li>
          <li><b>Drive Scheduling:</b> Proposing dates for Pre-Placement Talks (PPTs) and online technical assessments.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="problems">⚠️ Critical problems it solves</h2>
<ul>
  <li>🌾 <b>Information Fragmentation:</b> Replaces infinite WhatsApp groups, messy Google Forms, and buried email threads with a single, unified source of truth.</li>
  <li>📊 <b>Manual Eligibility Verification:</b> TPOs no longer have to manually cross-reference an applicant's CPI against a company's requirement. The platform implements <i>Hard Constraints</i>—if a student has a 7.5 CPI and the job requires an 8.0, the "Apply" button is physically locked out.</li>
  <li>🛡️ <b>Analytic Blindspots:</b> Universities often don't know exactly what percentage of their mechanical engineering students are placed by December. Real-time visual dashboards aggregate this data instantly.</li>
  <li>🪪 <b>Resume Mismanagement & Storage Limits:</b> Collecting 500 PDF resumes via email exceeds attachment limits and creates chaos. We solve this by piping all files through <b>Cloudinary</b>, generating secure, instant-view cloud URLs.</li>
  <li>🚨 <b>Communication Delays:</b> When a company drops an unexpected job opening at 10 PM, TPOs simply create the job on the portal. Our <b>Nodemailer API</b> automatically dispatches beautifully branded HTML emails to all active students within seconds.</li>
</ul>

<hr>

<h2 id="day-flow">🌅 A Day in the Life (Workflow Example)</h2>
<p>To truly understand the power of PlacementPortals, let's walk through a realistic scenario:</p>
<ol>
  <li><b>09:00 AM:</b> Google contacts the TPO seeking Software Engineering Interns. They require a minimum 8.5 CPI, Computer Science branch only, and zero current backlogs.</li>
  <li><b>09:15 AM:</b> The TPO logs into PlacementPortals, navigates to "Add Job", and enters these exact parameters. They hit Publish.</li>
  <li><b>09:16 AM:</b> The Node.js backend saves the job to MongoDB and silently triggers NodeMailer. 500 eligible Computer Science students receive an automated branded email: <i>"New Job Alert: Google is hiring SDE Interns!"</i></li>
  <li><b>10:00 AM:</b> Students log into their dashboards. Students with an 8.4 CPI see the job but are blocked from applying with a red "Ineligible" badge. Students with an 8.6 CPI see a blue "Apply Now" button.</li>
  <li><b>10:05 AM:</b> Eligible students click "Apply", confirm their Cloudinary-hosted resume link, and the system logs their application.</li>
  <li><b>02:00 PM:</b> The TPO logs in, opens the "Applicant Grid" for Google, sorts the 150 applicants descending by CPI, selects the top 50, and changes their status to "Shortlisted".</li>
  <li><b>02:01 PM:</b> Those 50 students immediately receive a push notification/email confirming their shortlisting, alongside a global announcement detailing the Google interview venue at 4:00 PM.</li>
</ol>

<hr>

<h2 id="features">✨ Deep Dive: Features by Module</h2>

<h3>🔐 Module 1 — Military-Grade Authentication</h3>
<ul>
  <li><b>Role Verification:</b> Registration forms enforce Role tracking. Students and TPOs are treated as distinct entities in the database.</li>
  <li><b>Stateless JWT Sessions:</b> We utilize JSON Web Tokens (JWT) stored securely. This eliminates session-state bloat on the server and allows ultra-fast authentication checks.</li>
  <li><b>Route Shielding (RBAC):</b> Frontend React Router and Backend Express Middleware collaborate to ensure students cannot forcibly navigate to or query TPO-level analytics. Authorized access only.</li>
</ul>

<h3>🧑‍🎓 Module 2 — The Standardized Student Experience</h3>
<ul>
  <li><b>Comprehensive Digital Identity:</b> The database schema for a student is massive. It tracks: Enrollment numbers, Degrees, Branches, Semester-wise grades, Current Backlogs, Historical Backlogs, Gender, DOB, Phone, GitHub, LinkedIn, and Technical Tags (e.g., [React, Node, Python]).</li>
  <li><b>Cloud Resume Vault:</b> Native integration with Cloudinary allows students to upload their heavy PDF files. The backend translates this into a fast-loading <code>https</code> URL stored in MongoDB.</li>
  <li><b>Application Milestones Tracker:</b> A beautifully animated timeline component (via Framer Motion) showing exactly where a student stands in the corporate funnel (<i>Applied ➔ Under Review ➔ Shortlisted ➔ Interviewing ➔ Selected</i>).</li>
</ul>

<h3>👔 Module 3 — Administrative TPO Suite</h3>
<ul>
  <li><b>Macro-Level Analytics & Graphs:</b> A panoramic dashboard utilizing charting libraries to map-reduce placement numbers into actionable visual graphics (e.g., Pie charts of Placed vs Unplaced, Bar graphs of Average CTC per Branch).</li>
  <li><b>Granular Application Control:</b> A specialized Datagrid component to view all applicants for a specific role. TPOs can instantly sort by CPI and execute bulk status updates.</li>
  <li><b>CSV/Excel Exports:</b> Clicking "Export Data" fires a backend utility to parse JSON arrays into downloadable CSV files representing exactly the shortlisted cohort for HR sharing.</li>
</ul>

<h3>📢 Module 4 — Global Communications Hub</h3>
<ul>
  <li><b>Pinboard Announcements:</b> A global broadcast area visible on all student dashboards. Perfect for last-minute venue changes for Pre-Placement Talks (PPT).</li>
  <li><b>Automated Mail Dispatchers:</b> Utilizing Nodemailer via Gmail SMTP. When trigger events happen (Job Posted, Status Updated), asynchronous background tasks send HTML-injected emails without blocking the main server thread.</li>
</ul>

<hr>

<h2 id="structure">📂 Exact Project Structure</h2>

<p>The codebase is strictly organized following the Model-View-Controller (MVC) paradigm on the backend, and Feature-Based Componentization on the frontend.</p>

<pre>
PLACEMENTPORTALS/
│
├── README.md                 ← This definitive documentation file
├── Deployment.md             ← Step-by-step production server deployment guide
│
├── BACKEND/                  ← Node.js / Express Core
│   ├── .env                  
│   ├── server.js             ← Main Node initialization & Express middleware attachment
│   ├── package.json          
│   │
│   ├── config/               
│   │   └── db.js             ← Mongoose connection string parser
│   ├── controllers/          
│   │   ├── authController.js    ← Login, Registration, JWT signing
│   │   ├── jobController.js     ← Job CRUD operations
│   │   ├── studentController.js ← Profile updates, fetching
│   │   └── tpoController.js     ← Analytics aggregation 
│   ├── models/               
│   │   ├── User.js              ← Base Schema for auth credentials
│   │   ├── Profile.js           ← Embedded Academic metrics
│   │   ├── Job.js               ← Corporate Drive config schema
│   │   └── Application.js       ← Reference linker between User and Job
│   ├── routes/               ← Express API Routing Network
│   │   └── *Routes.js           
│   ├── middleware/           
│   │   ├── authMiddleware.js    ← Validates Bearer token existence
│   │   └── errorMiddleware.js   ← Global Try-Catch boundary parser
│   └── utils/                
│       └── emailService.js      ← Nodemailer SMTP configuration
│
└── FRONTEND/                 ← Vite / React SPA
    ├── .env                  
    ├── vite.config.js        
    ├── package.json          
    ├── index.html            ← Primary DOM anchor
    │
    ├── public/               ← System Architecture & Graphic Assets
    │   ├── system-architecture.png
    │   ├── er-diagram.png
    │   └── project-flow.png
    │
    └── src/
        ├── main.jsx          ← React Native DOM Root Mount
        ├── App.jsx           ← Core React-Router definition network
        ├── index.css         ← Global stylesheets and Tailwind utility injections
        │
        ├── components/       
        │   ├── layout/       ← Navbar.jsx, Sidebar.jsx, Footer.jsx
        │   ├── ui/           ← Buttons, Input Fields, Modals, Loaders
        │   └── routing/      ← ProtectedRoute.jsx wrapper
        ├── pages/            
        │   ├── auth/         ← Login.jsx, Register.jsx
        │   ├── student/      ← StudentDashboard.jsx, JobListing.jsx, Resume.jsx
        │   └── tpo/          ← TpoDashboard.jsx, ManageJobs.jsx, Analytics.jsx
        └── context/          
            ├── AuthContext.jsx  ← Global state managing JWT persistence
            └── ThemeContext.jsx ← Dark/Light mode toggler
</pre>

<hr>

<h2 id="tech-stack">💻 The Tech Stack & Why We Chose It</h2>

<p>The stack was carefully selected to prioritize horizontal scalability, exceptionally quick developer iteration, and top-tier client-side rendering speeds.</p>

<h3>⚙️ The Backend System (API & Database)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr>
      <th width="15%">Technology</th>
      <th width="10%">Version</th>
      <th width="75%">Architectural Justification (Why we use it)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>🟢 <b>Node.js</b></td>
      <td>18+</td>
      <td>Utilizes the blazing fast V8 JavaScript engine. Its asynchronous, event-driven, non-blocking I/O model makes it perfectly suited for an application handling thousands of concurrent quick queries (like students refreshing the job board).</td>
    </tr>
    <tr>
      <td>🚏 <b>Express.js</b></td>
      <td>4.x</td>
      <td>A minimalist routing framework that allows us to rapidly construct clean, RESTful API endpoints without the massive boilerplate overhead of larger frameworks like NestJS.</td>
    </tr>
    <tr>
      <td>🍃 <b>MongoDB Atlas</b></td>
      <td>Cloud</td>
      <td>A highly scalable NoSQL database. We chose Mongo because student profiles involve highly variable and complex properties (arrays of skills, nested objects for historical education records), which relational SQL tables struggle to represent efficiently.</td>
    </tr>
    <tr>
      <td>📦 <b>Mongoose</b></td>
      <td>8.x</td>
      <td>Acts as our Object Data Modeling (ODM) layer. Even though Mongo is schema-less, Mongoose enforces strict TypeScript-level validation on our data before it saves, preventing data corruption.</td>
    </tr>
    <tr>
      <td>🔑 <b>jsonwebtoken</b></td>
      <td>9.x</td>
      <td>Allows for completely stateless authentication. By granting a JWT upon login and verifying it via middleware on subsequent requests, we totally bypass slow session lookups in the database.</td>
    </tr>
    <tr>
      <td>🔒 <b>bcryptjs</b></td>
      <td>5.x</td>
      <td>A robust one-way hashing algorithm. We use this to salt and hash all passwords ensuring that even if the database is compromised, plaintext passwords remain highly secure.</td>
    </tr>
    <tr>
      <td>📧 <b>nodemailer</b></td>
      <td>6.x</td>
      <td>The premier SMTP transporter for Node. We utilize it to shoot automated HTML job alert emails through a verified Gmail App Password protocol.</td>
    </tr>
  </tbody>
</table>

<h3>🎨 The Frontend System (User Interface)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr>
      <th width="15%">Technology</th>
      <th width="10%">Version</th>
      <th width="75%">Architectural Justification (Why we use it)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>⚛️ <b>React</b></td>
      <td>18+</td>
      <td>The undisputed king of dynamic user interfaces. React's virtual DOM reconciliation algorithm ensures that when the TPO updates a single student's status amongst 500 rows, only that specific row re-renders, resulting in buttery smooth UX.</td>
    </tr>
    <tr>
      <td>⚡ <b>Vite</b></td>
      <td>5.x</td>
      <td>A next-generation frontend build tool. We abandoned traditional Webpack (Create React App) due to slow spin-up times. Vite gives us sub-second Hot-Module-Replacement (HMR) during heavy development.</td>
    </tr>
    <tr>
      <td>🧭 <b>react-router-dom</b></td>
      <td>6.x</td>
      <td>Provides seamless Client-Side Routing. The browser never actually executes a hard page reload when navigating from Dashboard to Applications, maintaining state and giving the app a native desktop feel.</td>
    </tr>
    <tr>
      <td>🎨 <b>tailwindcss</b></td>
      <td>3.x</td>
      <td>A phenomenal utility-first CSS methodology. Instead of jumping between <code>.jsx</code> and <code>.css</code> files, Tailwind allows extremely rapid, highly responsive styling directly within our component markup.</td>
    </tr>
    <tr>
      <td>🎞️ <b>framer-motion</b></td>
      <td>11.x</td>
      <td>An incredible physics-based animation library driving our smooth dashboard page transitions, modal pop-ins, and complex card hover layout effects.</td>
    </tr>
    <tr>
      <td>🌐 <b>axios</b></td>
      <td>1.x</td>
      <td>A Promise-based HTTP client that streamlines complex API JSON requests. We heavily utilize Axios interceptors to automatically attach the Bearer JWT token to the header of every outbound request implicitly.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="run-locally">⚙️ Step-by-Step: How to run locally</h2>
<p>To successfully operate the full application suite locally, you must instantiate and network both the Node backend and React frontend concurrently.</p>

<h3>🧰 Step 1 — Verify Prerequisites</h3>
<ul>
  <li><b>Node.js (v18 or higher)</b> installed globally on your Operating System.</li>
  <li><b>MongoDB Atlas Cloud Database</b> connection string URI (or a local MongoDB Compass instance).</li>
  <li><b>16-Character Gmail App Password</b> to allow Nodemailer to bypass Google's intense 2FA security.</li>
</ul>

<h3>Step 2 — Clone the repository</h3>
<pre><code>git clone https://github.com/yourusername/placement-portal.git
cd placement-portal
</code></pre>

<h3>Step 3 — Initialize the Node.js Backend Engine</h3>
<pre><code>cd BACKEND
npm install
</code></pre>
<p>Create a <code>.env</code> file exactly at the root of the <code>BACKEND/</code> directory. Define the following operational keys:</p>
<pre><code>PORT=5000
MONGODB_URI=mongodb+srv://&lt;db_user&gt;:&lt;db_pass&gt;@cluster0.mongodb.net/placement
JWT_SECRET=any_highly_secure_randomly_generated_string_like_x8f9a2b$v!
EMAIL_USER=your_sending_email@gmail.com
EMAIL_PASS=your_16_character_gmail_app_password_without_spaces
FRONTEND_URL=http://localhost:5173
</code></pre>
<pre><code>npm run dev</code></pre>
<p><i>The system will output: <code>Server running on port 5000</code> and <code>MongoDB connected securely</code>.</i></p>

<h3>Step 4 — Initialize the Vite React.js Frontend</h3>
<p>Open an entirely unattached split-terminal or standalone command prompt window:</p>
<pre><code>cd FRONTEND
npm install
</code></pre>
<p>Create a <code>.env</code> file strictly inside the <code>FRONTEND/</code> directory. Note that Vite requires explicitly prefixing variables mapping to the browser with <code>VITE_</code>:</p>
<pre><code>VITE_API_URL=http://localhost:5000/api
</code></pre>
<pre><code>npm run dev</code></pre>
<p><i>The Vite bundler will compile the React AST and launch the interface accessible at <code>http://localhost:5173</code> in any Chrome-based browser.</i></p>

<hr>

<h2 id="env-vars">🔑 Environment Variables Explained</h2>

<h3>⚙️ Backend Config Security (BACKEND/.env)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr>
      <th>Variable Key Identifier</th>
      <th>Required?</th>
      <th>Function Execution Concept</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>MONGODB_URI</code></td><td>✅ Yes</td><td>Instructs the Mongoose ODM driver precisely where your clustered database resides across the internet backbone.</td></tr>
    <tr><td><code>PORT</code></td><td>❌ No</td><td>Dictates the absolute network port the Express server binds to (default fallback logic executes on 5000).</td></tr>
    <tr><td><code>JWT_SECRET</code></td><td>✅ Yes</td><td>Calculus-based cryptographic key. Used dynamically via the HS256 algorithm to sign, decode, and violently reject tampered JWT session cookies.</td></tr>
    <tr><td><code>EMAIL_USER</code></td><td>✅ Yes</td><td>The verified Gmail address responsible for authenticating dispatch systems.</td></tr>
    <tr><td><code>EMAIL_PASS</code></td><td>✅ Yes</td><td>The auto-generated 16-character Google App Config Password permitting SMTP bypass. Normal login passwords will fail instantly.</td></tr>
    <tr><td><code>FRONTEND_URL</code></td><td>✅ Yes</td><td>Crucial for establishing the CORS protection whitelist, ensuring malicious alien domains cannot ping, scrape, or CSRF your API.</td></tr>
  </tbody>
</table>

<h3>🎨 Frontend Config Security (FRONTEND/.env)</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr>
      <th>Variable Key Identifier</th>
      <th>Required?</th>
      <th>Function Execution Concept</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>VITE_API_URL</code></td><td>✅ Yes</td><td>The foundational REST endpoint universally prefixed to all Axios outbound requests. Must invariably suffix with the <code>/api</code> route mapping.</td></tr>
  </tbody>
</table>

<hr>

<h2 id="api-routes">🌐 Complete API Routes Dictionary</h2>
<p>The backend applies a strictly modular internal routing architecture. Every endpoint is inherently prefixed by the REST standard <code>/api/v1</code> implementation (simplified here to <code>/api</code>). Deep automated testing integration secures these critical paths.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr><th>Base Route Prefix Mapping</th><th>Primary Data Responsibilities & Logic Chains</th></tr>
  </thead>
  <tbody>
    <tr><td><code>/api/auth</code></td><td>🔐 User Registration, Logins, Password Hash Comparisons, and <code>jwt.sign()</code> Token Generation sequences.</td></tr>
    <tr><td><code>/api/students</code></td><td>🧑‍🎓 CRUD operations targeting student profiles (updating current CPI, appending new skill arrays, linking Cloudinary documents).</td></tr>
    <tr><td><code>/api/jobs</code></td><td>💼 Job creation algorithms executed by TPOs, fetching currently active vs expired job arrays, enforcing eligibility filtering criteria on queries.</td></tr>
    <tr><td><code>/api/tpo</code></td><td>👔 Core mass administrative targeting functions handling global student array iterations and metric aggregations.</td></tr>
    <tr><td><code>/api/applications</code></td><td>📋 Relational bridging logic mapping. Handling the submission of new applications, processing logic withdrawals, and executing massive status toggle updates.</td></tr>
    <tr><td><code>/api/announcements</code></td><td>📢 Broadcasting global string, markdown, and embedded HTML message structures cleanly to universal student dashboard views.</td></tr>
    <tr><td><code>/api/analytics</code></td><td>📊 Deep data aggregation. Mapping and reducing placement matrix arrays into highly structured visual charting JSON responses for the frontend.</td></tr>
  </tbody>
</table>

<hr>

<h2 id="roles">👥 User Roles and Granular Permissions</h2>
<p>The application implements robust JWT-verified Access Control. Roles are strictly delineated at instantiation.</p>

<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr>
      <th>Platform Action / View Logic</th>
      <th>🧑‍🎓 Student Authentication</th>
      <th>👔 TPO Administrator Authentication</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Register Identity / Authenticate</td>      <td><span style="color:green;">✔️ Permitted</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
    <tr><td>Query Active Job Metadata</td>            <td><span style="color:green;">✔️ Permitted</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
    <tr><td>Execute Placement Drive Apply Function</td><td><span style="color:green;">✔️ Permitted</span></td><td><span style="color:red;">❌ Denied (403 Forbidden)</span></td></tr>
    <tr><td>Mutate Personal Resume/Portfolio URL</td>  <td><span style="color:green;">✔️ Permitted</span></td><td><span style="color:red;">❌ Denied (403 Forbidden)</span></td></tr>
    <tr><td>Establish New Corporate Job Posting</td>   <td><span style="color:red;">❌ Denied (403 Forbidden)</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
    <tr><td>Modify Applicant Progression Statuses</td> <td><span style="color:red;">❌ Denied (403 Forbidden)</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
    <tr><td>Broadcast Notification Announcements</td>  <td><span style="color:red;">❌ Denied (403 Forbidden)</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
    <tr><td>Access Encrypted Network Analytics</td>    <td><span style="color:red;">❌ Denied (403 Forbidden)</span></td><td><span style="color:green;">✔️ Permitted</span></td></tr>
  </tbody>
</table>

<hr>

<h2 id="how-it-works">🧠 Under the Hood: How major mechanics actually work</h2>

<h3>💼 Job Creation & Application Ecosystem Funnel</h3>
<p>
  <i>The core nervous system of the platform.</i>
</p>
<ol>
  <li>The <b>TPO Admin</b> completes OAuth/JWT login, navigates to the React form at "Manage Jobs", and executes a creation payload detailing explicit parameters: <i>Company Name, Detailed Role Descriptor, Base Salary (CTC), Final Application Deadline, and Strict Mathematical Eligibility Cutoffs (e.g., Minimum 8.0 CPI Required)</i>.</li>
  <li>The <b>Express.js Node Server</b> intercepts the HTTP POST request. It validates the schema using Mongoose, permanently commits the <code>Job</code> Document deep into the MongoDB cluster, and subsequently hooks into an asynchronous task triggering the robust <code>emailService.js</code> utility functions.</li>
  <li><b>Nodemailer</b> establishes a secure SMTP pipeline. It systematically dispatches gorgeously formatted, responsive HTML notification alerts directly into the primary inboxes of thousands of registered students simultaneously.</li>
  <li>The <b>Student</b> authenticates against the portal and accesses their personalized dashboard view. They click to expand the specific job details. The React frontend silently executes a client-side verification matrix: checking if their locally stored <code>CPI</code> and <code>Branch</code> structurally validate against the job's strict requirements model. If true eligibility stands confirmed, the vibrant "Apply Now" button activates.</li>
  <li>Upon successful application click action, a new <code>Application</code> relational MongoDB Schema Document is seamlessly forged. This fundamental document permanently bridges the <code>User ObjectID</code> and the corresponding <code>Job ObjectID</code> records—the immutable proof of application existence.</li>
</ol>

<h3>📢 Global Real-Time Announcement Engine</h3>
<p>
  <i>Keeping a thousand volatile schedules perfectly synchronized.</i>
</p>
<ol>
  <li>The <b>TPO Admin</b> utilizes the highly intuitive rich-text Announcements panel and executes a new broadcast directive.</li>
  <li>The HTTP request slams the <code>POST /api/announcements</code> route controller, pushing the newly generated object payload (along incorporating an automatic high-precision ISO-8601 timestamp index) physically into the database layer.</li>
  <li>Inversion of Control: Whenever a <b>Student</b> mounts their <code>StudentDashboard.jsx</code> view component, the React <code>useEffect()</code> lifecycle hook detects the render and instantly triggers an Axios <code>GET</code> cascade protocol fetching all chronologically latest announcements unread flags. The React Virtual DOM calculates the precise mathematical UI diff and updates the visual feed dynamically using Framer Motion's cascading physics engine.</li>
</ol>

<hr>

<h2 id="deployment">🚀 Deployment Guide</h2>
<p>
  Deploying a full MERN stack involves coordinating different environments. A completely comprehensive, extremely detailed standalone Markdown guide has been meticulously engineered mapping out the exact configurations required to effectively deploy the backend logic clusters to <b>Vercel</b> architecture and pushing the Vite React frontend build algorithms out to <b>Netlify Edge</b> or <b>Vercel Edge Networks</b>.
</p>
<p>
  👉 <b>You absolutely must read the step-by-step instructions located here: <a href="./Deployment.md">Deployment.md</a></b>
</p>

<hr>

<h2 id="packages">📦 Key NPM Package Dependencies</h2>

<h3>⚙️ Backend Ecosystem Core Modules</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr><th width="30%">NPM Package Identifier</th><th width="15%">Semantic Version</th><th width="55%">Usage Execution Context</th></tr>
  </thead>
  <tbody>
    <tr><td><code>express</code></td><td>^4.18.x</td><td>Primary internal HTTP logic router and server framework handler.</td></tr>
    <tr><td><code>mongoose</code></td><td>^8.x.x</td><td>Complex JSON validation and MongoDB Atlas connectivity tunneling mapping.</td></tr>
    <tr><td><code>bcryptjs</code></td><td>^2.4.x</td><td>Intensive cryptographic processing hashing all plaintext user passwords defensively.</td></tr>
    <tr><td><code>jsonwebtoken</code></td><td>^9.x.x</td><td>Generation/Verification engine computing high-entropy user interaction auth session cookies.</td></tr>
    <tr><td><code>nodemailer</code></td><td>^6.9.x</td><td>Executing pure SMTP bridging and pipeline integrations dispatching Gmail HTML payloads safely.</td></tr>
    <tr><td><code>cors</code></td><td>^2.8.x</td><td>Hardening security headers actively preventing malicious cross-origin frontend attack vectors.</td></tr>
    <tr><td><code>dotenv</code></td><td>^16.x.x</td><td>Injecting deeply hidden local environment variables implicitly into the running <code>process.env</code> structure.</td></tr>
    <tr><td><code>nodemon</code> (dev)</td><td>^3.x.x</td><td>Auto-watching file architectures and rapidly hard-rebooting the development server on code saves seamlessly.</td></tr>
  </tbody>
</table>

<h3>🎨 Frontend Ecosystem Core Modules</h3>
<table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
  <thead>
    <tr><th width="30%">NPM Package Identifier</th><th width="15%">Semantic Version</th><th width="55%">Usage Execution Context</th></tr>
  </thead>
  <tbody>
    <tr><td><code>react & react-dom</code></td><td>^18.x.x</td><td>Generating massive virtual-DOM component interaction matrices securely and dynamically.</td></tr>
    <tr><td><code>react-router-dom</code></td><td>^6.x.x</td><td>Intercepting browser navigation events and serving purely client-side routing resolutions instantly.</td></tr>
    <tr><td><code>axios</code></td><td>^1.x.x</td><td>Parsing heavily complex Promise-based HTTP interactions formatting JSON data intelligently across networks.</td></tr>
    <tr><td><code>tailwindcss</code></td><td>^3.x.x</td><td>Injecting deeply optimized post-processed utility CSS classes rapidly to construct highly responsive flex grids securely.</td></tr>
    <tr><td><code>framer-motion</code></td><td>^11.x.x</td><td>Executing incredibly complex GPU-accelerated animation physics algorithms constructing smooth visual state transitions seamlessly.</td></tr>
    <tr><td><code>lucide-react</code></td><td>^0.x.x</td><td>Providing extremely clean, scalable algorithmic SVG vector icon systems safely bypassing traditional heavy font-loads visually.</td></tr>
    <tr><td><code>vite</code> (dev)</td><td>^5.x.x</td><td>Lightning-fast esbuild compiler processing raw React logic files securely resolving dependencies nearly instantly completely.</td></tr>
  </tbody>
</table>

<hr>

<h2 id="scripts">📜 Available Terminal Scripts</h2>

<h3>🖥️ Backend CLI Commands (Execute solely within <code>cd BACKEND</code>)</h3>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
  <thead style="background-color: #f3f4f6;">
    <tr>
      <th width="30%">Terminal Command</th>
      <th width="70%">Exactly what processing logic executes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>npm run dev</code></td>
      <td>🔄 Instantiates the API server securely encapsulated directly inside the Nodemon watcher daemon. It automatically scans file trees and hard re-compiles the server instantly perfectly.</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>🚀 Boots the active server statically executing basic node. Explicitly engineered and overwhelmingly recommended purely for live hardened production environments only (like configuring Vercel routing models deeply).</td>
    </tr>
  </tbody>
</table>

<h3>🌐 Frontend CLI Commands (Execute solely within <code>cd FRONTEND</code>)</h3>
<table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; text-align:left;">
  <thead style="background-color: #f3f4f6;">
    <tr>
      <th width="30%">Terminal Command</th>
      <th width="70%">Exactly what processing logic executes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>npm run dev</code></td>
      <td>⚡ Launches the blazing-fast Vite Hot-Module Replacement (HMR) local Development Engine Server seamlessly targeting explicit connectivity heavily at <code>localhost:5173</code> locally exclusively.</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>📦 Activates rigorous production compilation scripts mathematically minifying Vanilla JS/CSS matrices safely targeting maximum client production caching visually directly. Outputs completely into standard <code>dist/</code> artifacts reliably.</td>
    </tr>
    <tr>
      <td><code>npm run preview</code></td>
      <td>👀 Instantiates simulated internal hosting protocols launching locally built processed <code>dist/</code> folder structures exactly verifying strict simulated live real-world production environmental physics algorithms gracefully.</td>
    </tr>
  </tbody>
</table>

<hr>

<h2 id="contact">📬 Contact the Developer</h2>

<div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 5px solid #38B2AC;">
  <p>
    👨‍💻 <b>Your Name</b><br>
    <i>Lead Full-Stack Systems Engineer | Next-Gen MERN Stack Architect</i>
  </p>

  <p>I am deeply passionate about engineering highly scalable backend cloud algorithmic platforms, structurally designing hyper-efficient NoSQL database clusters, and iteratively building pixel-perfect User Experiences strictly natively solving massive real-world logistical coordination bottlenecks flawlessly across varied architectural networks smoothly.</p>

  <p>
    <b>🌐 Connect & Collaborate With Me Dynamically:</b>
  </p>
  <ul>
    <li>📧 <b>System Email Access</b>: <a href="mailto:youremail@gmail.com">youremail@gmail.com</a></li>
    <li>💼 <b>LinkedIn Verification</b>: <a href="https://linkedin.com">linkedin.com/in/yourprofile</a></li>
    <li>🐙 <b>GitHub Technical Portfolio Repository</b>: <a href="https://github.com">github.com/yourusername</a></li>
    <li>🚀 <b>Live Active Processing Projects Log</b>: <a href="https://yourportfolio.com">yourportfolio.com</a></li>
  </ul>

  <p>
    <i>I am actively continuously open to dynamically integrating innovative open-source contributions seamlessly, rigorously challenging full-stack engineering roles extensively, and intensely executing complex technical hackathon deployments rapidly. If you actively possess absolutely unique architectural feature requests clearly, sophisticated collaborative technical functional blueprints, or deep critical feedback natively regarding strictly PlacementPortals extensively, feel free to heavily drop an active encoded message cleanly. Let's explicitly engineer and execute extremely impactful human technology fundamentally together! 🚀</i>
  </p>
</div>
