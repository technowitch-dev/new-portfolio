This is a very quick readme for future reference for myself

**Asset loading errors (MIME type "text/html")**: This happens when /build/assets/*.js return 404. The build folder must exist at public_html/build/ on the server. Either (A) manually upload and extract build.zip to public_html/build/, or (B) remove public/build from .gitignore, run npm run build, commit, and pull so the build deploys with the repo.

When deploying this to cPanel with no npm installed:
- run "composer update"
- double check gitignore and .env.example files
- run "npm ci"
- run "npm run build", fix any errors that come up
- stage and commit all changes
- Clone repo on cPanel
- create and update .env file from .env.example
- upload the /public folder and all its contents, replacing the existing one
- run "php artisan key:generate"
- create mysql database and user, adding those details into the .env file
- run "php artisan migrate --force" (not necessary if you are keeping the current database)
- run "php artisan config:cache"
- run "php artisan route:cache"
- run "php artisan view:cache"
- copy the contents of the public file into "public_html" using "cp -r public/* ~/public_html/"
- delete index.php and rename index2.php to index.php
- remove any existing public symlinks with "rm -rf ~/public_html/storage"
- add a new symlink with "ln -s ~/repositories/new-portfolio/storage/app/public ~/public_html/storage"
- verify the symlink with "ls -la ~/public_html/storage"
- designate access privelages with "chmod -R 775 storage" & "chmod -R 775 bootstrap/cache"
- delete public/hot if present in the public_html and root public folder
- ensure .htaccess is present in the public_html folder

When pulling the newest version from main:
- run "npm run build"
- zip public/build (e.g. "public/build" folder → build.zip)
- commit and sync any changes to git
- on cPanel, pull changes to the server
- copy the contents of the public file into "public_html" using "cp -r public/* ~/public_html/"
- delete index.php and rename index2.php to index.php
- **CRITICAL**: Upload build.zip from your local machine, then extract it so that build.zip contents go into ~/public_html/build/ (the build folder must exist at public_html/build/ with manifest.json and assets/ inside)
- delete public/hot if present in the public_html and root public folder
- ensure .htaccess is present in the public_html folder