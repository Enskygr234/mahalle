// Windows sürümü: oyunu kendi penceresinde açar.
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function pencereAc() {
  const pencere = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#14203d',
    title: 'Mahalle',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true },
  });
  Menu.setApplicationMenu(null);
  pencere.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  // F11 ile tam ekran
  pencere.webContents.on('before-input-event', (e, girdi) => {
    if (girdi.type === 'keyDown' && girdi.key === 'F11') pencere.setFullScreen(!pencere.isFullScreen());
  });
  pencere.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(pencereAc);
app.on('window-all-closed', () => app.quit());
