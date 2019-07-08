<template>
  <div id="app" v-on="errorsDisplay ? { click: handleClick } : {}" ref="app">
    <transition name="errors_animate">
      <div class="errors_wrap" v-if="errorsDisplay" ref="errorsWrap">
        <ul class="errors__list">
          <li class="error" v-for="error in errors">
            {{ error }}
          </li>
        </ul>
      </div>
    </transition>
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    methods: {
      handleClick(e: MouseEvent) {
        let element = e.target as HTMLElement;
        const app = this.$refs.app;
        const errorsWrap = this.$refs.errorsWrap;

        let clickInErrorsWrap = false;

        while (element !== app && element.parentElement) {
          if (element !== errorsWrap) {
            element = element.parentElement;
          } else {
            clickInErrorsWrap = true;
            break;
          }
        }

        if (!clickInErrorsWrap) {
          this.$store.dispatch('clearErrors');
        }
      },
    },
    computed: {
      errors(): string[] {
        return this.$store.getters.errors;
      },
      errorsDisplay(): boolean {
        return !!this.errors.length;
      },
    },
  });
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html, body, #app {
    height: 100%;
  }
  body {
    margin: 0;
    overflow-x: hidden;
  }
  #app {
    position: relative;
    font-family: Ubuntu, Helvetica, Arial, sans-serif;
  }

  .errors_animate-enter-active, .errors_animate-leave-active {
    transition: all .4s ease-out;
  }

  .errors_animate-enter, .errors_animate-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  .errors_wrap {
    width: 300px;

    position: absolute;
    top: 100px;
    left: calc(50% - 150px);

    border-radius: 10px;
    background-color: #D32F2F;
  }

  .errors__list {
    margin: 0;
    padding: 0;
  }

  .error {
    display: flex;
    align-items: center;

    height: 50px;

    padding-left: 20px;

    color: #fff;
  }

  .error:not(:last-of-type) {
    border-bottom: 1px solid #fff;
  }
</style>
