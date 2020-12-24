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
const PythonShell = require('python-shell');

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({show: false, minWidth: 1920,minHeight: 1080, webPreferences: {nodeIntegration: true}});    // create new window
    mainWindow.loadURL(url.format({     // Load html into window
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
        // Basically passing file://dirname/index.html into loadURL
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    mainWindow.maximize()
    mainWindow.setFullScreen(true)
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

const PythonSrc = "fileManager"+".py"
const options = {
    mode: 'text',
    pythonOptions:['-u'],
};

PythonShell.PythonShell.run(PythonSrc, options, function(err, output){
    if(err) console.log('err msg:', err);
    console.log('finishied');
    console.log(output)
});
