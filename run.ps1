Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting Christ University Homepage & AI Assistant...  " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

Set-Location -Path "$PSScriptRoot\backend"
python manage.py migrate
python manage.py seed_kb

Write-Host "`nLaunching server at: http://127.0.0.1:8000/" -ForegroundColor Green
Write-Host "Admin Portal: http://127.0.0.1:8000/admin/ (User: admin / Pass: admin123)" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop.`n" -ForegroundColor Gray

python manage.py runserver 127.0.0.1:8000
