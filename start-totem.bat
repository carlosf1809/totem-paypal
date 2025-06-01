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
echo Browser will open automatically in FULL KIOSK MODE
echo.
echo Press Ctrl+C to stop the server when done
echo.

rem Start the dev server and open browser after 3 seconds
start /b npm run dev

rem Wait for server to start
timeout /t 3 /nobreak >nul

echo [4/4] Opening browser in TRUE fullscreen mode...

rem Try Chrome first with proper kiosk mode flags
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-infobars --disable-session-crashed-bubble --disable-translate --no-first-run --disable-default-apps --disable-popup-blocking --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows http://localhost:5173
    goto :opened
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --kiosk --disable-infobars --disable-session-crashed-bubble --disable-translate --no-first-run --disable-default-apps --disable-popup-blocking --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows http://localhost:5173
    goto :opened
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    rem Edge kiosk mode
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --kiosk http://localhost:5173
    goto :opened
) else (
    rem Fallback: open browser and send F11 key
    start http://localhost:5173
    timeout /t 2 /nobreak >nul
    echo Sending F11 key for fullscreen...
    powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('{F11}')"
    goto :opened
)

:opened
echo ✓ Browser opened in TRUE FULLSCREEN MODE!

echo.
echo ========================================
echo  Development server is running!
echo  Close this window to stop the server.
echo ========================================
echo.
echo  💡 TIP: To exit fullscreen, press ESC or F11
echo.

rem Keep the window open and wait for the npm process
pause >nul 