# Восстановление проекта

## Проблема
Файлы были удалены из `landing-studio/`, но не перемещены в корень.

## Решение: Восстановить из Git

### Вариант 1: Отменить последний коммит (если еще не запушен)

```bash
# Отменить последний коммит, но сохранить изменения
git reset --soft HEAD~1

# Или полностью отменить изменения
git reset --hard HEAD~1
```

### Вариант 2: Восстановить файлы из предыдущего коммита

```bash
# Посмотреть историю коммитов
git log --oneline

# Восстановить файлы из коммита, где они еще были
git checkout <commit-hash> -- landing-studio/

# Затем переместить их в корень
git mv landing-studio/* .
git mv landing-studio/.* . 2>/dev/null || true
git rm -r landing-studio
```

### Вариант 3: Восстановить из удаленной ветки (если уже запушено)

```bash
# Получить последние изменения
git fetch origin

# Восстановить файлы из удаленной ветки
git checkout origin/main -- landing-studio/

# Переместить в корень
git mv landing-studio/* .
git mv landing-studio/.* . 2>/dev/null || true
git rm -r landing-studio
```

### Вариант 4: Если файлы еще в Git истории

```bash
# Найти коммит, где файлы еще были
git log --all --full-history -- landing-studio/package.json

# Восстановить все файлы из этого коммита
git checkout <commit-hash>^ -- landing-studio/

# Переместить в корень
git mv landing-studio/* .
git mv landing-studio/.* . 2>/dev/null || true
git rm -r landing-studio
```

## После восстановления

1. Проверьте структуру:
```bash
ls -la
# Должны быть: package.json, app/, components/, public/, и т.д.
```

2. Установите зависимости:
```bash
npm install
```

3. Проверьте build:
```bash
npm run build
```

4. Закоммитьте:
```bash
git add .
git commit -m "Restore project files to root"
git push
```

