@echo off
title CareerPath - Local Server
echo ==============================================
echo   CareerPath Application - Portable Server
echo ==============================================
echo.
echo Starting the local backend server...
echo The application will open in your default browser shortly.
echo (Do not close this window while using the app)
echo.

start http://localhost:3333
node server/index.js

pause
