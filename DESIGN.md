# UI/UX "WOW Effect" Upgrade Plan

Этот документ предназначен для ИИ-агентов и разработчиков. Он описывает следующую стадию внедрения премиальных визуальных эффектов в портфолио, с сохранением высокой производительности (60+ FPS) за счет правильного использования `framer-motion` и CSS.

---

## 1. Интерактивная 3D-подсветка карточек (Hover Spotlight)

**Файл:** [Portfolio.jsx](file:///Users/andreybolshakov/WebstormProjects/portfolio/src/pages/portfolio/Portfolio.jsx) (Компонент `ProjectCard`)  
**Ожидаемый эффект:** При наведении мыши на карточку проекта, радиальный градиент "следит" за курсором, подсвечивая границы карточки и её фон. Эффект похож на стекло (Glassmorphism) с физическим источником света.

**Рекомендации по реализации:**
- **НЕ ИСПОЛЬЗУЙТЕ** `useState` для трекинга координат X/Y внутри компонента! Это вызовет лавину перерендеров (см. [#PERF-01]).
- **Используйте** `useMotionValue` и `useMotionTemplate` из `framer-motion` для динамического обновления CSS-переменной `--mouse-x` и `--mouse-y` прямо в DOM.
- Создайте дополнительный `div` (например, `.spotlight-overlay`) внутри карточки проекта с абсолютным позиционированием и `pointer-events: none`.
- Задайте этому элементу:
  ```css
  background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      var(--accent-hover-shadow),
      transparent 40%
  );
  ```
- Для применения эффекта к границам можно использовать CSS-маску `mask-image`.

---

## 2. Магнитные элементы (Magnetic Buttons)

**Файлы:** 
- [Portfolio.jsx](file:///Users/andreybolshakov/WebstormProjects/portfolio/src/pages/portfolio/Portfolio.jsx) (Кнопки фильтров "All / Bots / Web")
- Желательно создать отдельный переиспользуемый компонент: `src/components/MagneticButton/MagneticButton.jsx`

**Ожидаемый эффект:** Кнопка физически притягивается к курсору при сближении, а при выходе курсора за пределы упруго возвращается на место (spring effect).

**Рекомендации по реализации:**
- Создайте wrapper-компонент, который слушает `onMouseMove` и использует вычисление расстояния от центра кнопки (через `getBoundingClientRect()`).
- Передайте рассчитанные смещения `x` и `y` в `useSpring()` хуки от `framer-motion`.
- Используйте конфигурацию пружины примерно такую: `stiffness: 150, damping: 15, mass: 0.1` для максимально естественной и быстрой упругости.
- Оберните `children` в `motion.div` и привяжите к нему эти spring-переменные стилей.

---

## 3. Каскадное выплывание контента (Staggered Grid Reveal)

**Файл:** [Portfolio.jsx](file:///Users/andreybolshakov/WebstormProjects/portfolio/src/pages/portfolio/Portfolio.jsx) (Блок с карточками проектов)

**Ожидаемый эффект:** При монтировании страницы или переключении фильтров массива, карточки не появляются все разом рывком, а "всплывают" одна за другой с размытием (blur) по оси Y с шагом 50-100 мс.

**Рекомендации по реализации:**
- Замените родительский `div` сетки проектов на `motion.div`.
- Замените `ProjectCard` оборачивающий `div` на `motion.div`.
- Используйте систему вариантов (Variants) из Framer Motion:
  ```javascript
  const container = {
      hidden: { opacity: 0 },
      show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
      }
  };
  const item = {
      hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
      show: { opacity: 1, y: 0, filter: 'blur(0px)' }
  };
  ```
- Убедитесь, что для фильтрации используется `<AnimatePresence mode="popLayout">`, чтобы уходящие карточки проектов плавно исчезали, а новые занимали их место без прыжков макета.

---

## 4. Зернистость Пленки / Стеклянный Шум (Grain Noise Overlay)

**Файл:** [App.jsx](file:///Users/andreybolshakov/WebstormProjects/portfolio/src/App.jsx) или глобальный CSS файл (`index.css`).

**Ожидаемый эффект:** Темная тема выглядит менее "плоской" и стерильной. Тонкая текстура шума создает эффект кинематографичности и связывает все элементы воедино.

**Рекомендации по реализации:**
- Не используйте Javascript или Canvas для шума! Это излишняя нагрузка.
- Самый производительный способ — добавить глобальный псевдоэлемент к `body` или создать `div` на самом высоком уровне абстракции `App.jsx` со следующими CSS:
  ```css
  .grain-overlay {
      position: fixed;
      top: -50%; left: -50%;
      width: 200%; height: 200%;
      pointer-events: none;
      z-index: 9999;
      background-image: url('/path/to/noise-pattern.svg'); /* Обязательно SVG noise ~200x200px */
      background-repeat: repeat;
      opacity: 0.04;
      animation: grain-animation 8s steps(10) infinite;
  }
  ```
  *(Анимация `steps()` просто хаотично сдвигает `transform: translate()` на малые величины для симуляции телевизионного шума без нагрузки на CPU)*.

---

## 5. Гладкий инерционный скролл (Lenis Smooth Scroll)

**Файл:** Точка входа приложения (`index.js` или `App.jsx`)

**Ожидаемый эффект:** Навигация по странице становится "масляной", пропадают резкие рывки от колесика мыши.

**Рекомендации по реализации:**
- Установите `@studio-freight/lenis`.
- Инициализируйте его в главном хуке `useEffect` внутри `App.jsx` один раз на этапе маунтинга.
- Синхронизируйте его тики с глобальным RequestAnimationFrame. Если используется `framer-motion`, можно интегрировать вызов `lenis.raf(time)` внутрь флоу `useAnimationFrame`.
