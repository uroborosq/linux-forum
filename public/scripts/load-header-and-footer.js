function loadHeaderAndFooter() {


    document.getElementsByTagName("header")[0].innerHTML =
        `<div class="top">
    <div class="top__logo">
        <img src="public/images/pngegg_64.png" alt="logo">
        </div>
    <h1 class="top__name"> 
        UroborosQ Wiki
    </h1>
    <nav class="top__navbar">
        <a id="top__navbar_main" href="index.html">Главная страница</a>
        <a id="top__navbar_wiki" href="wiki.html">Вики</a>
        <a id="top__navbar_forum" href="forum.html">Форум</a>
        <a id="top__navbar_users" href="userlist.html">Пользователи</a>
        <a id="top__navbar_lc" href="lc.html">Личный кабинет</a>

    </nav>
</div>
    <div class="usefulquote">
        <br>
            <q>The Linux philosophy is 'Laugh in the face of danger'. Oops. Wrong One. 'Do it yourself'. Yes, that's it.</q>
            <sub>Linus Torvalds</sub>
    </div>`;

    document.getElementsByTagName("footer")[0].innerHTML =
        `<ul class="usefullinks">
        <li><i>Политика конфиденциальности</i></li>
        <li><i>О UroborosQ Wiki</i></li>
        <li><i>Дисклеймеры</i></li>
    </ul>
    <div id="interestingstats">

    </div>`
}