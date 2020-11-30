<template>
  <h2>Служіння</h2>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header"
        >
          <h5
            class="card-title"
          >
            Загальноцерковне служіння
          </h5>
        </div>
            <img
              :src="require(`@/assets/ministries/song.jpg`)"
              class="card-img-top d-block w-100"
              alt="..."
            >
<!--        <div class="card-body">-->
<!--                          <p class="card-text">Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,-->
<!--                            тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">Неділя 10:00 та Четвер 18:00</small>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header"
        >
          <h5
            class="card-title"
          >
            Нічна молитва
          </h5>
        </div>
        <!--              <img-->
        <!--                :src="require(`@/assets/img/3.jpg`)"-->
        <!--                class="card-img-top"-->
        <!--                alt="Нічна молитва"-->
        <!--              >-->
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="require(`@/assets/ministries/3.jpg`)" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Нічна молитва</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img :src="require(`@/assets/ministries/nightprayer2.jpg`)" class="d-block w-100" alt="...">
            </div>
          </div>
        </div>
<!--        <div class="card-body">-->
<!--                          <p>{{`Молитва - джерело сили та двигун Церкви! Молитва - головний інструмент та стратегічне знаряддя церкви для впливу на своє місто, країну, континент і весь світ. Все починається з молитви. Молитва - це головне покликання Церкви!\n'-->
<!--                            «Отже, перш над усе я благаю чинити молитви, благання, прохання, подяки за всіх людей» (1 Тимофія 2:1)-->
<!--                            На служіннях загальноцерковних вечірньої та нічної молитв в атмосфері Божої слави та поклоніння ви переживете особливі зустрічі з Богом і приймете свіжий вогонь Святого Духа! Ви зможете бути істинними заступниками за церкву, країну, за своїх рідних та близьких, своє призначення та молитися за інші питання.`}}</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">П'ятниця</small>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header">
          <h5 class="card-title">Молитва на Соборній площі</h5>
        </div>
        <img
          :src="require(`@/assets/ministries/1.jpg`)"
          class="card-img-top"
          alt="Молитва на Соборній площі"
        >
<!--        <div class="card-body">-->
<!--                          <p>{{`Молитва - джерело сили та двигун Церкви! Молитва - головний інструмент та стратегічне знаряддя церкви для впливу на своє місто, країну, континент і весь світ. Все починається з молитви. Молитва - це головне покликання Церкви!'-->
<!--                            «Отже, перш над усе я благаю чинити молитви, благання, прохання, подяки за всіх людей» (1 Тимофія 2:1)`}}</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">Неділя 16:00</small>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header">
          <h5 class="card-title">Домашні групи</h5>
        </div>
        <img
          :src="require(`@/assets/ministries/homegroup.jpg`)"
          class="card-img-top"
          alt="..."
        >
<!--        <div class="card-body">-->
<!--                          <p class="card-text">Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,-->
<!--                            тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">Вівторок</small>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header">
          <h5 class="card-title">Загальноцерковна молитва</h5>
        </div>
        <img
          :src="require(`@/assets/ministries/nightprayer2.jpg`)"
          class="card-img-top"
          alt="..."
        >
<!--        <div class="card-body">-->
<!--                          <p class="card-text">Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,-->
<!--                            тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">Понеділок 19:00</small>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100 text-center">
        <div
          style="background-color: grey"
          class="card-header">
          <h5 class="card-title">Загальноцерковне служіння</h5>
        </div>
        <img
          :src="require(`@/assets/ministries/2.jpg`)"
          class="card-img-top"
          alt="..."
        >
<!--        <div class="card-body">-->
<!--                          <p class="card-text">Богослужіння поділяються на два основних види: загальні і приватні. Загальні богослужіння відбуваються регулярно, відповідно до вимог церковного уставу,-->
<!--                            тоді як приватні призначені для задоволення поточних потреб віруючих і відбуваються будь-коли.</p>-->
<!--                          <a href="#" class="btn btn-primary">Дізнатися більше</a>-->
<!--        </div>-->
        <div class="card-footer">
          <small class="text-muted">Неділя 10:00 та Четвер 18:00</small>
        </div>
      </div>
    </div>
  </div>
</template>
