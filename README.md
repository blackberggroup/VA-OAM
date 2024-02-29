# Website Template


## Dev URL's
Main Branch - 
Develop Branch - 

## How to Install and Run the Project
1. Clone this repo. Navigate to the directory where you'd like to put the VA-OAM directory and run:
    ```bash
    git clone https://github.com/blackberggroup/VA-OAM.git
    ```
    
    This will create a directory with the website files inside. Navigate to this new directory:
    ```bash
    cd VA-OAM
    ```

1. Install Node.js `16.16.0` or higher =>
    * Check your node version if it is already installed `node -v`
    * [Download](https://nodejs.org/en/).    

1. Install the project dependencies:
    ```bash
    npm install
    ```
    
1. Start the local server. You'll find the home page located at: `http://localhost:8080/`
    ```bash
    npm start
    ```

1. Run gulp to watch any changes you make to `scss` files:
    ```bash
    gulp watch
