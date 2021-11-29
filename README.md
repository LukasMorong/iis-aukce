# iis-aukce

## Installation

    npm install

## Run

    npm run dev

## Deployment run

    ```
        "start": "npm run server"
        "postinstall": "cd client && npm install"
        "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm run build --prefix client"
    ```

### Variables

    process.env.PORT
    process.env.JWT_SECRET
    process.env.DB_USER
    process.env.DB_PASSWORD

# ENJOY! :)