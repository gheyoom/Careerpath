#!/bin/bash
cd "$(dirname "$0")"
clear
echo "==================================================="
echo "       منصة مَسَار - تشغيل النظام في الشبكة المحلية"
echo "==================================================="
echo ""

# Detect local IP address on macOS
IP=$(ipconfig getifaddr en0 || ipconfig getifaddr en1 || hostname -I | awk '{print $1}' || echo "localhost")

echo "[!] عنوان هذا الجهاز الحالي: $IP"
echo ""
echo "==================================================="
echo "  👉 للتشغيل على هذا الجهاز: http://localhost:8000/dist/"
echo "  👉 للتشغيل على الأجهزة الأخرى في نفس الشبكة: http://$IP:8000/dist/"
echo "==================================================="
echo ""

if command -v python3 &>/dev/null; then
    echo "[OK] يتم تشغيل الخادم المحلي عبر Python 3..."
    open "http://localhost:8000/dist/"
    python3 -m http.server 8000
elif command -v node &>/dev/null; then
    echo "[OK] يتم تشغيل الخادم المحلي عبر Node.js..."
    open "http://localhost:8000/"
    npx -y serve -p 8000 dist
else
    echo "[ERROR] لم يتم العثور على Python أو Node.js."
    echo "يمكنك رفع مجلد 'dist' على موقع https://app.netlify.com/drop لتشغيله سحابياً."
    echo ""
    read -p "اضغط Enter للخروج..."
fi
