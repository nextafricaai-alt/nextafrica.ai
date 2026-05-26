# NEXT AI Website - Pre-push Validator (PowerShell, no Python needed)
# Run before every git push: ./validate.ps1
# Exit code 0 = safe to push. Exit code 1 = DO NOT PUSH.

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
$src = Join-Path $root 'src'

$required = @{
  'chrome.jsx'  = 'Object.assign(window, { Nav,'
  'home.jsx'    = 'Object.assign(window, { Home,'
  'pages-a.jsx' = 'Object.assign(window, { WhatWeDo,'
  'pages-b.jsx' = 'Object.assign(window, { Training,'
  'app.jsx'     = 'ReactDOM.createRoot'
}
$minSizes = @{
  'chrome.jsx'  = 20000
  'home.jsx'    = 23000
  'pages-a.jsx' = 20000
  'pages-b.jsx' = 38000
  'app.jsx'     = 1000
}

$errors = @()
$warnings = @()

function Count-NullBytes($path) {
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $n = 0
  foreach ($b in $bytes) { if ($b -eq 0) { $n++ } }
  return $n
}

# JSX source files
foreach ($fname in $required.Keys) {
  $path = Join-Path $src $fname
  if (-not (Test-Path $path)) {
    $errors += "src/$fname FILE MISSING"
    continue
  }
  $text = Get-Content $path -Raw -Encoding UTF8
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $nulls = Count-NullBytes $path
  if ($nulls -gt 0) { $errors += "src/$fname has $nulls null bytes (corrupted)" }
  $trimmed = $text.TrimEnd()
  if (-not ($trimmed.EndsWith(');') -or $trimmed.EndsWith('});'))) {
    $errors += "src/$fname does not end correctly (likely truncated)"
  }
  if (-not $text.Contains($required[$fname])) {
    $errors += "src/$fname missing required export: $($required[$fname])"
  }
  if ($bytes.Length -lt $minSizes[$fname]) {
    $errors += "src/$fname only $($bytes.Length) bytes (min $($minSizes[$fname]))"
  }
}

# HTML output files
$htmls = Get-ChildItem -Path $root -Filter *.html | Where-Object { $_.Name -ne '404.html' }
foreach ($f in $htmls) {
  $text = Get-Content $f.FullName -Raw -Encoding UTF8
  $nulls = Count-NullBytes $f.FullName
  if ($nulls -gt 0) { $errors += "$($f.Name) has $nulls null bytes" }
  foreach ($fname in $required.Keys) {
    if (-not $text.Contains($required[$fname])) {
      $errors += "$($f.Name) missing inlined: $($required[$fname])"
    }
  }
  $babelOpens = ([regex]::Matches($text, '<script type="text/babel"')).Count
  if ($babelOpens -ne 5) {
    $warnings += "$($f.Name) has $babelOpens babel scripts (expected 5)"
  }
}

Write-Host ""
Write-Host "==========================================="
Write-Host "  NEXT AI Website - Validation Report"
Write-Host "==========================================="

if ($errors.Count -gt 0) {
  Write-Host ""
  Write-Host "FAIL: $($errors.Count) error(s) - DO NOT PUSH" -ForegroundColor Red
  Write-Host ""
  foreach ($e in $errors) {
    Write-Host "   $e" -ForegroundColor Red
  }
}

if ($warnings.Count -gt 0) {
  Write-Host ""
  Write-Host "WARN: $($warnings.Count) warning(s)" -ForegroundColor Yellow
  Write-Host ""
  foreach ($w in $warnings) {
    Write-Host "   $w" -ForegroundColor Yellow
  }
}

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
  Write-Host ""
  Write-Host "PASS: All checks passed. Safe to push." -ForegroundColor Green
  Write-Host ""
} elseif ($errors.Count -eq 0) {
  Write-Host ""
  Write-Host "PASS: No blocking errors. Safe to push (warnings above)." -ForegroundColor Green
  Write-Host ""
} else {
  Write-Host ""
  Write-Host "STOP: Fix errors above before pushing." -ForegroundColor Red
  Write-Host ""
}

if ($errors.Count -gt 0) { exit 1 } else { exit 0 }
