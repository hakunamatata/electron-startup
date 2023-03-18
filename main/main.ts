// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      // 是否启用Node integration
      nodeIntegration: true, // Electron 5.0.0 版本之后它将被默认false
      // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本.默认为 true
      contextIsolation: false, // Electron 12 版本之后它将被默认true
      // enableRemoteModule: true, 14.0+ 使用模块导入开启
      // 禁用同源策略
      webSecurity: false,
    },
  });

  if (isDebug)
    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:8000/');
  else mainWindow.loadFile(join(__dirname, './render/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
