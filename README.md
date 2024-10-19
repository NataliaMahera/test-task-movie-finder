# Movie Finder 🎬
## 📝 Movie Finder 
### Це односторінковий веб-додаток для перегляду популярних фільмів, пошуку та додавання фільмів до обраного за допомогою The Movie Database (TMDB) API.

## Функціонал 🌟
1. **Популярні фільми:**
 - Головна сторінка відображає список популярних фільмів із динамічним підвантаженням.
2. **Пошук фільмів:**
 - Інтерактивний пошук фільмів за назвою. Пошук відбувається не тільки за списком популярних, а загалом
3. **Деталі фільму:**
 - Натисніть на картку фільму, щоб переглянути його деталі, такі як жанри, рік випуску, рейтинг, і отримати рекомендації подібних фільмів.
4. **Oбране:**
 - Додавайте та видаляйте фільми зі списку обраного, який зберігається в localStorage для майбутнього перегляду.
5. **Жанри фільмів:**
 - Для кожного фільму відображаються його жанри (назви, а не ID).
6. **Рекомендації:**
 - На сторінці кожного фільму показуються рекомендації схожих стрічок.
   
## Технології 🛠️
 - React з використанням TypeScript для надійної типізації.
 - Vite для швидкої збірки та запуску.
 - Tailwind CSS для стильного і адаптивного дизайну.
 - Redux Toolkit для управління глобальним станом додатка, включаючи роботу з обраними фільмами.
 - Axios для виконання HTTP-запитів до TMDB API з простим обробленням відповідей і помилок.
 - TMDB API для отримання даних про фільми, пошуку та рекомендацій.

## Як запустити проєкт 🚀

#### Встановлення Node і NPM

Цей проєкт залежить від Node.js та Node Package Manager (NPM). Перед тим як продовжити, завантажте та встановіть Node.js (разом із NPM) з https://nodejs.org/en/download.

Клонувати репозиторій:
```bash
git clone https://github.com/NataliaMahera/test-task-movie-finder.git
cd test-task-movie-finder
```
Встановити залежності:
```bash
npm install
```
Налаштувати API ключ:

Створити файл .env у кореневій папці.
Додати свій API ключ із The Movie Database API:
Тестово залишила свій API ключ в .env.example
```bash
cp .env.example .env
# відкрийте .env та додайте свій API ключ у змінну 
VITE_API_KEY=your_api_key_here
```
Запустити додаток для розробки:
```bash
npm run dev
```
Live Demo 🌐
Додаток доступний за цим посиланням: Movie Finder на Vercel [link](https://movie-finder-alpha-lilac.vercel.app).

Посилання на TMDB API 📚
TMDB API Документація [link](https://developers.themoviedb.org/3)
Запити які використовувались:
· [link](https://developers.themoviedb.org/3/movies/get-popular-movies)
· [link](https://developers.themoviedb.org/3/search/search-movies)
· [link](https://developers.themoviedb.org/3/genres)
· [link](https://developers.themoviedb.org/3/movies/get-movie-details)
· [link](https://developers.themoviedb.org/3/movies/get-movie-recommendations)

