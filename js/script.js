// Ждем, когда весь DOM загрузится
document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для бургер-меню (мобильная навигация) ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', function() {
            // Переключаем класс 'active' для меню и анимацию бургера
            nav.classList.toggle('active');
            burger.classList.toggle('active');

            // Анимация бургера в крестик (простой вариант)
            const lines = burger.querySelectorAll('.burger__line');
            if (burger.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });

        // Закрывать меню при клике на ссылку (для удобства)
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
                // Сброс анимации бургера
                const lines = burger.querySelectorAll('.burger__line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
    }

    // --- Обработка формы подписки (имитация) ---
    const subscribeForm = document.getElementById('subscribeForm');
    const formMessage = document.getElementById('formMessage');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Останавливаем реальную отправку

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Показываем сообщение об успехе
                formMessage.textContent = `Спасибо! На ${email} отправлено письмо с подтверждением.`;
                formMessage.style.color = '#ffffff'; // Белый текст на цветном фоне
                emailInput.value = ''; // Очищаем поле

                // Через 5 секунд убираем сообщение
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }
        });
    }

    // --- Простая анимация появления карточек при скролле (опционально) ---
    // Используем Intersection Observer для плавного появления
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Применяем к карточкам и статьям
    const animatedElements = document.querySelectorAll('.card, .article-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});