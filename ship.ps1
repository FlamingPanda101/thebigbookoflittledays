$ErrorActionPreference = "Stop"
Get-ChildItem months\*.md | Sort-Object Name | Get-Content -Encoding utf8 | Set-Content "The-Big-Book-of-Little-Days-2027.md" -Encoding utf8
python tools\validate.py
if ($LASTEXITCODE -ne 0) { throw "Validation failed - not committing" }
git add -A
git commit -m $(if ($args[0]) { $args[0] } else { "week update" })
git push
