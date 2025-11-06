# blog-project
Personal training project : Javascript certification project

# Goals
- Practiced DOM manipulation and event delegation in JavaScript
- Use of external API and manage asynchronous function
- Creation of modal to validate user choice

# Features
- Article page : display article from backend using fetch with an external API and awaiting for response
- Filter out articles using categories : toggle on and off filters
- Filter articles using date
- Convert article dates from ISO format to a readable string using `toLocaleString()`.
- Form page: allows users to add a new article or edit an existing one (using dataset to retrieve article id) using POST and PATCH HTTP request.
- Handle wrong form (if lacks input)
- Modal opening for deleting article or cancelling creation (or edition) of articles. Event delegation, custom promise to handle the response (actually deleting article or cancelling form)

# 🔧 Installation
## Setup
1. Start container and build image
```bash
docker compose up --build -d
```
*Note: -d = detached, allows to get control of terminal while the container is running in background*

2. Simple start and stop if already built
```bash
docker compose start
docker compose stop
```

3. Build and get preview of project
```bash
docker compose exec dev bash -c "npm run build && npm run preview"
```
*Note: Unless you run this command, you only get the development environment.*

4. Delete everything when you are done
```bash
docker compose down -v
```
*Note: -v = volume, will delete the volume of node_modules instead of keeping it in the docker volume folder and keep storage room for nothing*

## Access to project
Using vite, you usually need to go to `http://localhost:5173`, but as I have already other project running on that port,  I changed in to `http://localhost:5174`.

# Project structure
```
📦 blog_project
 ┣ .gitignore
 ┣ 🐋 docker-compose.yml
 ┣ 🐋 Dockerfile
 ┣ package-lock.json
 ┣ package.json
 ┣ 📝 README.md
 ┣ vite.config.js
 ┗ 📂 src
    ┣ index.html
    ┣ index.js
    ┗ 📂 assets
       ┣ 📂 images
       ┃  ┗ plateforme-tracker.png
       ┣ 📂 javascripts
       ┃  ┣ modal.js
       ┃  ┗ topbar.js
       ┣ 📂 style
       ┃  ┣ form.scss
       ┃  ┣ index.scss
       ┃  ┣ style.scss
       ┃  ┣ _classes.scss
       ┃  ┣ _media-queries.scss
       ┃  ┣ _native-tag.scss
       ┃  ┣ _reset.scss
       ┃  ┣ _utils.scss
       ┃  ┗ _variables.scss
       ┗ 📂 form
          ┣ form.html
          ┗ form.js
```