<template>
	<div class="content">
		<div class="content_inner">
			<div v-for="text in texts" class="text_wrap" v-if="texts.length">
				<p class="text" v-if="!text.edit"
					 :style="{ color: returnRgb(settings.defaultColor), fontStyle: settings.defaultStyle }"
				>
					{{ text.text }}
				</p>
			</div>
			<textarea id="newText" class="text_new" v-if="addNewText" v-model="newText"></textarea>
			<label for="newText" class="text__label">Write new text</label>
			<div class="text_add">
				<div v-if="!addNewText" @click="addNewText = true">
					<span class="text_add-btn">+</span>
					<p>add text</p>
				</div>
				<div class="text_add-close-btn" @click="addNewText = false" v-if="addNewText"
						 role="button"
						 tabindex="0"
				>
					close
				</div>
				<div class="text_add-save-btn" @click="addText" v-if="addNewText"
						 role="button"
						 tabindex="0"
				>
					save
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
				addNewText: false,
				newText: '',
			}
		},
		methods: {
			addText() {
				this.$store.dispatch('editor/setText', this.newText)
					.then(() => this.addNewText = false);
			},
			returnRgb(color) {
				return `rgb(${color[0]},${color[1]},${color[2]})`;
			},
		},
		computed: {
			texts() {
				return this.$store.getters['editor/texts'];
			},
			settings() {
				return this.$store.getters['editor/settings'];
			},
		},
  })
</script>

<style scoped>
	.content {
		display: flex;
		justify-content: center;

		padding-top: 50px;
	}

	.content_inner {
		width: 70%;
	}

	.text {
		padding-bottom: 20px;
		margin-bottom: 30px;
		border-bottom: 1px solid #000;
	}

	.text:last-of-type {
		border-bottom: none;
	}

	.text_add {
		display: flex;

		margin-top: 20px;
	}

	.text_add > div {
		display: flex;
		align-items: center;
	}

	.text_add > div:hover {
		cursor: pointer;
	}

	.text_add-btn {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 30px;
		height: 30px;

		margin-right: 10px;

		border: 1px solid #76FF03;

		color: #76FF03;
		font-size: 25px;
		font-weight: bold;
	}

	.text_add-close-btn {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100px;
		height: 30px;

		margin-right: 10px;

		border: 1px solid #E53935;
		color: #E53935;
		font-weight: bold;
	}

	.text_add-save-btn {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 100px;
		height: 30px;

		margin-right: 10px;

		border: 1px solid #76FF03;
		color: #76FF03;
		font-weight: bold;
	}

	.text__label {
		display: none;
	}

	.text_new {
		width: 100%;
		height: 100px;
		resize: none;
	}

</style>
