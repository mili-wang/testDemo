<template>
   <router-view />
   <nav-bar />
</template>
 
<script>
import navBar from '@/views/NavBar'
export default {
  name: 'App',
	components: {
	  navBar
	}
}
</script>