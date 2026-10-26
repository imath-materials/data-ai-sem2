<#
Перед запуском создайте пустой публичный репозиторий на github.com или используйте GitHub CLI.
Из PowerShell в распакованной папке:
  .\PUBLISH_GITHUB_PAGES.ps1 -Owner ВАШ_ЛОГИН -Repo data-ai-sem2
#>
param(
    [Parameter(Mandatory=$true)][string]$Owner,
    [string]$Repo = 'data-ai-sem2'
)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Установите Git for Windows.' }
if (Test-Path '12_ПРЕПОДАВАТЕЛЮ_КЛЮЧИ') { throw 'Обнаружены закрытые ключи. Уберите папку перед публикацией.' }
if (-not (Test-Path '.git')) {
    git init -b main
    if ($LASTEXITCODE -ne 0) { throw 'Не удалось создать Git-репозиторий.' }
}
git add .
if ($LASTEXITCODE -ne 0) { throw 'Ошибка git add.' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    git commit -m 'Publish data and AI course pages'
    if ($LASTEXITCODE -ne 0) { throw 'Git commit не выполнен. Укажите user.name и user.email в настройках Git.' }
}
$RemoteUrl = "https://github.com/$Owner/$Repo.git"
$Existing = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) { git remote add origin $RemoteUrl }
elseif ($Existing -ne $RemoteUrl) { throw "origin уже настроен: $Existing. Проверьте репозиторий." }
git branch -M main
git push -u origin main
if ($LASTEXITCODE -ne 0) { throw 'Публикация не удалась: проверьте репозиторий и авторизацию.' }
Write-Host "Код опубликован: https://github.com/$Owner/$Repo" -ForegroundColor Green
Write-Host 'Осталось включить Settings -> Pages -> Deploy from a branch -> main -> /(root).'
Write-Host "Адрес сайта после публикации: https://$Owner.github.io/$Repo/"
