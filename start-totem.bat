@echo off
title PayPal Totem - Starting Development Server

echo.
echo ========================================
echo  PayPal Totem Development Environment
echo ========================================
echo.

echo [1/4] Changing to project directory...
cd /d "%~dp0"

echo [2/4] Pulling latest changes from Git...
git pull

echo [3/4] Starting development server...
echo.
echo Server will be available at: http://localhost:5173
echo Browser will open automatically in fullscreen mode
echo.
echo Press Ctrl+C to stop the server when done
echo.

rem Start the dev server and open browser after 3 seconds
start /b npm run dev

rem Wait for server to start
timeout /t 3 /nobreak >nul

echo [4/4] Opening browser in fullscreen mode...

rem Try Chrome first (most common), then Edge, then default browser
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --start-fullscreen --app=http://localhost:5173
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --start-fullscreen --app=http://localhost:5173
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --start-fullscreen --app=http://localhost:5173
) else (
    rem Fallback to default browser
    start http://localhost:5173
    echo.
    echo Browser opened. Press F11 for fullscreen mode.
)

echo.
echo ========================================
echo  Development server is running!
echo  Close this window to stop the server.
echo ========================================
echo.

rem Keep the window open and wait for the npm process
wait 