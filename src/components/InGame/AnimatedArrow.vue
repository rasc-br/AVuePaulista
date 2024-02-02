<template>
  <div class="indicator">
    <span />
    <span />
    <span />
  </div>
</template>

<style scoped>
.indicator {
  display: flex;
  justify-self: center;
  align-self: center;
  position: relative;
  width: 10px;
  height: 10px;

  transform: rotate(-45deg);
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 3px solid #fff;
    border-right: 3px solid #fff;
    animation: animate 1s linear infinite;
    &:nth-child(1) {
      top: -10px;
      left: -10px;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      top: -5px;
      left: -5px;
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      top: 0;
      left: 0;
      animation-delay: 0.4s;
    }
  }
}
@keyframes animate {
  0% {
    border-color: #fd9999;
    transform: translate(0, 0);
  }
  20% {
    border-color: #fd9999;
    transform: translate(5px, 5px);
  }
  20.1%,
  100% {
    border-color: #ff4a4a;
  }
}
</style>
