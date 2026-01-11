# Деплой портфолио на GitHub Pages

## Быстрый деплой

```bash
npm run deploy
```

Эта команда автоматически:
1. Соберет проект (`npm run build`)
2. Переключится на ветку `gh-pages`
3. Очистит старые файлы
4. Скопирует новую сборку
5. Закоммитит и запушит на GitHub
6. Вернет вас обратно в текущую ветку

## Ручной деплой

Если нужно сделать деплой вручную:

```bash
# 1. Собрать проект
npm run build

# 2. Переключиться на gh-pages
git checkout gh-pages

# 3. Очистить ветку (оставить только .git и node_modules)
find . -maxdepth 1 ! -name '.git' ! -name 'node_modules' ! -name '.' ! -name '..' -exec rm -rf {} +

# 4. Скопировать build
cp -r build/* .
rm -rf build

# 5. Закоммитить
git add -A
git commit -m "Deploy: $(date +'%Y-%m-%d %H:%M:%S')"

# 6. Запушить
git push origin gh-pages

# 7. Вернуться в master
git checkout master
```

## Проверка деплоя

После деплоя сайт будет доступен по адресу:
https://bolshakovandrey.github.io/personal_portfolio/

GitHub Pages обновляется в течение 1-2 минут.

## Структура веток

- **master** - исходный код проекта (React, src/, package.json, etc.)
- **gh-pages** - только собранные файлы для хостинга (index.html, static/, etc.)

## Важно

- В ветке `gh-pages` должны быть **только** файлы из папки `build/`
- Не коммитить `node_modules` в `gh-pages`
- Не коммитить исходники (src/, public/) в `gh-pages`
