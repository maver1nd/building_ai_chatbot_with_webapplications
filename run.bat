@echo off
echo ==========================================================
echo   Starting Christ University Homepage ^& AI Assistant...  
echo ==========================================================
cd /d "%~dp0backend"
python manage.py migrate
python manage.py seed_kb
echo.
echo Launching server at: http://127.0.0.1:8000/
echo Admin Portal: http://127.0.0.1:8000/admin/ (User: admin / Pass: admin123)
echo Press Ctrl+C to stop.
echo.
python manage.py runserver 127.0.0.1:8000
