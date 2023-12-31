// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test'

// Подключаем библиотеку Telegram Bot API
const TelegramBot = require('node-telegram-bot-api')

// Массив случайных вопросов
const questions = [
  'Замечаю ли я свой рост как личности?',
  'Позволяю ли я себе быть слабым?',
  'Как я сегодня наполняюсь? Где беру энергию?',
  'Проблемы с пониманием Высшей Силы?',
  'На чем я строю фундамент своей жизни?',
  'Как я понимаю принцип Анонимности?',
  'Не придётся ли мне поступиться какими-либо из моих принципов, чтобы достичь цели?',
  'Зачем я возвращаюсь на группу?',
  'Мой главный дефект характера на сегодня?',
  'Как я общаюсь с Богом моего понимания и для чего?',
  'Принятие себя и Окружающей среды (ситуации/люди раздражители)?',
  'Как я понимаю, что такое любовь и любить?',
  'Что я сегодня сделал такого, что принесло пользу другому?',
  'Как я борюсь с яростью?',
  'Как я справляюсь с выгоранием?',
  'Понял и принял ли я честность? Какая она?',
  'Соблюдение режима дня (как питаюсь? Как сплю?)',
  'Как я понимаю Первый Шаг в целом?',
  'Равнодушие – как у меня проявляется?',
  'Конструктивные решения конфликтных ситуаций?',
  'Плюсы и минусы служения (опыт)',
  'Общение с анонимными, которые в срыве. К чему это приводит, ваш опыт',
  'Качество моей чистоты',
  'Чем я делюсь на собрании? Мотивы моего высказывания',
  'Как я манипулирую программой',
  'Страх оценки',
  'Моё отношение со спонсором',
  'Страх в отношениях',
  'Трудности в выздоровлении',
  'Своеволие как я его понимаю, и как это уничтожает меня и близких мне людей',
  'Проявления по дню ВС',
  'Смирение в действии – как у меня проявляется',
  '7-я традиция',
  '8-й шаг',
  'Как справляетесь с тягой',
  'Доверенные , как я их выбираю. важен ли для меня пол доверенных',
  'Недопонимания со спонсором (что делать?)',
  'Высокомерие – как у меня проявляется',
  'Для чего я общаюсь с новичком, противоположного пола',
  'Какое место в моей жизни занимает страх',
  'Что такое болезнь зависимость',
  'Дружба между мужчиной и женщиной? Есть ли у меня? Какие цели я в этом преследую',
  'Готовность – как ее развиваю и использую',
  'Как распознать приближающийся срыв',
  'Душевный покой',
  'Может ли вредить честность? (опыт)',
  'Как начать себя чувствовать частью сообщества на собраниях',
  'Грань между доверием и доверчивостью',
  'Отпустил ли я финансовую сферу на Волю ВС',
  'Готов ли я стать спонсором',
  'Что важнее – работа по шагам или собрания? Или это одинаково важно для меня',
  'Личное мнение. Как сохранить его, не нанося ущерб себе и окружающим',
  'Страх бедности',
  'Почему я торчал на негативных чувствах. ',
  'Сарказм. Зачем я это делаю? Что чувствую? Думаю ли я о том, над кем издеваюсь?О чувствах человека?',
  'Насколько ты доверяешь людям?',
  'Зависть и сравнение',
  'Не навредил ли я сегодня себе или кому-то другому прямо или косвенно? В чем именно ?',
  'Мое самое разрушающее чувство',
  'Моя любовь к окружающим',
  'Опыт спонсирования',
  'Как я понимаю безусловную любовь Бога? И готов ли я стать его подобием?',
  'Почему я избегаю реальности?',
  'Сделал ли я сегодня то за что меня грызет совесть и стоило ли оно того?',
  'Что для меня групповое сознание и как оно проявляется?',
  'Как ты служишь своей семье?',
  'Предубеждения в программе',
  'Что мне даёт боль?',
  'Недовольство собой (самобичевание)',
  'Одержимость собственной значимостью. Как я с этим работаю сегодня?',
  'Что для меня означает вера?',
  'Как я начинаю верить?',
  'Как часто я хожу на собрания? Для чего они мне нужны?',
  'Стоит ли говорить что я зависимый и как? (Опыт)',
  'Для чего я прихожу на собрание?',
  'Какой я настоящий?',
  'Примеры, когда укрепилась моя вера в Высшую Силу',
  'Как избавиться от мысли, что ты уже выздоровел и можешь обойтись без программы?',
  'Есть ли у меня страх преодолевать трудности, которые раньше мне не встречались?',
  'Как моя болезнь изолирует меня от мира?',
  'Инструменты программы выздоровления на ежедневной основе?',
  'Агрессия по отношению к людям',
  'Что такое забота о близких?',
  'Что мне помогает когда мне плохо?',
  'Был ли у меня удачный опыт решения проблемы, решать которую мне было страшно и сразу не удавалось?',
  'Грань между здоровыми личными границами и обидчивостью, злопамятностью',
  'Добровольно ли я помогаю людям или преследую свои корыстные цели?',
  'Как зависимость рушит меня и жизнь моих близких?',
  'Что для меня Любовь? Как я это понимаю? Чувствую ли я Любовь?',
  'Принцип «как будто» – когда мне помогает и когда вредит?',
  'Сожалею ли я о чем либо? Если да то о чем? Как я с этим справляюсь?',
  'Необязательно быть несчастным.',
  'Что мне дало служение в АН?',
  'Каких духовных принципов я придерживаюсь в своей жизни?',
  'Готов ли я остаться чистым даже когда рядом окажутся наркотики?',
  'Чувство стыда – как проявляется, как с ним работаю, что с ним делаю?',
  'Как я укрепляю уверенность в себе?',
  'Сходятся ли моя и Божья Воля?',
  'Незаконченное служение - приговор?',
  'Бегаю ли я за престижем/властью/авторитетом?',
  // 100
  'Примирился ли я с тем, что мне придется совершать определенные действия, чтобы остаться чистым?',
  'Насколько для меня важна эмоциональная атмосфера на собрании (группе)?',
  'Верил ли я когда-нибудь во что-то, о чем не имел достаточного представления? Что это было?',
  'Принцип 5-го шага в повседневной жизни',
  'Срыв дар или проклятье?',
  'Отношения в чистоте и чистота (честность) в отношениях',
  'Примеры присутствия Бога в выздоровлении',
  'Могу ли я сегодня довериться кому-нибудь в АН?',
  'Навешиваю ли я ярлыки?',
  '12-й шаг',
  'Саможалость - как выходить из неё?',
  'Перфекционизм – как у меня проявляется? И что я с этим делаю',
  'Дар отчаяния, что это для меня значит?',
  'Предвзятое отношение на группе',
  'Тщеславие – как у меня проявляется?',
  'Как я развиваю физическую (биологическую) сферу?',
  'Как я отношусь к сплетням?',
  'Как я отстаиваю границы?',
  'Отношения с противоположным полом в выздоровлении',
  'Не хватает времени на программу из-за работы, страх обесценки и возврату к прошлому.',
  'Перед чем у меня нет готовности принять Бессилие?',
  'К чему меня приводит нечестность?',
  'Возникало ли у меня сегодня чувство зависти? Что я с ним сделал(а)?',
  'Одержимость едой',
  'Только сегодня как я это понимаю как применяю?',
  'Прощение. Себя? Есть ли оно сегодня?',
  'Конфликты с участниками сообщества АН',
  'Грань между границами безопасности и самоизоляцией',
  'Как на мою жизнь влияет духовное пробуждение и есть ли оно?',
  'Как вы перестали употреблять, что сопутствовало этому?',
  'Работа в выздоровлении',
  'Слушаю ли я тяговую музыку?',
  'Всегда ли нужно избегать конфликты',
  'Что значит принять себя, как это сделать, как у вас это получилось, если получилось?',
  'Как я сегодня сделал по программе выздоровления?',
  'Как не идти на поводу у старого мышления?',
  'Управляла ли сегодня моей жизнью болезнь?',
  'Честность по отношению к себе и к другим?',
  'Эмоциональных и духовный кризис как я из него выходил?',
  'Вижу ли я процесс выздоровления?',
  'Компульсивное поведение в чистоте',
  'Что для меня анонимность?',
  'Счастье проявлять любовь к окружающим',
  'Озабочен ли я собой?',
  'Признаю ли я свою слабость?',
  'Отношения с родителями и родственниками',
  'Кто для меня спонсор. Делаю ли я все, что говорит спонсор? Как я выбирал спонсора?',
  'Дно в чистоте',
  'Занимаюсь ли я самоанализом и какой я вижу результат?',
  'Кто для меня друг?',
  'За что мне бывает стыдно и перед кем?',
  'Как я работаю с угодничеством',
  'Как я работаю с ревностью и неуверенность в другом человеке?',
  'Какие инструменты программы я не пробовал? Или пробовал, но мне не очень подошли?',
  'Что для меня милосердие? как проявляю?',
  'Сколько раз я срывался, и что подтолкнуло меня снова вернуться в сообщество?',
  'В каких ситуациях я ощущаю гнев?',
  'За что я чувствую сегодня чувство Вины?',
  'Как я понимаю Первый Шаг в целом?',
  'Для чего я сегодня пришел на группу?',
  'Применение традиций в жизни',
  'Мои планы на будущие и чего я хочу?',
  'Проявляются ли у меня злопамятность и мстительность?',
  'Что для меня ущерб?',
  'Как я реагирую на агрессию?',
  'Оцениваю ли я как служат другие?',
  'Могу ли я относиться к жизни проще?',
  'В каком формате и как часто вы общаетесь спонсором и как двигаетесь в пути своего выздоровления с ним?',
  'Плоды выздоровления замечаю ли я их или принимаю как данность?',
  // 200
  'Плоды выздоровления замечаю ли я их или принимаю как данность?',
  'Для чего нужна группа?',
  'Причинять добро, опыт',
  'В чем и к кому у меня проявляется предубежденность?',
  'Что мне помогает простить себя за прошлое сегодня, когда улетаю в моменте и вернуться в здесь и сейчас?',
  'Как у меня с доверием к людям сегодня?',
  'Как вы планируете день?',
  'Практика служения (личный опыт)',
  'Что для меня Смирение?',
  'Конфликты в служении АН',
  'Какой жизненный кризис подтолкнул меня к выздоровлению?',
  '«Принципы, а не личности» – насколько для меня важно поступать по духовным принципам, не взирая на авторитетность других людей?',
  'Насколько я понимаю, что я жил так как мог?',
  'Как часто я устраиваю войну? Для чего мне это?',
  'В каких ситуациях у меня проявляются уныние и жалость к себе?',
  'Как справляться со скукой?',
  'Благодарности, кому и за что',
  'Раздражают анонимные, пользующиеся популярностью, что я с этим делаю?',
  'Манипулирую ли я людьми и зачем?',
  'Моя работа с привычками и негативным мышлением',
  'Отношение с родственниками',
  'Нужно ли себя максимально заставлять проживать чувства и как их правильно проживать?',
  'Для чего я лезу в чужую ответственность, если меня об этом даже не просили?',
  'Как Бог работает в моих страхах?',
  'Принимаю ли я себя такими какое я есть?',
  'Что мне даёт не осуждать других',
  'Безумие в чистоте',
  'Как часто я хожу на собрания? Для чего они мне нужны?',
  'Мой взгляд на выздоровление сегодня?',
  'Примеры моего Бессилия',
  'Что я делаю для своего развития? Как преодолеваю сложности?',
  'Какие «положняки» программы делаю ежедневно (регулярно)?',
  'Как вы медитируете?',
  'Эмоциональные качели во время работы по 4-му шагу',
  'Какие мои дефекты преобладали сегодня?',
  'Есть ли у меня сегодня готовность приложить все силы для выздоровления?',
  'Контроль в отношениях',
  'Не нравиться на живых группах. Как мотивировать себя ходить?',
  'Готов ли я сегодня прощать людей?',
  'Безумие в чистоте',
  'Что я считаю можно говорить на группу, а что нет?',
  'Хватает ли мне сегодня моей осознанности?',
  'Как я проявляю любовь к близким?',
  'Мое отношение к одиночеству?',
  'Как я практикую смирение?',
  'Могу ли я назвать себя зрелой личностью?',
  'Чистота вести, часто ли я о ней задумываюсь?',
  'Как я проверяю любовь?',
  'Обесценивание в чистоте',
  'Замечаю ли я какие-то отголоски Старого поведения в своей сегодняшней жизни? Если да то ка',
  'Хочу ли я меняться и готов ли приложить все усилия?',
  'Как я молюсь?',
  'Как начать открываться в сообществе?',
  'Уверененность в себе (как я развиваю?)',
  "Как я воспринимаю слово 'Бог' в текстах АН, если шаги - программа духовная, а не религиозная?",
  'Насколько сегодня я себя идентифицирую с другими выздоравливающими?',
  'Чувство юмора',
  'Как понять что вру себе?',
  'Негативное отношения к критике',
  'Эгоцентризм и одержимость собой',
  'Одержимость результатом',
  'Как моя рационализация губит меня и жизнь других людей?',
  'Как может измениться моя жизнь, если я приму решение препоручить ее заботе моей Высшей Силы?',
  'Бывает ли у меня обида на Высшую Силу?',
  'Как я объединяю программу с целями/мечтами/планами?',
  'Все ли инструменты выздоровления я использую сегодня?',
  'Что влияет на мою самооценку?',
  'В каких ситуациях я чувствовал себя жертвой?',
  'Как я понимаю Дружбу? И соответствую ли я этому?',
  'Что для меня значит служение!? Как мне это помогает?',
  'Что я сегодня не сделал из того, что хотел?',
  'Чему меня научила (учит) боль?',
  'Замечаю ли я позитивные изменения?',
  'К чему меня приводит самоуверенность?',
  'Как я выражаю любовь?',
  'Как сегодня несу весть я?',
  'Дно в чистоте, страхи. Как я выбирался ( опыт)',
  'Я или Мы?',
  'Доверие к Высшей Силе',
  'Работа по шагам. Как меняется моя жизнь?(примеры/опыт)',
  'Всегда ли я помню о том, что у меня есть выбор?',
  'Моя Высшая Сила. Какая она?',
  'Как я провожу свой досуг?',
  'Своекорыстие – как у меня проявляется?',
  'Поделись, пожалуйста, ситуациями, которые ВС разрулила наилучшим образом. Хотя сначала казалось, что все будет плохо',
  'Что я делаю с внутренней пустотой?',
  'Недоверие Высшей Силе',
  'На что я возлагаю свою надежды?',
  'Как отличить честность от глупости?',
  'Ненависть к себе, примеры.',
  'Проживание грусти',
  'Готов ли я сегодня помочь Сообществу АН?',
  'Что меня отталкивает в сообществе?',
  'Как взаимодействовать с независимыми людьми?',
  'Какой и кому я нанес сегодня ущерб?',
  'Изменилось ли у меня понимание счастья в процессе выздоровления?',
  'Отвержение, как проживаете',
  'Мои цели и желания – помогают быть счастливым или разрушают меня?',
  'Как я забочусь о себе?',
  'Зависть – в чем и к кому у меня проявляется сегодня?',
  'Что мне дал 4-й шаг?',
  // 300
  'Устраивает ли меня моя сексуальность, если нет то почему?',
  'Могу ли перепоручить жизнь Богу или я все время пытаюсь управлять и Богом и жизнью',
  'Благодарность в действии',
  '3-й шаг (опыт применения)',
  "Замечаю ли я какие-то 'старые шаблоны' в моей жизни сегодня?",
  'Как я отрицаю наличие проблем у себя?',
  'Чему научил меня мой первый шаг в АН?',
  'Мои ценности',
  'Испытал ли я облегчение после 5-й шага?',
  'Какие инструменты даруют мне свободу?',
  'Безумие в личных отношениях, как от него избавится?',
  'Есть ли для меня лидеры в сообществе?',
  'Отношения с бывшим(-шей) соупотребом независимым',
  'Какие мои приоритеты сегодня и как я их расставляю?',
  'Почему я оцениваю? И как я с этим работаю?',
  'Зачем я пришёл сегодня на группу?',
  'Эгоцентризм – корень моих проблем',
  'Слушаю и слышу ли я других людей?',
  'Какие духовные принципы я сегодня нарушил?',
  'Какие у меня на сегодня ценности?',
  'Лень – как у меня проявляется?',
  'Как я пришел в программу и почему остался?!',
  'Прощение (когда я прощаю обидчиков) – насколько для меня важно?',
  'Перфекционизм в работе по программе',
  'Духовный принцип непредубежденности',
  'Считаю ли я себя частью АН?',
  'Что я делаю для того чтоб новичок вернулся?',
  'Для чего я выздоравливаю?',
  'Воля ВС – как ее различаю в сложных ситуациях?',
  'Чувство вины – перед кем ощущаю, как с ним работаю, что с ним делаю?',
  'Что именно я считаю примером здравомыслия?',
  'Дефекты характера и мое внутреннее состояние',
  'Как я капитулирую перед программой?',
  'Как Бог со мной общается',
  'Разобраться, кто говорит. Радио в моей голове.',
  'Границы безопасности. Есть ли они у меня?',
  'Могу ли я сегодня назвать свою жизнь стабильной?',
  'Верность своим принципам',
  'Проживание грусти/тоски в выздоровлении',
  'Что мне дают шаги?',
  'За что я еще не готов брать ответственность в своей жизни?',
  'Одержимость ума',
  'За что я могу сегодня быть себе благодарен?',
  'Какие оговорки я отказываюсь выкинуть из своей жизни?',
  'Как справляться со сложностями повседневной жизни чистым?',
  'За что я сегодня могу быть благодарным?',
  'Как моя нечестность разрушает меня и жизнь других людей?',
  'Какие качества у моей Высшей Силы?',
  'Первый шаг, сегодня! Что это для меня!?',
  'Праздники в чистоте',
  'Как я провожу досуг со своей второй половиной,общие интересы?',
  'Чего я боюсь и реальны мои страхи?',
  'Мои достоинства',
  'Как я учусь любить себя и других людей?',
  'Что я могу сделать что бы мир стал немного лучше?',
  'Как я понимаю здоровые отношения?',
  'Моя главная радость в жизни',
  'Почему Честность, Принятие и Капитуляция являются главными ключевыми принципами Первого Шага?',
  'Опыт расставания с партнером в выздоровлении',
  'Отношения вне АН ? Комфортно ли мне в нем?',
  'В чем мне не хватает терпения сегодня?',
  'Какие чувства я сегодня задавил и почему?',
  'Как я отношусь к новичкам?',
  'Что делать когда опускаются руки?',
  'Размышления/медитация по 11-му шагу (опыт)',
  'Какие мои приоритеты сегодня и как я их расставляю?',
  'Почему я оцениваю? И как я с этим работаю?',
  'Зачем я пришёл сегодня на группу?',
  'Эгоцентризм – корень моих проблем',
  'Слушаю и слышу ли я других людей?',
  'Какие духовные принципы я сегодня нарушил?',
  'Какие у меня на сегодня ценности?',
  'Лень – как у меня проявляется?',
  'Как я пришел в программу и почему остался?!',
  'Прощение (когда я прощаю обидчиков) – насколько для меня важно?',
  'Перфекционизм в работе по программе',
  'Духовный принцип непредубежденности',
  'Считаю ли я себя частью АН?',
  'Что я делаю для того чтоб новичок вернулся?',
  'Для чего я выздоравливаю?',
  'Воля ВС – как ее различаю в сложных ситуациях?',
  'Чувство вины – перед кем ощущаю, как с ним работаю, что с ним делаю?',
  'Что именно я считаю примером здравомыслия?',
  'Дефекты характера и мое внутреннее состояние',
  'Как я капитулирую перед программой?',
  'Как Бог со мной общается',
  'Разобраться, кто говорит. Радио в моей голове.',
  'Границы безопасности. Есть ли они у меня?',
  'Могу ли я сегодня назвать свою жизнь стабильной?',
  'Верность своим принципам',
  'Проживание грусти/тоски в выздоровлении',
  'Что мне дают шаги?',
  'За что я еще не готов брать ответственность в своей жизни?',
  'Одержимость ума',
  'За что я могу сегодня быть себе благодарен?',
  'Какие оговорки я отказываюсь выкинуть из своей жизни?',
  'Как справляться со сложностями повседневной жизни чистым?',
  'За что я сегодня могу быть благодарным?',
  'Как моя нечестность разрушает меня и жизнь других людей?',
  'Какие качества у моей Высшей Силы?',
  'Первый шаг, сегодня! Что это для меня!?',
  'Праздники в чистоте',
  'Как я провожу досуг со своей второй половиной,общие интересы?',
  'Чего я боюсь и реальны мои страхи?',
  'Мои достоинства',
  'Как я учусь любить себя и других людей?',
  'Что я могу сделать что бы мир стал немного лучше?',
  'Как я понимаю здоровые отношения?',
  'Моя главная радость в жизни',
  'Почему Честность, Принятие и Капитуляция являются главными ключевыми принципами Первого Шага?',
  'Опыт расставания с партнером в выздоровлении',
  'Отношения вне АН ? Комфортно ли мне в нем?',
  'В чем мне не хватает терпения сегодня?',
  'Какие чувства я сегодня задавил и почему?',
  'Как я отношусь к новичкам?',
  'Что делать когда опускаются руки?',
  'Размышления/медитация по 11-му шагу (опыт)',
  'Какие мои приоритеты сегодня и как я их расставляю?',
  'Почему я оцениваю? И как я с этим работаю?',
  'Зачем я пришёл сегодня на группу?',
  'Эгоцентризм – корень моих проблем',
  'Слушаю и слышу ли я других людей?',
  'Какие духовные принципы я сегодня нарушил?',
  'Какие у меня на сегодня ценности?',
  'Лень – как у меня проявляется?',
  'Как я пришел в программу и почему остался?!',
  'Прощение (когда я прощаю обидчиков) – насколько для меня важно?',
  'Перфекционизм в работе по программе',
  'Духовный принцип непредубежденности',
  'Считаю ли я себя частью АН?',
  'Что я делаю для того чтоб новичок вернулся?',
  'Для чего я выздоравливаю?',
  'Воля ВС – как ее различаю в сложных ситуациях?',
  'Чувство вины – перед кем ощущаю, как с ним работаю, что с ним делаю?',
  'Что именно я считаю примером здравомыслия?',
  'Дефекты характера и мое внутреннее состояние',
  'Как я капитулирую перед программой?',
  'Как Бог со мной общается',
  'Разобраться, кто говорит. Радио в моей голове.',
  'Границы безопасности. Есть ли они у меня?',
  'Могу ли я сегодня назвать свою жизнь стабильной?',
  'Верность своим принципам',
  'Проживание грусти/тоски в выздоровлении',
  'Что мне дают шаги?',
  'За что я еще не готов брать ответственность в своей жизни?',
  'Одержимость ума',
  // 400
  'Принимаю ли себя таким, как есть? Как выражается и что этому мешает?',
  'Взаимоотношения с родителями - что сложнее всего даётся и как справляетесь?',
  'Смирение - как я его понимаю?',
  'Что укрепляет мою Веру?',
  'Баланс в жизненных сферах',
  'Как я отдыхаю?',
  'В чем и как проявляется моё мужество на сегодня? Что это - мужество??',
  'Признать обиды и избавиться от них',
  'Какие действия я сегодня предпринял для своей счастливой жизни?',
  'Границы безопасности. Есть ли они у меня?',
  'Есть ли для меня разница между наркоманией и зависимостью?',
  'Как выглядит мой 11-й шаг (молитва и медитация)',
  'Доверие Высшей Силе',
  'Несу ли я весть людям в срыве, которые все еще страдают',
  'Стал ли я активным членом общества? (Социализация)',
  'Есть ли сегодня у меня готовность возмещать ущерб?',
  'В чем у меня до сих пор есть предубеждения?',
  'От чего зависит моё настроение?',
  '6-й шаг',
  'Как понять что я в одержимости? И как из неё выйти?',
  'Честность перед собой',
  'Мои духовные поступки',
  'Страх осуждения',
  'Новые принципы, которые дарит мне выздоровление',
  'Бывает ли зло во благо?',
  'Опыт служения в комитете',
  'Как справляетесь с контролем и ожиданиями',
  'Готов ли я сегодня открыть тетрадку с шагами?',
  'Страх (что с ним делаю? Как я его переступаю?)',
  'Как справиться с ЖКС?',
  'Как у меня получилось зацепиться за сообщество?',
  'Что значит для меня выздоравливать?',
  'Что такое честность?',
  'Страх быть непринятым',
  'Как научиться выражать без страха благодарность и как искренне просить прощения?',
  'Забота ВС обо мне. Как я это понимаю?',
  'Как не обращать внимание на токсичных людей(злых, грубых)?',
  'Мое отношения к чаям и энергетикам',
  'Делаю ли я 10-й шаг (анализ дня)',
  'Эмоциональное похмелье',
  'Что для меня семья и какую я играю роль в ней?',
  'Угнетающие навязчивые мысли, как от них защититься',
  'Осознанный контакт с богом, мой опыт',
  'Недопонимания со спонсором (что делать?)',
  'Проживание негативных чувств',
  'Готов ли я помочь другому?',
  'Осмысление себя и своей жизни?! Кто я',
  'Что я полюбил в программе',
  'Что мешает мне выздоравливать?',
  'Мои достоинства',
  'Применение Шагов в действиях',
  'Что вы испытывали после срыва?',
  '9-й шаг',
  'Насколько я завишу от других людей?',
  'Я больше отдаю или беру?',
  'Как я понимаю Бога, и что Бог делает для меня?',
  'Какие обязательства я беру на себя и соблюдаю ли я их перед самим собой?',
  'Как изменилась забота о семье за период выздоровления?',
  'Инструменты программы, которые мне действительно помогают (какие именно?)',
  'Страх будущего (страх неизвестности)',
  'Приоритеты в финансах',
  'Когда мне говорят, НЕЛЬЗЯ, что я чувствую? Что хочу сделать?',
  'Мой Главный дефект характера? Как с ним живу? Нужен он мне  или мешает?',
  'Были ли у меня сегодня какие-то экстремальные ощущения? Что это были за ощущения и из-за чего?',
  'Отличие желания от готовности',
  'Когда в последний раз я звонил Спонсору? И почему я не звоню?',
  'Откладывание важных дел на потом (прокрастинация)',
  'Эмоциональное равновесие',
  'Есть ли у меня пятое колесо? (мероприятия АН)',
  'Сопереживание за близких и родных, как проживать чувства и не поддаться страху смерти за близкого?',
  'Почему мне хочется снятся со служений? Отдаляюсь от АН (опыт)',
  'Эмоциональное выгорание',
  'Трудности первого года чистоты',
  'Выстраивание здравых границ с родственниками',
  'Что для меня духовность?',
  'Трезвый я или чистый?',
  '2-ой шаг. Что может быть сильнее меня?',
  'После срыва, как удержаться от желания повторить?',
  'Как я понимаю что такое душевный покой?',
  'Могу ли я себе позволить жить так как «раньше>>?',
  'Тяжело ли мне быть честным?',
  'Быть хорошим для всех, кроме себя?',
  'Принятие чужого мнения (отличающегося от моего)',
  'Если не прощаю, то для чего мне это?',
  'Оценивание других и страх оценки',
  'Когда я последний раз звонил своему спонсору?',
  'Сострадание по отношению ко всем.',
  'Как я проявляю любовь к себе',
  'Как возвращаюсь в реальность от иллюзий?',
  'Какую я приобрел свободу?',
  'Принципы 6-го и 7-го шагов в повседневной жизни',
  'Как не забыть что ты болен, если у тебя всё хорошо И хочется забыть прошлое?',
  'Правильно называть недостатки',
  '7-й шаг',
  'Отошение к себе в чистоте',
  'Служение для чего мне это?',
  'Дисциплина в выздоровлении.Примеры соблюдения',
  'Какие положительные качества мне стоит развивать?',
  'Есть ли у меня проблемы с принятием того факта, что существует Сила или Силы, более могущественные, чем я?',
  // 500
]

let messageIds = new Map()

// Экспортируем функцию как асинхронную
module.exports = async (request, response) => {
  try {
    // Создаем новый экземпляр бота с токеном от BotFather
    const bot = new TelegramBot('6977955174:AAHbQ6CpdIvPnVsJBh14vPFw1iWm6UT38XQ')

    // Получаем тело POST-запроса от Telegram
    const { body } = request

    if (body.message) {
      const {
        message_id,
        chat: { id },
        text,
      } = body.message

      // Удаление предыдущих сообщений
      if (messageIds.has(id)) {
        messageIds.get(id).forEach(async (messageId) => {
          if (messageId !== message_id) {
            // Добавить эту проверку
            try {
              await bot.deleteMessage(id, messageId)
            } catch (error) {
              console.error('Error deleting message', error.toString())
            }
          }
        })
      }

      if (text === '/q') {
        const randomIndex = Math.floor(Math.random() * questions.length)
        const question = questions[randomIndex]
        const message = `🎈 Ваша тема: \n\n*"${question}"*`

        await bot.sendMessage(id, message, { parse_mode: 'Markdown' })

        // Попытка удалить сообщение с командой /q
        // try {
        //   await bot.deleteMessage(id, message_id)
        // } catch (error) {
        //   console.error('Error deleting message', error.toString())
        // }
      }

      if (text === '/stop11') {
        // Сообщение, которое вы хотите отправить
        const message = `🛑 *11 ШАГ - ОСТАНОВИСЬ!*

  ✅ *ТВОИ ДЕЙСТВИЯ:*

  1️⃣ *Внутреннее действие:* 
  Пауза - внимание внутрь себя (направь свой внутренний взор и концентрируйся в свой сердечный центр, прямо посередине груди… не спеши… нащупай «точку опоры», то есть, когда ты всем вниманием внутри себя)

  2️⃣ Вопрос - обращение к ВС: 
  «А как бы Ты хотел, чтобы я сейчас поступил(а)?»
  (слушай свою совесть) 


  3️⃣ *Внешнее действие:* 
  Поступить по новому в своей жизни, основываясь на Духовных принципах.

  4️⃣ Если есть сомнения, обратись за помощью и прими помощь** (спонсор, доверенный, выйти на группу, запросить обратную связь)

  📌 *В помощь тебе.*

  ❇️ *Внутренние действия:* 
  В течение дня, особенно, если не знаешь, как поступить, обращайся к ВС внутрь себя с просьбой подсказать правильную мысль и решение.

  ♻️ *Внешние действия:* 
  В течение дня стараться применять новые принципы жизни во всех своих делах, просить и принимать помощь.

  ⚠️ Мы постоянно напоминаем себе, что мы больше не мним себя центром вселенной, смиренно повторяя каждый день: “Да исполню я волю Твою”. От этого уменьшается опасность возникновения волнений, страха, злобы, беспокойства, жалости к себе и совершения необдуманных поступков. Мы становимся гораздо более умелыми. Мы не так легко утомляемся, потому что не сжигаем бессмысленно энергию, как это было раньше, когда мы строили жизнь так, чтобы она устраивала только нас.

  🔆 Ведь Бог (ВС) всегда был рядом, но не мог войти в нашу жизнь потому, что мы не позволяли ему. Теперь мы совершаем ежедневные простые действия, чтобы позволить.

  🛜 «И Абонент снова находится в зоне действия сети!» АМИНЬ!

  🤖 /stop11 - Напиши команду бота в чат и обратись к ВС   

  С любовью, 
  Группа Душа ❤️`

        await bot.sendMessage(id, message, { parse_mode: 'Markdown' })

        try {
          await bot.deleteMessage(id, message_id)
        } catch (error) {
          console.error('Error deleting message', error.toString())
        }
      }

      if (text === '/stop10') {
        // Сообщение, которое вы хотите отправить
        const message = `🛑 **10 ШАГ - ОСТАНОВИСЬ!**

  ✅ [СДЕЛАЙ РАЗБОР](https://t.me/+3uwmhEs5IR42YzFi)

  В помощь тебе чат по разбору с примерами 10 шага Группы Душа. 🫶🏽

  Ты можешь сделать свой разбор в этом чате и/или поделиться своим опытом с другими. 
  Твой опыт очень важен 🫶🏽

  📌 *10 ШАГ предлагает продолжать проверку нашей жизни с нравственных позиций, делать личную инвентаризацию и продолжать исправлять те новые ошибки, которые мы делаем на своем пути.* Мы стали жить по-новому, когда разобрались с прегрешениями нашего прошлого. Мы вошли в мир Духа. Наша следующая задача - расти в понимании и повышать действенность наших усилий. Это не приходит за один день. 
  Нужно продолжать это делать всю оставшуюся жизнь.

  Любовь к другим и терпимость – это наше кредо.
  
  🤖 /stop10 - Напиши команду бота в чат и сделай разбор

  С любовью, 
  Группа Душа ❤️`

        await bot.sendMessage(id, message, {
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        })
        try {
          await bot.deleteMessage(id, message_id)
        } catch (error) {
          console.error('Error deleting message', error.toString())
        }
      }
    }
  } catch (error) {
    console.error('Error sending message')
    console.log(error.toString())
  }

  response.send('OK')
}
