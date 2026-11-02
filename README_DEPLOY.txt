Данные как основа ИИ. Дополнение тем 06–07.

Содержимое архива предназначено для копирования В КОРЕНЬ существующего локального репозитория data-ai-sem2.
Скопируйте все папки и файлы, сохраняя структуру.

Команды PowerShell (архив в папке Downloads):

cd C:\Users\ismir\Downloads
Expand-Archive -LiteralPath ".\data-ai-sem2-topic06-07-update.zip" -DestinationPath ".\data-ai-sem2-topic06-07-files" -Force
Copy-Item ".\data-ai-sem2-topic06-07-files\*" -Destination ".\data-ai-sem2-publish" -Recurse -Force
cd .\data-ai-sem2-publish
git status --short
git add -A
git commit -m "Add interactive topics 6 and 7"
git push

Основные страницы после публикации:
https://imath-materials.github.io/data-ai-sem2/read/06.html
https://imath-materials.github.io/data-ai-sem2/read/07.html
