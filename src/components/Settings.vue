<template>
	<div class="settings">
		<div class="settings__header">
			<div class="settings__close" @click="closeSettings" @keyup.enter="closeSettings" tabindex="0" role="button"></div>
			<div class="logout" tabindex="0" role="button" @click="logout"></div>
		</div>
		<div class="settings_inner">
			<div class="setting_wrap">
				<h3 class="setting__label">Color</h3>
				<div class="setting colors">
					<div class="color_wrap" v-for="color in colorsArray">
						<div class="color" :style="{ backgroundColor: returnRgb(color) }"
								 data-checked="false"
								 aria-labelledby="accessible-radio"
								 role="checkbox"
								 aria-checked="false"
								 tabindex="0"
								 @click="updateSettings(color, null)"
								 @keyup.enter="updateSettings(color, null)"
								 :class="{ 'color_checked': JSON.stringify(color) === JSON.stringify(settings.defaultColor) }"
						></div>
					</div>
				</div>
			</div>
			<div class="setting_wrap">
				<h3 class="setting__label">Style</h3>
				<div class="setting styles">
					<div class="style" v-for="style in stylesArray" :style="{ 'fontStyle': style }"
							 data-checked="false"
							 aria-labelledby="accessible-radio"
							 role="checkbox"
							 aria-checked="false"
							 tabindex="0"
							 @click="updateSettings(null, style)"
							 @keyup.enter="updateSettings(null, style)"
							 :class="{ 'style_checked': JSON.stringify(style) === JSON.stringify(settings.defaultStyle) }"
					>{{ style }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        colorsArray: [],
				stylesArray: ['normal', 'bold', 'italic'],
      };
    },
    methods: {
      closeSettings() {
        this.$emit('closeSettings');
      },
			returnRgb(color) {
        return `rgb(${color[0]},${color[1]},${color[2]})`;
			},
			updateSettings(defaultColor, defaultStyle) {
      	let output = {
					defaultColor: defaultColor ? defaultColor : this.settings.defaultColor,
					defaultStyle: defaultStyle ? defaultStyle : this.settings.defaultStyle,
				};
        this.$store.dispatch('editor/setSettings', output);
			},
			logout() {
        this.$store.dispatch('profile/logout');
        this.$router.push('/login');
			},
    },
    created() {
      let accumulator = [0, 0, 0];

      const end = 256;
      const step = 64;

      for (let i = 0; i <= end; i = i + step) {
        accumulator[0] = i;
        for (let j = 0; j <= end; j = j + step) {
          accumulator[1] = j;
          for (let k = 0; k <= end; k = k + step) {
            accumulator[2] = k;
            this.colorsArray.push([...accumulator]);
            if (k === end) {
              accumulator[2] = 0;
            }
          }
          if (j === end) {
            accumulator[1] = 0;
          }
        }
        if (i === end) {
          accumulator[0] = 0;
        }
      }
    },
		computed: {
      settings() {
       	return this.$store.getters['editor/settings'];
      },
		},
  });
</script>

<style scoped>
	.settings {
		width: 300px;
		height: 100%;

		position: fixed;
		right: 0;
		top: 0;

		background-color: #424242;
	}

	.settings__header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		height: 60px;

		padding: 0 20px;

		border-bottom: 1px solid #fff;
	}

	.settings__close {
		width: 38px;
		height: 42px;

		background-image: url(../assets/arrow-right.svg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.settings__close:hover {
		cursor: pointer;
	}

	.logout {
		width: 38px;
		height: 42px;

		background-image: url(../assets/exit.svg);
		background-repeat: no-repeat;
		background-size: cover;
	}

	.logout:hover {
		cursor: pointer;
	}

	.settings_inner {
		padding: 20px;
	}

	.setting__label {
		font-size: 18px;
		color: #fff;
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
	}

	.color_wrap {
		width: 10%;
		height: 20px;

		margin-bottom: 5px;

		position: relative;
	}

	.color {
		width: 100%;
		height: 100%;

		position: absolute;
		top: 0;
		left: 0;

		border-radius: 2px;
		transform-origin: center;

		transition: transform .3s ease-out, box-shadow .3s ease-out;
	}

	.color_wrap:hover .color, .color:focus, .color_checked {
		cursor: pointer;
		transform: scale(1.3);
		box-shadow: 0 3px 6px rgba(256,256,256,0.16), 0 3px 6px rgba(256,256,256,0.23);
		z-index: 1;
	}

	.color_wrap:hover .color, .color_checked {
		outline: none;
	}

	.styles {
		display: flex;

		border-radius: 5px;
		background-color: #FFA000;

		overflow: hidden;
	}

	.style {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 33.333%;
		height: 30px;

		color: #fff;
		border-right: 1px solid #424242;

		transition: background-color .3s;
	}

	.style:last-of-type {
		border-right: none;
	}

	.style:hover, .style:focus, .style_checked {
		cursor: pointer;
		/*background-color: #FFCA28;*/
	}

	.style:focus {
		background-color: #FFB300;
	}

	.style_wrap:hover .style, .style_checked {
		outline: none;
		background-color: #FFE082;
	}

</style>
