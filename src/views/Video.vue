<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1>
          Так бо Бог полюбив світ, що дав Сина Свого Одноро́дженого, щоб кожен, хто вірує в Нього, не згинув, але мав життя вічне.
        </h1>
      </div>
    </div>
  </div>
  <div id="player" class="youtube-container-main">
    <iframe
      src="https://www.youtube.com/embed/6wJAdfTJZUQ"
      allowfullscreen
      allowtransparency
      allow="autoplay"
    ></iframe>
  </div>
  <div class="youtube-container">
    <div >
      <template
        v-for="item in video"
        :key="item.datayoutube"
      >

        <div
          class="youtube-list"
          :class="item.class"
          :data-youtube="item.datayoutube"
        >
          <img
            style="width: 100%"
            :src="item.img"
          />
          <span>
          {{item.title}}
        </span>
        </div>

      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Video',
  data: () => ({
    video: [
      {
        class: 'change-youtube active',
        datayoutube: '30BQjlXXamY',
        img: 'https://img.youtube.com/vi/30BQjlXXamY/mqdefault.jpg',
        title: 'RE1 - Classic Costumes'
      },
      {
        class: 'change-youtube',
        datayoutube: 'CWl0hOeJvzA',
        img: 'https://img.youtube.com/vi/CWl0hOeJvzA/mqdefault.jpg',
        title: 'RE2 - Classic Costumes'
      },
      {
        class: 'change-youtube',
        datayoutube: 'bjO6JFagZhc',
        img: 'https://img.youtube.com/vi/bjO6JFagZhc/mqdefault.jpg',
        title: 'RE3 - Classic Costumes'
      }
    ]
  })
}
</script>

<style>
  .youtube-container-main {
    margin-top: 20px;
  }
  .youtube-container {
    padding-top: 30px;
    text-align: center;
    margin: 10px;
  }
  .youtube-list {
    width: 90%;
    max-width: 960px;
    margin-left: 10px;
    margin-right: 10px;
    padding-right: 20px;
  }
  .change-youtube {
    width: 30.333%;
    float: left;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2);
    margin-top: 30px;
    margin-bottom: 50px;
    border: 6px solid #BFE2FF;
    transition: box-shadow 0.3s linear;
    cursor: pointer;
    background: #BFE2FF;
    text-align: center;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }
  .change-youtube:nth-child(2) {
    margin-left: 16px;
    margin-right: 16px;
  }
  .change-youtube span {
    display: block;
    padding: 6px 12px 0 12px;
    font-size: 18px;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .change-youtube:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
  }
  .change-youtube.active {
    border: 6px solid #00b3ff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
    color: #FFF;
    background: #00b3ff;
  }

  @media (max-width: 570px) {
    .youtube-container .youtube-list {
      width: 100%;
      float: none;
    }
  }
</style>
