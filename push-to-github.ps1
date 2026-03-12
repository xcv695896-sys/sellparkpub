# Push SellPark project to GitHub
# Run in PowerShell from this folder (or run: .\push-to-github.ps1)
# Requires: Git installed and (for push) GitHub auth (SSH key or HTTPS token)

$repoUrl = "https://github.com/xcv695896-sys/sellparkpub.git"
$projectRoot = $PSScriptRoot

Set-Location $projectRoot

if (-not (Test-Path .git)) {
    git init
    git add .
    git commit -m "Initial commit: SellPark website (Next.js, Tailwind, Vercel-ready)"
    git branch -M main
    git remote add origin $repoUrl
    Write-Host "Git initialized and committed. Pushing to GitHub..."
} else {
    git add .
    $status = git status --porcelain
    if ($status) {
        git commit -m "Update SellPark website"
    }
    if (-not (git remote get-url origin 2>$null)) {
        git remote add origin $repoUrl
    }
}

git push -u origin main
Write-Host "Done. Repo: https://github.com/xcv695896-sys/sellparkpub"
