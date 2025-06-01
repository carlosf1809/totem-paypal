@echo off
setlocal EnableDelayedExpansion
title PayPal Totem - Development Environment

color 0A
echo.
echo ==========================================
echo   PayPal Totem Development Environment
echo ==========================================
echo.

REM Change to the directory where the batch file is located
cd /d "%~dp0"

echo [1/4] Checking project directory...
if not exist "package.json" (
    echo ERROR: package.json not found! Make sure this script is in the totem-paypal folder.
    pause
    exit /b 1
)
echo ✓ Project directory confirmed

echo.
echo [2/4] Pulling latest changes from Git...
git pull
if errorlevel 1 (
    echo WARNING: Git pull failed or no changes to pull
) else (
    echo ✓ Git pull completed successfully
)

echo.
echo [3/4] Installing/updating dependencies...
call npm install --silent
echo ✓ Dependencies checked

echo.
echo [4/4] Starting development server...
echo.
echo ⚡ Server starting at: http://localhost:5173
echo 🌐 Browser will open in TRUE KIOSK MODE (F11 fullscreen)
echo ⏹️  Press Ctrl+C in this window to stop the server
echo.

REM Start npm in a new window so we can control it better
start "PayPal Totem Server" /min cmd /c "npm run dev & pause"

REM Wait for server to be ready
echo Waiting for server to start...
:checkserver
timeout /t 1 /nobreak >nul
curl -s http://localhost:5173 >nul 2>&1
if errorlevel 1 (
    echo Still starting...
    goto checkserver
)

echo ✓ Server is ready!
echo.
echo 🚀 Opening browser in TRUE KIOSK FULLSCREEN mode...

REM Try different browsers with proper kiosk flags
set "opened=false"

REM Chrome with full kiosk mode (best option)
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo ✓ Found Chrome - Starting in kiosk mode...
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-infobars --disable-session-crashed-bubble --disable-translate --no-first-run --disable-default-apps --disable-popup-blocking --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows --disable-web-security --disable-features=VizDisplayCompositor --autoplay-policy=no-user-gesture-required http://localhost:5173
    set "opened=true"
    goto :browseropened
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo ✓ Found Chrome (x86) - Starting in kiosk mode...
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --kiosk --disable-infobars --disable-session-crashed-bubble --disable-translate --no-first-run --disable-default-apps --disable-popup-blocking --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows --disable-web-security --disable-features=VizDisplayCompositor --autoplay-policy=no-user-gesture-required http://localhost:5173
    set "opened=true"
    goto :browseropened
)

REM Edge with kiosk mode if Chrome not found
if "!opened!"=="false" (
    if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
        echo ✓ Found Edge - Starting in kiosk mode...
        start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --kiosk --disable-features=msEdgeEnableIEMode http://localhost:5173
        set "opened=true"
        goto :browseropened
    )
)

REM Firefox with fullscreen if others not found
if "!opened!"=="false" (
    if exist "C:\Program Files\Mozilla Firefox\firefox.exe" (
        echo ✓ Found Firefox - Starting with fullscreen...
        start "" "C:\Program Files\Mozilla Firefox\firefox.exe" http://localhost:5173
        timeout /t 3 /nobreak >nul
        echo Sending F11 for Firefox fullscreen...
        powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('{F11}')"
        set "opened=true"
        goto :browseropened
    )
)

REM Default browser fallback with F11 automation
if "!opened!"=="false" (
    echo ⚠️  Using default browser - will send F11 for fullscreen...
    start http://localhost:5173
    timeout /t 3 /nobreak >nul
    echo Sending F11 key for fullscreen mode...
    powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('{F11}')"
    set "opened=true"
)

:browseropened
echo ✅ Browser opened in FULL KIOSK MODE!

echo.
echo ==========================================
echo   🎉 PayPal Totem is now running!
echo ==========================================
echo.
echo   📱 Totem URL: http://localhost:5173
echo   🔧 This window: Development controls
echo   🌐 Browser: Full kiosk mode interface
echo.
echo ℹ️  Instructions:
echo   • Keep this window open while developing
echo   • Close this window to stop the server
echo   • Press ESC or F11 in browser to exit fullscreen
echo   • Press Ctrl+C if server becomes unresponsive
echo.

echo Press any key to stop the development server...
pause >nul

echo.
echo 🛑 Stopping development server...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.cmd >nul 2>&1

echo ✓ Development server stopped
echo.
echo Thank you for using PayPal Totem! 👋
timeout /t 2 /nobreak >nul 