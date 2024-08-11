<template>
	<Carousel :pagination-enabled="true" :navigation-enabled="true" class="w-11/12 mx-auto">
	    <Slide v-for="slide in 10" :key="slide" class="rounded-lg h-[420px] relative mt-1">
		    <img src="@/assets/images/slide1.png" class="w-full h-full rounded-lg object-cover">
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
    /* .carousel__item {
        min-height: 200px;
        width: 100%;
        font-size: 20px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    } */
    
    .carousel__prev,
    .carousel__next {
        /* box-sizing: content-box; */
        width: 35px;
        height: 35px;
        position: absolute;
        top: 50%;
        background-color: white;
        border-radius: 100%;
        margin: 0 20px;
    }

    .carousel__icon {
        width: 20px;
        height: 20px;
    }

    .carousel__pagination-button::after {
        display: none;
    }

    .carousel__pagination {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        position: absolute;
        bottom: 5%; /* Adjust this value as needed */
        left: 2%;
        /* transform: translateX(-50%); */
        z-index: 10; /* Ensure pagination is on top */
    }

    button.carousel__pagination-button {
        width: 10px;
        height: 10px;
        background-color: #C2C2C2;
        border-radius: 50%;
        margin: 0 4px;
        cursor: pointer;
    }
    button.carousel__pagination-button--active {
        background-color: rgb(255, 255, 255);
    }
  
    
  </style>
  