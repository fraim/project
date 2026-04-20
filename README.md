# DogFood

---

## Что сделано

- **FSD (6 слоёв)** - `app`, `pages`, `widgets`, `features`, `entities`,
  `shared` c публичными API через `index.ts` и алиасами
  `@app / @pages / @widgets / @features / @entities / @shared`.
- **React 19** (`react@19`, `react-dom@19`, `@types/react@19`).
- **Два бандлера**: Webpack 5 (оригинальный) + **Vite 6 + SWC** параллельно.
- **React 19 hooks**:
  - `useOptimistic` - мгновенная смена иконки «избранное» до ответа сервера,
    откат при ошибке (`@features/toggle-like`).
  - `useActionState` - форма отзыва: управляет состоянием отправки, ошибками,
    авто-сброс формы на успех (`@features/add-review`).
- **3 кейса `useRef`**:
  1. Автофокус на email-инпуте формы логина (`@features/auth/SignInForm`).
  2. `triggerRef` в модалке - запомнить триггер при открытии, вернуть фокус
     на него при закрытии (`@shared/ui/Modal`).
  3. Счётчик перерендеров в `@widgets/CardList` - `useRef(0)` + инкремент без
     повторного рендера (видно только в dev-сборке).
- **Модалка через `React.createPortal`** (`@shared/ui/Modal`):
  монтируется в `#modal-root`, ESC и клик по оверлею закрывают, фокус при
  открытии уходит на крестик закрытия, при закрытии возвращается на триггер,
  `body` блокируется от скролла.
- **`shared/ui`-примитивы**: `Button`, `Input`, `Loader`, `Modal`.
- **Оптимизации**:
  - `React.memo` у `ProductCard`, `ReviewCard`, `CartItem`, `LikeButton`,
    `CardList`, `CartCounter`, `Rating`.
  - `useMemo` - суммы в `CartAmount`, список опций в `useSort`.
  - `useCallback` - все обработчики в `CartItem`, `CartCounter`, `useCartCount`,
    `useAddToCart`, `LikeButton`, `ReviewList`.
- Чистка завязки на MUI в `WithQuery` (был импорт целого `@mui/material`
  только ради `Alert`).
- Миграция импортов SVG на синтаксис `?react` - работает и в Vite (через
  `vite-plugin-svgr`), и в Webpack (через `@svgr/webpack` в `oneOf` по
  `resourceQuery: /react/`); URL-импорты оставлены для изображений.

## Структура проекта

```
src/
├── app/                          # инициализация: store, стили, провайдеры
│   ├── store/                    # configureStore + persist-подписка
│   └── styles/                   # глобальные CSS
│
├── pages/                        # страницы-композиции
│   ├── HomePage/                 # каталог
│   ├── ProductPage/              # карточка товара
│   ├── CartPage/                 # корзина
│   ├── FavoritesPage/            # избранное
│   ├── ProfilePage/              # профиль (использует edit-profile + delete-account)
│   ├── SignInPage/               # вход
│   ├── SignUpPage/               # регистрация
│   └── NotFoundPage/             # 404
│
├── widgets/                      # крупные самодостаточные блоки
│   ├── Header/                   # шапка с поиском, корзиной, профилем
│   ├── Footer/
│   ├── CardList/                 # сетка товаров
│   ├── LoadMore/                 # пагинация по кнопке
│   └── ReviewList/               # список отзывов с формой
│
├── features/                     # пользовательские действия
│   ├── auth/                     # SignIn/SignUp-формы, WithProtection HOC
│   │   ├── model/                # RTK Query: login, register
│   │   └── ui/
│   ├── add-to-cart/              # добавление, счётчик в корзине
│   │   ├── model/                # хуки useCartCount, useAddToCart
│   │   └── ui/
│   │       ├── AddToCartAction/
│   │       ├── CartCounter/
│   │       └── CartCounterConnected/
│   ├── toggle-like/              # LikeButton c useOptimistic
│   │   └── ui/LikeButton/
│   ├── add-review/               # форма отзыва на useActionState
│   │   └── ui/AddReviewForm/
│   ├── edit-profile/             # форма редактирования профиля
│   │   └── ui/EditProfileForm/
│   ├── delete-account/           # удаление аккаунта + модалка
│   │   └── ui/DeleteAccountButton/
│   ├── search-products/          # поиск в хедере
│   │   ├── model/
│   │   └── ui/SearchProducts/
│   └── sort-products/            # сортировка каталога
│       ├── model/                # useSort
│       └── ui/SortProducts/
│
├── entities/                     # бизнес-сущности
│   ├── user/
│   │   ├── api/                  # authApi: login, register, getMe, updateMe, deleteUser
│   │   └── model/                # userSlice + selectors
│   ├── product/
│   │   ├── api/                  # productApi: getProducts, like/unlike, reviews
│   │   └── ui/
│   │       ├── Price/
│   │       └── ProductImage/
│   ├── cart/
│   │   ├── model/                # cartSlice + selectors + persist
│   │   └── ui/
│   │       ├── CartAmount/       # useMemo-суммы
│   │       ├── CartBadge/        # счётчик в хедере
│   │       └── CartItem/
│   └── review/
│       └── ui/ReviewCard/
│
└── shared/                       # переиспользуемое без бизнес-контекста
    ├── api/                      # baseQuery RTK Query с авторизацией
    ├── assets/
    │   ├── icons/                # SVG-иконки (импорт с ?react)
    │   └── images/
    ├── hooks/                    # общие хуки
    ├── lib/                      # утилиты (cartStorage, authStorage)
    ├── providers/
    │   └── router/config/        # createBrowserRouter + маршруты
    ├── store/
    │   ├── hooks/                # useAppSelector, useAppDispatch
    │   └── slices/
    ├── types/                    # глобальные типы (Product, User, ...)
    ├── ui/                       # UI-кит
    │   ├── Button/
    │   ├── ButtonBack/
    │   ├── Input/
    │   ├── Loader/
    │   ├── Logo/
    │   ├── Modal/                # React.createPortal + focus trap
    │   ├── Rating/
    │   └── WithQuery/            # обёртка loading/error состояний
    └── utils/
```

## Webpack vs Vite+SWC

Замер: чистая сборка production (без прогретого кеша) на этом проекте,
Node 22, Linux.

| Метрика                  | Webpack 5 + ts-loader | Vite 6 + SWC       | Разница  |
|--------------------------|-----------------------|---------------------|----------|
| Время prod-сборки        | ~7.4 с                | ~2.0 с              | ~3.7×    |
| Размер `dist` / `dist-vite` | 548 KB              | 536 KB              | сопоставимо |
| Основной JS-чанк         | 423 KB (1 файл)       | 464 KB (1 файл)     | сопоставимо |
| Dev-старт                | ~2–3 с до первого байта | мгновенный         | -        |
| HMR                      | через react-refresh    | нативный, быстрее  | -        |
| TS-трансформация         | ts-loader (тайпчек)   | SWC (без тайпчека, `tsc --noEmit` отдельно) | Vite ощутимо быстрее |

Ключевые различия в конфигурации:

- Webpack: ручные правила для `.svg` (два варианта через `oneOf` по
  `resourceQuery: /react/`), `css-loader` с `modules.auto`,
  `MiniCssExtractPlugin` в prod, `webpack.DefinePlugin` под `process.env`.
- Vite: три плагина - `@vitejs/plugin-react-swc`, `vite-plugin-svgr`,
  `vite-tsconfig-paths`. Поддержка CSS-модулей из коробки.

---

## Скриншоты

### Логин
![Логин](screenshots/signin.png)

### Регистрация
![Регистрация](screenshots/signup.png)

### Каталог
![Каталог](screenshots/home.png)

### Карточка товара
![Карточка товара](screenshots/details.png)

### Отзывы
![Отзывы](screenshots/review.png)

### Корзина
![Корзина](screenshots/cart.png)

### Избранные
![Избранные](screenshots/favorite.png)

### Профиль
![Профиль](screenshots/profile.png)

### Toastify
![Toastify](screenshots/toastify.png)