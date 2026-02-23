This is a very quick readme for future reference for myself

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
- run "php artisan migrate --force"
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