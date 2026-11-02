# Сборка презентаций

Исходники тем 04–07 — файлы `Тема_04.tex` … `Тема_07.tex`. Все используют XeLaTeX и общую цветовую схему.

Для сборки из этой папки (там находятся относительные пути к иллюстрациям) выполните для каждой темы **два прохода** XeLaTeX:

```powershell
xelatex -interaction=nonstopmode -halt-on-error .\Тема_06.tex
xelatex -interaction=nonstopmode -halt-on-error .\Тема_06.tex
Copy-Item .\Тема_06.pdf ..\09_ПРЕЗЕНТАЦИИ_PDF\Тема_06.pdf -Force
```

Двойной проход нужен, чтобы корректно отобразилась нумерация вида `6 / 16`. Аналогично соберите темы 04, 05 и 07. Для компиляции нужен TeX Live / MiKTeX с XeLaTeX, polyglossia и шрифтами DejaVu Sans.
