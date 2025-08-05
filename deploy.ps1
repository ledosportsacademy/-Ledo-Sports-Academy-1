# PowerShell script for deploying to Render

Write-Host "Preparing for deployment to Render..." -ForegroundColor Cyan

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git to continue." -ForegroundColor Red
    exit 1
}

# Check if required files exist
$requiredFiles = @(
    "package.json",
    "server.js",
    "render.yaml",
    "Procfile"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ $file is missing" -ForegroundColor Red
        $allFilesExist = $false
    }
}

# Check for MongoDB URI in .env
if (Test-Path ".env") {
    $envContent = Get-Content ".env" -Raw
    if ($envContent -match "MONGODB_URI=") {
        Write-Host "✅ MONGODB_URI is set in .env file" -ForegroundColor Green
    } else {
        Write-Host "❌ MONGODB_URI is not set in .env file" -ForegroundColor Red
        $allFilesExist = $false
    }
} else {
    Write-Host "⚠️ .env file not found - you will need to set environment variables on Render" -ForegroundColor Yellow
}

# Check package.json for start script
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($packageJson.scripts -and $packageJson.scripts.start) {
        Write-Host "✅ start script exists: '$($packageJson.scripts.start)'" -ForegroundColor Green
    } else {
        Write-Host "❌ start script is missing in package.json" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""
Write-Host "Deployment readiness summary:" -ForegroundColor Cyan
if ($allFilesExist) {
    Write-Host "✅ Your application appears ready for deployment to Render!" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Push your code to a GitHub repository" -ForegroundColor White
    Write-Host "2. Create a new Web Service on Render" -ForegroundColor White
    Write-Host "3. Connect your GitHub repository" -ForegroundColor White
    Write-Host "4. Configure the environment variables" -ForegroundColor White
    Write-Host "5. Deploy!" -ForegroundColor White
    
    Write-Host ""
    $createRepo = Read-Host "Would you like to initialize a git repository now? (y/n)"
    if ($createRepo -eq "y") {
        # Check if .git directory already exists
        if (Test-Path ".git") {
            Write-Host "Git repository already initialized" -ForegroundColor Yellow
        } else {
            git init
            Write-Host "Git repository initialized" -ForegroundColor Green
        }
        
        git add .
        git status
        
        Write-Host ""
        Write-Host "To complete the deployment:" -ForegroundColor Cyan
        Write-Host "1. Commit your changes: git commit -m 'Initial commit'" -ForegroundColor White
        Write-Host "2. Add your remote repository: git remote add origin <your-repo-url>" -ForegroundColor White
        Write-Host "3. Push your code: git push -u origin main" -ForegroundColor White
        Write-Host "4. Go to Render.com to deploy your application" -ForegroundColor White
    }
} else {
    Write-Host "❌ Please address the issues above before deploying to Render." -ForegroundColor Red
}