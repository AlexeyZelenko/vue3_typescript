<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
<!--        <div-->
<!--          style="margin-top: 50px"-->
<!--          class="modal-header"-->
<!--        >-->
<!--        </div>-->
        <div class="modal-container">
          <div
            type="button"
            class="modal-close"
            style="margin: 30px"
          >
            <svg
              style="cursor: pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </div>
          <div
            class="modal-body"
          >
            <slot name="body"></slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalImages'
}
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(8, 8, 8, 0.8);
    display: table;
  }

  .modal-wrapper {
    height: 100%;
  }

  .modal-container {
    height: 600px;
    width: 33%;
    margin: 0px auto;
  }

  .modal-close {
    color: #ffffff;
    width: 40px;
    height: 40px;
  }

  @media (max-width: 767px) {
    .modal-container {
      height: 80%;
      width: 90%;
    }
  }
</style>
