document.addEventListener("DOMContentLoaded", () => {
    // --- 1. МЕНЮ (БУРГЕР) ---
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const overlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    if (burger && nav) {
        burger.onclick = (e) => {
            e.stopPropagation();
            toggleMenu();
        };

        if (overlay) overlay.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // --- 2. АВТОМАТИЧЕСКИЙ ГОД ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 3. ГАЛЕРЕЯ (Lightbox) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = item.getAttribute('href');
                if (lightboxImg) lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                body.classList.add('no-scroll');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.classList.remove('no-scroll');
            setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // --- 4. МОДАЛЬНОЕ ОКНО ТЕХНИКИ (Список 1-20) ---
    const machinesData = {
        "1": {
            title: "Камаз 4208 (Вахтовка)",
            img: "assets/machines/1.png",
            desc: "Надежный грузовой автомобиль для перевозки вахтовых бригад и оборудования в условиях бездорожья.",
            specs: { "Год выпуска": "2012", "Гос. номер": "KZ 809AU11", "Колесная формула": "6x6", "Двигатель": "Дизель", "Мест": "22+2" },
            status: "Исправный/ на базе"
        },
        "2": {
            title: "ВАЗ-Нива 21214",
            img: "assets/machines/2.png",
            desc: "Легкий внедорожник для оперативного реагирования и патрулирования местности.",
            specs: { "Год выпуска": "2012", "Гос. номер": "KZ 052AU11", "Привод": "Полный 4x4", "Двигатель": "1.7 л (Бензин)", "Мощность": "83 л.с." },
            status: "Исправный/ на базе"
        },
        "3": {
            title: "Toyota Land Cruiser Prado",
            img: "assets/machines/3.png",
            desc: "Штабной автомобиль командного состава. Высокая проходимость и надежность.",
            specs: { "Год выпуска": "2008", "Гос. номер": "KZ 064AU11", "Объем двигателя": "2.7 л", "Привод": "4WD", "Тип": "Внедорожник" },
            status: "Исправный/ на базе"
        },
        "4": {
            title: "КрАЗ 255 (Лаптежник)",
            img: "assets/machines/4.png",
            desc: "Тяжелый грузовик-вездеход с колесной формулой 6x6. Предназначен для транспортировки крупногабаритных грузов.",
            specs: { "Год выпуска": "1989", "Гос. номер": "KZ 034AU11", "Двигатель": "ЯМЗ-238", "Грузоподъемность": "7.5 т", "Колеса": "Широкопрофильные" },
            status: "Исправный/ на базе"
        },
        "5": {
            title: "Камаз 43118",
            img: "assets/machines/5.png",
            desc: "Бортовой тягач вездеход. Используется для доставки оборудования на месторождения.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 812AU11", "Колесная формула": "6x6", "Мощность": "300 л.с.", "Грузоподъемность": "10 т" },
            status: "Исправный/ на базе"
        },
        "6": {
            title: "Toyota Hilux Pick Up",
            img: "assets/machines/6.png",
            desc: "Мобильный пикап оперативной группы. Дислокация: месторождение Аманкелди газ.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 220AU11", "Тип": "Пикап 4x4", "Двигатель": "Дизель", "Назначение": "Оперативный выезд" },
            status: "Исправный/ м/р Аманкелди газ"
        },
        "7": {
            title: "Toyota Hilux Pick Up",
            img: "assets/machines/7.png",
            desc: "Мобильный пикап оперативной группы. Дислокация: месторождение Арыскум.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 056AU11", "Тип": "Пикап 4x4", "Двигатель": "Дизель", "Назначение": "Оперативный выезд" },
            status: "Исправный/ м/р Арыскум"
        },
        "8": {
            title: "Автокран Кс-45717 К-3Р",
            img: "assets/machines/8.png",
            desc: "Автомобильный кран на шасси КАМАЗ для проведения грузоподъемных работ при ликвидации аварий.",
            specs: { "Год выпуска": "2013", "Гос. номер": "KZ 802AU11", "Грузоподъемность": "25 т", "Вылет стрелы": "21 м", "Шасси": "КамАЗ-43118" },
            status: "Требуется ремонт ТНВД"
        },
        "9": {
            title: "Камаз 43 118-10",
            img: "assets/machines/9.png",
            desc: "Грузовой автомобиль повышенной проходимости для материально-технического обеспечения.",
            specs: { "Год выпуска": "2013", "Гос. номер": "KZ 059AU11", "Колесная формула": "6x6", "Двигатель": "Евро-3", "Тип": "Бортовой" },
            status: "Исправный/ на базе"
        },
        "10": {
            title: "KIA Sportage",
            img: "assets/machines/10.png",
            desc: "Кроссовер для административных и служебных задач в городских условиях и на легком бездорожье.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 229AU11", "Привод": "AWD", "Двигатель": "2.0 л", "КПП": "Механика" },
            status: "Требуется ремонт МКПП"
        },
        "11": {
            title: "ГАЗ-33027-245 (Бизнес)",
            img: "assets/machines/11.png",
            desc: "Малотоннажный грузовой автомобиль с полным приводом для перевозки инвентаря.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 062AU11", "Привод": "4x4", "Грузоподъемность": "1.5 т", "Тип": "Бортовой" },
            status: "Исправный/ на базе"
        },
        "12": {
            title: "Камаз 43118-46",
            img: "assets/machines/12.png",
            desc: "Модифицированный вездеход КамАЗ. Высокая автономность и проходимость.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 813AU11", "Колесная формула": "6x6", "Двигатель": "КамАЗ 740.662", "Мощность": "300 л.с." },
            status: "Исправный/ на базе"
        },
        "13": {
            title: "Газель ГАЗ 27057",
            img: "assets/machines/13.png",
            desc: "Грузопассажирский фургон (комби) с полным приводом. Вмещает бригаду и оборудование.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 061AU11", "Привод": "4x4", "Мест": "7", "Тип": "Фургон ЦМФ" },
            status: "Исправный/ на базе"
        },
        "14": {
            title: "УАЗ (Буханка)",
            img: "assets/machines/14.png",
            desc: "Классический автомобиль-вездеход. Обслуживает ТОО «КазГерМунай».",
            specs: { "Год выпуска": "2018", "Гос. номер": "KZ 756AC11", "Привод": "4x4", "Двигатель": "ЗМЗ-409", "Тип": "Остекленный фургон" },
            status: "Исправный/ ТОО «КазГерМунай»"
        },
        "15": {
            title: "УАЗ (Буханка)",
            img: "assets/machines/15.png",
            desc: "Санитарно-оперативный автомобиль. Используется для служебных разъездов.",
            specs: { "Год выпуска": "2021", "Гос. номер": "KZ 844AX11", "Привод": "4x4", "Экологический класс": "Евро-5", "Год": "2021" },
            status: "Исправный/служба"
        },
        "16": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/16.png",
            desc: "Служебный внедорожник на месторождении «Торгай Петролеум».",
            specs: { "Год выпуска": "2022", "Гос. номер": "KZ 774 BM 09", "Двигатель": "1.7 л", "Привод": "Полный", "Кузов": "3-дверный" },
            status: "Исправный/ м/р «Торгай Петролеум»"
        },
        "17": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/17.png",
            desc: "Служебный внедорожник. Обслуживает м/р «Полторацкое» и «Акшабулак».",
            specs: { "Год выпуска": "2022", "Гос. номер": "KZ 772 BM 09", "Двигатель": "1.7 л", "Привод": "Полный", "Год": "2022" },
            status: "Исправный/ м/р «Полторацкое»"
        },
        "18": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/18.png",
            desc: "Служебный внедорожник на месторождении «Кумколь».",
            specs: { "Год выпуска": "2021", "Гос. номер": "KZ 846AX11", "Двигатель": "1.7 л", "Привод": "Полный", "Год": "2021" },
            status: "Исправный/ м/р «Кумколь»"
        },
        "19": {
            title: "Great Wall King Kong Poer",
            img: "assets/machines/19.png",
            desc: "Современный мощный пикап для перевозки грузов и мобильных групп.",
            specs: { "Год выпуска": "2023", "Гос. номер": "KZ 335AC11", "Двигатель": "2.0 Турбодизель", "КПП": "Механика", "Привод": "4WD" },
            status: "Требуется ремонт МКПП"
        },
        "20": {
            title: "ГАЗ-27527 Соболь 4x4",
            img: "assets/machines/20.png",
            desc: "Новый полноприводный микроавтобус. Высокий комфорт и проходимость.",
            specs: { "Год выпуска": "2025", "Гос. номер": "KZ 602AS11", "Привод": "Полный", "Мест": "7", "Двигатель": "Cummins/Evotech" },
            status: "Исправный/ на базе"
        }
    };

    const modalOverlay = document.getElementById('machine-modal');
    const modalCloseBtn = document.querySelector('#machine-modal .modal-close');
    const vehicleCards = document.querySelectorAll('.js-view-details');

    const mTitle = document.getElementById('modal-title');
    const mImg = document.getElementById('modal-img');
    const mDesc = document.getElementById('modal-desc');
    const mSpecs = document.getElementById('modal-specs');
    const mStatus = document.getElementById('modal-status');

    if (modalOverlay && vehicleCards.length > 0) {
        vehicleCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const data = machinesData[id];
                if (data) {
                    mTitle.textContent = data.title;
                    mImg.src = data.img;
                    mDesc.textContent = data.desc;
                    mSpecs.innerHTML = '';

                    if (data.specs) {
                         for (const [key, value] of Object.entries(data.specs)) {
                            const li = document.createElement('li');
                            li.innerHTML = `<span style="color: var(--color-primary)">${key}:</span> ${value}`;
                            mSpecs.appendChild(li);
                        }
                    }

                    mStatus.textContent = "Статус: " + data.status;
                    mStatus.style.color = data.status.toLowerCase().includes('ремонт') ? '#ffcc00' : '#00e0ff';

                    modalOverlay.classList.add('active');
                    body.classList.add('no-scroll');
                }
            });
        });

        const closeModalFunc = () => {
            modalOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        };
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModalFunc);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModalFunc(); });
    }

    // --- 5. МОДАЛЬНОЕ ОКНО СОТРУДНИКОВ (TEAM MODAL) ---

    // База данных сотрудников
    const teamData = {
        "1": { // Көкеев Әділ
            name: "Көкеев Әділ",
            role: "И.о директор филиала",
            img: "assets/team/adil_kokeyev.png",
            bio: `Дата рождения: 26 ноября 1968 г.
            Көкеев Әділ Мұсахметұлы родился 26 ноября 1968 года в пос. Жосалы Кармакшинского района Кызылординской области.
            В 1988 г. окончил Кызылординский политехничексий колледж, в 1996 г. – Кызылординский политехнический институт по специальности «Инженер-строитель», в 2003 г. – Кокшетауский технический институт АЧС РК по специальности «Инженер пожарной безопасности».
            Трудовую деятельность начал в 1997 году в службе пожаротушения, занимая должности инженера, Начальника управления нормирования и лицензирования ДПС Кызылординской области, Начальника ГУ «Службы пожаротушения и аварийно-спасательных работ ДЧС РК».
            В 2019 году продолжил службу в РЦШ ПВАСС в должностях Начальника пожарной части Кызылординского филиала «Ақ Берен» и заместителя директора филиала по пожарной безопасности, с 01 августа 2024 года по итогам результативной работы назначен исполняющим обязанности директора Кызылординского филиала «Ақ Берен» РЦШ ПВАСС.
            Под непосредственным руководством Көкеева Ә.М. вверенные спасательные подразделения неоднократно выезжали на ликвидацию крупных пожаров, аварий, привлекались к республиканским, областным командно-штабным и тактико-специальным учениям. При этом результаты выполнения подразделениями боевых задач регулярно получают самую высокую оценку.
            За период службы Көкеев Ә.М. лично принимал участие в тушении сложных пожаров и имеет большой опыт проведения аварийно-спасательных работ.
            За добросовестное отношение к работе, внесенный вклад в развитие и укрепление государственной системы чрезвычайных ситуаций Көкеев Ә.М. награжден медалями «Өртке қарсы қызмет органдарындағы мінсіз қызметі үшін» III, II степеней, нагрудными знаками «Төтенше жағдайлар жүйесіне еңбегі сіңген қызметкер» III степени и «Төтенше жағдайлар жүйесін дамытуға қосқан үлесі үшін», медалью «Төтенше жағдайлардың алдын алуда және жоюда үздік шыққаны үшін», Почетной грамотой и Благодарственными письмами МЧС РК, Генерального директора РЦШ ПВАСС и Акима Кызылординской области..`,
            phone: "77753951101",
            email: "kokeev.am@centrspas.kz"
        },
        "2": { // Батырхан Асылхан
            name: "Батырхан Асылхан",
            role: "Начальник ОПО",
            img: "assets/team/asylkhan_batyrkhan.png",
            bio: `Дата рождения: [НЕТ ДАННЫХ]
            Биография пока не заполнена.`,
            phone: "77082341499",
            email: "batyrhan.ab@centrspas.kz"
        },
        "3": { // Рашитов Тоғанас
            name: "Рашитов Тоғанас",
            role: "Ведущий инженер по АСО",
            img: "assets/team/toganas_rashitov.png",
            bio: `Дата рождения: [НЕТ ДАННЫХ]
            Биография пока не заполнена.`,
            phone: "77778788201",
            email: "rashitov.ta@centrspas.kz"
        }
    };

    const teamModal = document.getElementById('team-modal');
    const teamModalClose = document.querySelector('.team-modal-close');
    const teamCards = document.querySelectorAll('.js-team-details');

    const tName = document.getElementById('team-modal-name');
    const tRole = document.getElementById('team-modal-role');
    const tImg = document.getElementById('team-modal-img');
    const tBio = document.getElementById('team-modal-bio');
    const tContacts = document.querySelector('.team-contacts-modal');

    if (teamModal && teamCards.length > 0) {
        teamCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const person = teamData[id];

                if (person) {
                    tName.textContent = person.name;
                    tRole.textContent = person.role;
                    tImg.src = person.img;
                    tBio.textContent = person.bio;

                    tContacts.innerHTML = `
                        <a href="https://wa.me/${person.phone}" target="_blank" aria-label="Whatsapp"><i class="fab fa-whatsapp"></i></a>
                        <a href="mailto:${person.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>
                    `;

                    teamModal.classList.add('active');
                    document.body.classList.add('no-scroll');
                }
            });
        });

        const closeTeamModal = () => {
            teamModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        if (teamModalClose) teamModalClose.addEventListener('click', closeTeamModal);
        teamModal.addEventListener('click', (e) => {
            if (e.target === teamModal) closeTeamModal();
        });
    }

    // --- 6. КНОПКА НАВЕРХ (SCROLL TO TOP) ---
    const scrollBtn = document.getElementById("scrollTopBtn");

    if (scrollBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollBtn.style.display = "flex";
            } else {
                scrollBtn.style.display = "none";
            }
        };

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // DROPDOWN НА МОБИЛЬНЫХ (клик вместо ховера)
    function initMobileDropdown() {
        if (window.innerWidth <= 1200) {
            const dropdowns = document.querySelectorAll('.dropdown');

            dropdowns.forEach(dropdown => {
                const toggle = dropdown.querySelector('.dropdown-toggle');

                if (!dropdown.dataset.listenerAttached) {
                     dropdown.dataset.listenerAttached = 'true';
                     toggle.addEventListener('click', (e) => {
                        e.preventDefault();

                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove('active');
                            }
                        });

                        dropdown.classList.toggle('active');
                    });
                }
            });
        }
    }

    initMobileDropdown();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initMobileDropdown, 250);
    });

    // --- 7. КАТАЛОГ ЭКИПИРОВКИ (ОБНОВЛЕННАЯ БАЗА) ---

    const detailedEquipmentData = {
        "1": { // IMG_7023.jpg
            title: "Костюм ИТР летний (Мастер)",
            img: "assets/equipment/eng_suit.png",
            desc: "Классический костюм для инженерно-технического состава. Предназначен для защиты от общих производственных загрязнений (ОПЗ) и механических воздействий. Эргономичный крой обеспечивает свободу движений при руководстве работами.",
            specs: {
                "Материал": "Ткань смесовая «Грета» или «Twill» (35% х/б, 65% п/э)",
                "Плотность ткани": "210–240 г/м²",
                "Пропитка": "МВО (Масловодоотталкивающая)",
                "Комплектация": "Куртка укороченная на поясе, брюки с усилением",
                "Застежка": "Центральная на молнии с ветрозащитной планкой",
                "Карманы": "Многофункциональные объемные (для рации, документов)",
                "Страна производства": "Казахстан / Россия"
            },
            standards: "ГОСТ 12.4.280-2014 «Одежда специальная для защиты от общих производственных загрязнений». ТР ТС 019/2011."
        },
        "2": { // IMG_7022.jpg
            title: "Костюм влагозащитный КЩС (Тяжелый тип)",
            img: "assets/equipment/chem_black.png",
            desc: "Герметичный костюм из прорезиненной ткани для работы в особо тяжелых условиях. Используется при ликвидации разливов нефти, очистке резервуаров и работе с агрессивными средами. Обеспечивает полную защиту от воды и растворов кислот/щелочей.",
            specs: {
                "Материал": "Прорезиненная ткань Т-15 или ПВХ на трикотажной основе",
                "Герметичность швов": "Сварные ТВЧ (током высокой частоты)",
                "Защитные свойства": "Вн (водонепроницаемость), К50 (кислоты до 50%), Щ50 (щелочи до 50%)",
                "Особенности": "Защитная пелерина, карабины (нержавеющая сталь)",
                "Температурный режим": "от -30°C до +45°C",
                "Вес комплекта": "Около 3.2 кг"
            },
            standards: "ГОСТ 12.4.251-2013 (EN 14605:2005). Соответствует классу защиты 3."
        },
        "3": { // IMG_7003.jpg
            title: "Комбинезон огнестойкий (Буровик)",
            img: "assets/equipment/fire_red.png",
            desc: "Цельный комбинезон для работы на взрывопожароопасных объектах. Красный цвет обеспечивает высокую заметность персонала (сигнальная функция). Материал не поддерживает горение и защищает от кратковременного воздействия пламени.",
            specs: {
                "Материал": "Огнестойкая ткань с арамидными волокнами (Nomex/Kermel) или хлопок с пропиткой Proban",
                "Плотность": "260 г/м²",
                "Защита от огня": "Индекс 3 (ограниченное распространение пламени)",
                "Антистатичность": "Нить Nega-Stat (сетка 5x5 мм)",
                "Фурнитура": "Термостойкая, химостойкая (YKK)",
                "Светоотражение": "Ленты 50 мм (огнестойкие)"
            },
            standards: "ГОСТ Р ИСО 11612-2014, ГОСТ 11209-2014. Защита от статического электричества, тепла и пламени."
        },
        "4": { // IMG_7007.jpg
            title: "Костюм влагозащитный «Садко» (Облегченный)",
            img: "assets/equipment/rain_green.png",
            desc: "Легкий и компактный костюм для защиты от атмосферных осадков, ветра и грязи. Надевается поверх основной спецодежды. Идеален для полевых работ в дождливую погоду.",
            specs: {
                "Материал": "Нейлон (Oxford 210D) с внутренним ПВХ-покрытием",
                "Водоупорность": "Не менее 3000 мм вод. ст.",
                "Швы": "Проклеенные изнутри лентой",
                "Вентиляция": "Люверсы в подмышечной области и кокетка на спине",
                "Капюшон": "Регулируемый, убирается в воротник",
                "Вес": "0.8 - 1.0 кг"
            },
            standards: "ГОСТ 12.4.281-2014 «Одежда специальная повышенной видимости» (в части сигнальных элементов), ТР ТС 019/2011."
        },
        "5": { // IMG_7001.jpg
            title: "Костюм «Нефтяник» (Сигнальный)",
            img: "assets/equipment/oil_blue.png",
            desc: "Костюм из ткани с пленочным покрытием для работы с нефтепродуктами и маслами. Широкие светоотражающие полосы обеспечивают безопасность при работе в темное время суток и в условиях плохой видимости.",
            specs: {
                "Материал верха": "Полиэфирная ткань с полиуретановым (PU) или ПВХ покрытием",
                "Защитные свойства": "Нс, Нм (от сырой нефти и нефтепродуктов)",
                "Цвет": "Темно-синий с флуоресцентными вставками",
                "Класс видимости": "3 (Высший)",
                "Усиления": "Налокотники и наколенники",
                "Подкладка": "Сетка (для вентиляции) или утепленная (в зимней версии)"
            },
            standards: "ГОСТ 12.4.281-2014, ГОСТ 12.4.310-2016 (защита от нефти)."
        },
        "6": { // IMG_7010.jpg
            title: "Комбинезон «Offshore» (Оранжевый)",
            img: "assets/equipment/fire_orange.png",
            desc: "Международный стандарт спецодежды для морских платформ и работы в пустынной местности. Оранжевый цвет является основным требованием безопасности на многих международных проектах (NCOC, TCO).",
            specs: {
                "Материал": "Арамидная ткань (Meta-Aramid 93%, Para-Aramid 5%, Antistatic 2%)",
                "Торговая марка": "Типа Nomex IIIA",
                "Термостойкость": "Не плавится при +400°C",
                "Защита от дуги": "Arc Flash Protection (ATPV рейтинг)",
                "Карманы": "Накладные с клапанами на латунных кнопках",
                "Нашивки": "Огнестойкие логотипы"
            },
            standards: "EN ISO 11612 (A1, B1, C1), EN 1149-5 (Антистатика). NFPA 2112 (США)."
        },
        "7": { // IMG_7015.jpg
            title: "Комплект теплоотражательный (ТОК-200)",
            img: "assets/equipment/tok_silver.png",
            desc: "Специальный костюм для защиты пожарных и спасателей от интенсивного теплового излучения и высоких температур. Позволяет работать в непосредственной близости от очага пожара.",
            specs: {
                "Материал верха": "Стеклоткань металлизированная (алюминиевое напыление)",
                "Отражение тепла": "До 90% лучистой энергии",
                "Температурный диапазон": "Окружающая среда до +200°C, кратковременно до +800°C",
                "Тепловой поток": "До 18 кВт/м²",
                "Комплектация": "Куртка с капюшоном, брюки, бахилы, трехпалые перчатки",
                "Визор": "Закаленное стекло с золотым напылением"
            },
            standards: "ГОСТ Р 53264-2009 «Одежда специальная защитная пожарного». Сертификат пожарной безопасности."
        },
        "8": { // IMG_7019.jpg
            title: "Костюм КЩС (Оранжевый спец. назначения)",
            img: "assets/equipment/chem_orange.png",
            desc: "Аналог черного костюма тяжелого типа, выполненный в сигнальном цвете. Предназначен для аварийно-спасательных работ при утечках химически опасных веществ (АХОВ).",
            specs: {
                "Материал": "Ткань прорезиненная сигнальная (T-15 Orange)",
                "Стойкость к химии": "Высокая (концентрированные кислоты и щелочи)",
                "Конструкция": "Куртка с капюшоном (герметизация лица), полукомбинезон",
                "Швы": "Двойная проклейка лентой",
                "Применение": "Химзаводы, ликвидация аварий на ЖД транспорте",
                "Срок хранения": "До 10 лет"
            },
            standards: "ГОСТ 12.4.248-2008. СИЗ изолирующего типа."
        }
    };

    // --- АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ КАРТОЧЕК ---
    const equipmentCatalog = document.getElementById('equipment-catalog');

    if (equipmentCatalog) {
        equipmentCatalog.innerHTML = '';

        for (const [id, item] of Object.entries(detailedEquipmentData)) {
            const card = document.createElement('div');
            card.className = 'equipment-card js-view-equipment';
            card.setAttribute('data-id', id);

            // ИСПРАВЛЕННЫЙ HTML-ШАБЛОН: Все элементы - прямые дети
            card.innerHTML = `
                <div class="equipment-preview">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                </div>
                <h3>${item.title}</h3>
                <p>${item.desc.substring(0, 100)}...</p>
                <button class="machine-details-link">Подробнее &rarr;</button>
            `;

            equipmentCatalog.appendChild(card);
        }
    }

    const eqModal = document.getElementById('equipment-modal');
    const eqClose = document.querySelector('#equipment-modal .modal-close');
    const eqCards = document.querySelectorAll('.js-view-equipment');

    const eqTitle = document.getElementById('eq-modal-title');
    const eqImg = document.getElementById('eq-modal-img');
    const eqDesc = document.getElementById('eq-modal-desc');
    const eqSpecs = document.getElementById('eq-modal-specs');
    const eqStandards = document.getElementById('eq-modal-standards');

    if (eqModal && eqCards.length > 0) {
        eqCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const item = detailedEquipmentData[id];

                if (item) {
                    eqTitle.textContent = item.title;
                    eqImg.src = item.img;
                    eqDesc.textContent = item.desc;
                    eqStandards.textContent = item.standards;

                    eqSpecs.innerHTML = '';
                    for (const [key, value] of Object.entries(item.specs)) {
                        const li = document.createElement('li');
                        li.innerHTML = `<span>${key}:</span> <span>${value}</span>`;
                        eqSpecs.appendChild(li);
                    }

                    eqModal.classList.add('active');
                    document.body.classList.add('no-scroll');
                }
            });
        });

        const closeEqModal = () => {
            eqModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        if (eqClose) eqClose.addEventListener('click', closeEqModal);
        eqModal.addEventListener('click', (e) => { if (e.target === eqModal) closeEqModal(); });
    }

});
// --- 8. МОДАЛЬНОЕ ОКНО КАРТЫ (LIGHTBOX) ---
    const mapLightbox = document.getElementById('map-lightbox');
    const mapClickable = document.querySelector('.map-clickable');
    const mapModalClose = document.querySelector('.map-modal-close');

    if (mapLightbox && mapClickable) {
        mapClickable.addEventListener('click', () => {
            mapLightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        });

        const closeMapModal = () => {
            mapLightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        if (mapModalClose) mapModalClose.addEventListener('click', closeMapModal);
        mapLightbox.addEventListener('click', (e) => {
            if (e.target === mapLightbox) closeMapModal();
        });
    }
