QSWebsiteGears
==============
#### [2012-08] This is Andy's website design.
It runs on a Node server. It's designed to run on both cloud9 and heroku.
`package.json` - This is used to install dependencies (express mainly). 
`web.js` - This defines the routings.

![logo](https://d1512cxhwqig2.cloudfront.net/images/logo.png)
#### [2018-10] How to run the website on local machine

###### Setting up local development environment with GitHub Desktop.

1. Make sure you have installed node.js on your local machine. You can check if this is already done by running the command `node -v` in terminal or command prompt. If it's not yet installed, you can download it from their official website: https://nodejs.org/en/
2. Download Github Desktop from https://desktop.github.com/ and install it on your local machine. 
   Skip this step if it you have this already installed.
3. Run Github desktop and sign in with your github's credential that is associated with Quickschools.
4. After successfully getting to the github desktop mainpage, go to *File* -> *clone repository...*
5. Select *'github.com'* tab, and highlight *quickshcools/QSWebsiteGears* repository. Then, click on *clone* button.
6. After the cloning process is done, Navigate to **Github** folder in Documents, you will find new folder named **QSWebsiteGears**.
7. Open this new folder with your preferred IDE or text editor, and toggle the terminal or command prompt.
8. Make sure the terminal or command prompt is pointing to the QSWebsiteGears directory.
9. In the terminal or command prompt, run
    ```
    $ npm start
    ```
10. Open web browser in your local machine and go to `localhost:8080`.
11. You will see the website will be up and running in the browser.

###### Setting up local development environment with Git Command-line-interface.

1. Make sure you have installed node.js on your local machine. You can check if this is already done by running the command `node -v` in terminal or command prompt. If it's not yet installed, you can download it from their official website: https://nodejs.org/en/
2. Open terminal or command prompt, navigate to your desired directory where the project will be cloned. Then, run the following command:
    ```
    $ git clone https://github.com/quickschools/QSWebsiteGears.git
    ```
3. You may be prompted to enter your github's credential if this is your first time cloning from the quickschools repository.
4. After the cloning process is done, Run the following commands in the same terminal or command prompt:
    ```
    $ cd QSWebsiteGears
    $ npm start
    ```
6. Now, open the web browser in your local machine and go to `localhost:8080`.
7. You will see the website will be up and running in the browser.
