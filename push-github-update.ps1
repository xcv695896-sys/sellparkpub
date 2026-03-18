# Sync repo to GitHub via Contents API. Uses $env:GITHUB_TOKEN.
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

$skipDirs = @("node_modules", ".next", ".git", "terminals")
$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $rel = $_.FullName.Substring($root.Length).TrimStart("\")
    foreach ($d in $skipDirs) { if ($rel -like "$d\*" -or $rel -eq $d) { return $false } }
    if ($_.Name -eq ".env") { return $false }
    $true
} | ForEach-Object { ($_.FullName.Substring($root.Length).TrimStart('\')) -replace '\\', '/' }

foreach ($path in $files) {
    $fullPath = Join-Path $root $path.Replace("/", "\")
    if (-not (Test-Path $fullPath)) { continue }
    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $b64 = [Convert]::ToBase64String($bytes)
    $uri = "https://api.github.com/repos/$owner/$repo/contents/$path"
    $body = @{ message = "Update $path"; content = $b64 }
    try {
        $existing = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers -ErrorAction SilentlyContinue
        if ($existing.sha) { $body["sha"] = $existing.sha }
    } catch { }
    try {
        Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body ($body | ConvertTo-Json) -ContentType "application/json; charset=utf-8" | Out-Null
        Write-Host "OK: $path"
    } catch {
        Write-Warning "FAIL: $path"
    }
}
Write-Host "Done. https://github.com/$owner/$repo"
