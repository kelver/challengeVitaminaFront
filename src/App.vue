<template>
    <router-view />
</template>

<script>
export default {
    methods: {
        async validate(){
            if(localStorage.getItem('token') === null){
                this.$router.push('/');
            }

            if(localStorage.getItem('token') !== null){
                await this.$http.get('me').then(response => {
                    localStorage.setItem('user.name', response.data.data.name)
                    localStorage.setItem('user.email', response.data.data.email)
                    this.$router.push('/home')
                }).catch(error => {
                    if(error.response.status === 401){
                        this.$router.push('/');
                    }
                })
            }
        }
    },
    beforeMount() {
        let list = ['/', '/register'];
        if(!list.includes(localStorage.getItem('route'))){
            this.validate();
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
