# Push via Contents API (one file per request). Uses $env:GITHUB_TOKEN.
$ErrorActionPreference = "Stop"
$token = $env:GITHUB_TOKEN
if (-not $token) { Write-Error "Set GITHUB_TOKEN"; exit 1 }
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

foreach ($path in $files) {
    $fullPath = Join-Path $root $path
    if (-not (Test-Path $fullPath)) { Write-Warning "Skip: $path"; continue }
    $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
    $b64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
    $body = @{ message = "Add $path"; content = $b64 } | ConvertTo-Json
    $uri = "https://api.github.com/repos/$owner/$repo/contents/$path"
    try {
        Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body $body -ContentType "application/json; charset=utf-8" | Out-Null
        Write-Host "OK: $path"
    } catch { Write-Host "FAIL: $path - $_"; throw }
}
Write-Host "Done. https://github.com/$owner/$repo"
