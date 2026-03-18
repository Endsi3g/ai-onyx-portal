Write-Host "-------------------------------------------" -ForegroundColor Cyan
Write-Host "   AI Portal Development Environment" -ForegroundColor Cyan
Write-Host "-------------------------------------------" -ForegroundColor Cyan

# Check for Ollama
Write-Host "[1/3] Checking Ollama service..." -NoNewline
try {
    $ollamaStatus = Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -ErrorAction SilentlyContinue -TimeoutSec 2
    Write-Host " OK" -ForegroundColor Green
} catch {
    Write-Host " FAILED" -ForegroundColor Yellow
    Write-Host "      (Warning: Ollama is not running. Chat features will be unavailable.)" -ForegroundColor Gray
}

# Check for Node Modules
Write-Host "[2/3] Checking dependencies..." -NoNewline
if (!(Test-Path "node_modules") -or !(Test-Path "server/node_modules") -or !(Test-Path "client/node_modules")) {
    Write-Host " MISSING" -ForegroundColor Yellow
    Write-Host "      (Installing modules, please wait...)" -ForegroundColor Gray
    npm run install-all
} else {
    Write-Host " OK" -ForegroundColor Green
}

# Start Development Stack
Write-Host "[3/3] Launching Full-Stack Application..." -ForegroundColor Cyan
Write-Host "      (Backend: http://localhost:5000 | Frontend: http://localhost:3000)" -ForegroundColor Gray
npm run dev
