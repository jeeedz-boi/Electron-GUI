const protocol  = require("electron");
const electron = require("electron");
// const {app, BrowserWindow, Menu} = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const Menu = electron.Menu;
const {Menu} = electron;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const hostname = 'localhost'
const PORT = 5555
const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const fs = require('file-system');
const glob = require("glob")
// const fs = require('fs');

// file.readFile === fs.readFile


// Middleware
router.use(bodyParser.json())

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({minWidth: 1280,minHeight: 850, webPreferences: {nodeIntegration: true}});    // create new window
    mainWindow.loadURL(url.format({     // Load html into window
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
        // Basically passing file://dirname/index.html into loadURL
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate', () => {
    if(mainWindow === null){
        createWindow()
    }
});

// Web Server Run
router.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});
module.exports = router

// thermal camera
// router.get("/thermal/", (req,res) =>{
//     mainWindow.webContents.send('update-thermal' , req.body.file);
// })

// real camera
router.get("/real/", (req,res) =>{
    mainWindow.webContents.send('update-real' , req.body.file);
})

// new result image
router.get("/", (req,res) =>{
    mainWindow.webContents.send('update-new-img' , req.body.file);
})

// new alert image
router.get("/alert/", (req,res) =>{
    mainWindow.webContents.send('update-result-img-alert' , req.body.file);
})