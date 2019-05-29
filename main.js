// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')

const electron = require('electron')
const Menu = electron.Menu
const Tray = electron.Tray

const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 60,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Initial shortcut
function initShortcut(){
  globalShortcut.register('Shift+Space', () => {
    mainWindow.show()
  })
}

// Initial tray
let tray = null
function initTray(){
  tray = new Tray(path.join(__dirname, 'assets/images/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Translator',
      type: 'normal',
      click: trayToggle
    },
    { type: 'separator' },
    {
      label: 'Preferences',
      type: 'normal',
      click: traySetup
    },
    { type: 'separator' },
    {
      label: 'Quit',
      type: 'normal',
      click: function(){app.quit()}
    }
  ])
  tray.setContextMenu(contextMenu)
}

function trayToggle(){
  if(mainWindow.isVisible())
    mainWindow.hide()
  else
    mainWindow.show()
}

function traySetup(){
  console.log('setup')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createWindow()
  initShortcut()
  initTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

app.on('browser-window-blur', function(){
  mainWindow.hide()
})

app.dock.hide()

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
