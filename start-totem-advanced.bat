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
echo 🌐 Browser will open automatically in fullscreen
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
echo 🚀 Opening browser in fullscreen mode...

REM Try different browsers in order of preference
set "opened=false"

REM Chrome (most common locations)
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --start-fullscreen --app=http://localhost:5173 --disable-web-security --disable-features=VizDisplayCompositor
    set "opened=true"
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --start-fullscreen --app=http://localhost:5173 --disable-web-security --disable-features=VizDisplayCompositor
    set "opened=true"
)

REM Edge if Chrome not found
if "!opened!"=="false" (
    if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
        start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --start-fullscreen --app=http://localhost:5173
        set "opened=true"
    )
)

REM Firefox as backup
if "!opened!"=="false" (
    if exist "C:\Program Files\Mozilla Firefox\firefox.exe" (
        start "" "C:\Program Files\Mozilla Firefox\firefox.exe" -fullscreen http://localhost:5173
        set "opened=true"
    )
)

REM Default browser fallback
if "!opened!"=="false" (
    start http://localhost:5173
    echo.
    echo ⚠️  Opened in default browser - Press F11 for fullscreen mode
)

echo.
echo ==========================================
echo   🎉 PayPal Totem is now running!
echo ==========================================
echo.
echo   📱 Totem URL: http://localhost:5173
echo   🔧 This window: Development controls
echo   🌐 Browser: Application interface
echo.
echo ℹ️  Instructions:
echo   • Keep this window open while developing
echo   • Close this window to stop the server
echo   • Press Ctrl+C if the server becomes unresponsive
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