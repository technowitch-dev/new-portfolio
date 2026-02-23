This is a very quick readme for future reference for myself

When deploying this to cPanel with no npm installed:
- run "composer update"
- double check gitignore and .env.example files
- run "npm ci"
- run "npm run build", fix any errors that come up
- stage and commit all changes
- Clone repo on cPanel
- create and update .env file from .env.example
- run "php artisan key:generate"
- create mysql database and user, adding those details into the .env file