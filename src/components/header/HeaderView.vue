<template>
	<Carousel>
	  <Slide v-for="slide in 10" :key="slide">
		<img src="@/assets/images/slide1.png"/>
	  </Slide>
  
	  <template #addons>
		<Navigation />
		<Pagination />
	  </template>
	</Carousel>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
  
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
	name: 'Basic',
	components: {
	  Carousel,
	  Slide,
	  Pagination,
	  Navigation,
	},
  })
  </script>
  
  <style>
  .carousel__item {
	min-height: 200px;
	width: 100%;
	font-size: 20px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  .carousel__slide {
	padding: 10px;
  }
  
  .carousel__prev,
  .carousel__next {
	box-sizing: content-box;
  }
  </style>
  