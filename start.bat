@echo off
title Masar Platform - Local Network Starter
echo ===================================================
echo        منصة مَسَار - تشغيل النظام في الشبكة المحلية
echo ===================================================
echo.
cd /d "%~dp0"

:: Try to find local IP address
set "IP=localhost"
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| find "IPv4"') do (
    set "IP=%%a"
)
:: Remove leading/trailing spaces from IP
set "IP=%IP: =%"

echo [!] عنوان هذا الجهاز الحالي: %IP%
echo.
echo ===================================================
echo  👉 للتشغيل على هذا الجهاز: http://localhost:8000/dist/
echo  👉 للتشغيل على الأجهزة الأخرى في نفس الشبكة: http://%IP%:8000/dist/
echo ===================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] يتم تشغيل الخادم المحلي عبر Python...
    start "" "http://localhost:8000/dist/"
    python -m http.server 8000
    goto end
)

:: Check for Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] يتم تشغيل الخادم المحلي عبر Node.js...
    start "" "http://localhost:8000/"
    npx -y serve -p 8000 dist
    goto end
)

echo [ERROR] لم يتم العثور على Python أو Node.js.
echo يمكنك رفع مجلد 'dist' على موقع https://app.netlify.com/drop لتشغيله سحابياً.
echo.
pause
:end
