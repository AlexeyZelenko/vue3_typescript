<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-header">
          <slot name="header" ></slot>
          <div
            type="button"
            class="modal-close"
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
        </div>
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ModalVideo'
}
</script>

<style>
  .modal-header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
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
    vertical-align: middle;
  }

  .modal-container {
    width: 80%;
    margin: 0px auto;
    background-image: url('../assets/img/loading.svg');
    background-repeat: no-repeat, repeat;
    background-position: center center;
    border-radius: 2px;
  }

  .modal-header h4 {
    margin-left: 20px;
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 30px;
    margin-top: 0;
    color: #eff4f1;
  }

  .modal-close {
    color: #ffffff;
    width: 40px;
    height: 40px;
  }

  .modal-default-button {
    float: right;
  }

  @media (max-width: 767px) {
    .modal-container {
      height: 50%
    }
    .modal-header h4 {
      font-size: 18px;
    }
  }
</style>
