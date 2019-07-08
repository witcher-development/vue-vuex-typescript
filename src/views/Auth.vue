<template>
  <div class="auth">

    <div class="auth__left"></div>

    <div class="auth__right">
      <form class="auth__form" @submit.prevent="login">
        <div class="auth__input_wrap">
          <input id="login" type="text" class="auth__input" required v-model="username">
          <label for="login" class="auth__label">Login</label>
        </div>
        <div class="auth__input_wrap">
          <input id="password" type="text" class="auth__input" required v-model="password">
          <label for="password" class="auth__label">Password</label>
        </div>
        <div class="auth__input_wrap">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions } from 'vuex';

  export default Vue.extend({
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        const { username, password } = this;
        this.$store.dispatch('profile/login', { username, password })
          .then(() => {
            this.$router.push('/home');
          })
          .catch(err => {
            // console.log(err);
          });
      },
    },
  });
</script>

<style>

  .auth {
    display: flex;
    height: 100%;
  }

  .auth__left, .auth__right {
    width: 50%;
  }

  .auth__left {
    background-image: url(../assets/auth_bgi.jpg);
    background-size: cover;
  }

  .auth__right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth__form {
    width: 50%;

    padding: 20px;

    border: 1px solid #000;
    border-radius: 5px;
  }

  .auth__input_wrap {
    margin-bottom: 20px;
    padding-top: 30px;
    position: relative;
  }

  .auth__input {
    width: 100%;
  }

  .auth__label {
    position: absolute;
    top: 0;
    left: 0;
  }

</style>
