<template>
  <div class="app_inner">
    <header class="header">
      <div class="header__logo">
        <p>Editor</p>
      </div>
      <div class="header__btn" @click="settingsDisplay = true"></div>
    </header>
    <transition name="settings_animate">
      <Settings class="settings_wrap" v-if="settingsDisplay" @closeSettings="settingsDisplay = false"></Settings>
    </transition>
    <Texts class="content_wrap"></Texts>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Settings as SettingsType } from '@/store/editor/types';
  import Settings from '@/components/Settings.vue';
  import Texts from '@/components/Texts.vue';

  export default Vue.extend({
    data() {
      return {
        settingsDisplay: false,
      };
    },
    components: {
      Settings,
      Texts,
    },
    created(): void {
      this.$store.dispatch('editor/getSettings');
    },
    computed: {
      settings(): SettingsType {
        return this.$store.getters['editor/settings'];
      },
    },
  });
</script>

<style>
  .app_inner {
    padding-top: 60px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 60px;

    padding: 0 20px;

    background-color: #FFA000;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .header__logo {
    text-shadow: 4px 4px 0 rgba(0,0,0,0.2);
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }

  .header__logo:hover {
    cursor: pointer;
  }

  .header__logo p {
    margin: 0;
  }

  .header__btn {
    width: 37px;
    height: 42px;

    background-image: url(../assets/hamburger.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }

  .header__btn:hover {
    cursor: pointer;
  }

  .settings_animate-enter-active, .settings_animate-leave-active {
    transition: all .3s;
  }

  .settings_animate-enter, .settings_animate-leave-to {
    transform: translateX(100%);
  }

  .settings_wrap {

  }

</style>
