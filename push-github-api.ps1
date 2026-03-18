# Push to GitHub via API (no git required). Uses $env:GITHUB_TOKEN.
$ErrorActionPreference = "Stop"
$token = $env:GITHUB_TOKEN
if (-not $token) { Write-Error "Set GITHUB_TOKEN env var"; exit 1 }
$owner = "xcv695896-sys"
$repo = "sellparkpub"
$root = $PSScriptRoot
$headers = @{
    "Authorization" = "Bearer $token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

$files = @(
    ".gitignore", "README.md", "package.json", "next.config.mjs", "tsconfig.json",
    "tailwind.config.ts", "postcss.config.mjs", "push-to-github.ps1", "push-to-github.sh",
    "app/globals.css", "app/layout.tsx", "app/page.tsx", "app/services/page.tsx",
    "app/projects/page.tsx", "app/about/page.tsx", "app/contact/page.tsx",
    "app/terms/page.tsx", "app/privacy/page.tsx", "components/Header.tsx", "components/Footer.tsx",
    "public/logo.svg"
)

$blobs = @()
foreach ($path in $files) {
    $fullPath = Join-Path $root $path
    if (-not (Test-Path $fullPath)) { Write-Warning "Skip (missing): $path"; continue }
    $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
    $b64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
    $body = @{ content = $b64; encoding = "base64" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/git/blobs" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    $blobs += @{ path = $path; sha = $r.sha }
}

$treeEntries = $blobs | ForEach-Object { @{ path = $_.path; mode = "100644"; type = "blob"; sha = $_.sha } }
$treeBody = @{ tree = $treeEntries } | ConvertTo-Json -Depth 4
$treeResp = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/git/trees" -Method Post -Headers $headers -Body $treeBody -ContentType "application/json; charset=utf-8"
$commitBody = @{ message = "Initial commit: SellPark website"; tree = $treeResp.sha } | ConvertTo-Json
$commitResp = Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/git/commits" -Method Post -Headers $headers -Body $commitBody -ContentType "application/json; charset=utf-8"
try {
    $refBody = @{ ref = "refs/heads/main"; sha = $commitResp.sha } | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/git/refs" -Method Post -Headers $headers -Body $refBody -ContentType "application/json; charset=utf-8" | Out-Null
} catch {
    $refBody = @{ sha = $commitResp.sha } | ConvertTo-Json
    Invoke-RestMethod -Uri "https://api.github.com/repos/$owner/$repo/git/refs/heads/main" -Method Patch -Headers $headers -Body $refBody -ContentType "application/json; charset=utf-8" | Out-Null
}
Write-Host "Pushed to https://github.com/$owner/$repo"
