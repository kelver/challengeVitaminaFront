<template>
    <div class="min-h-screen bg-purple-400 flex justify-center items-center">
        <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
        </div>
        <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
        </div>
        <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            <div>
                <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Acesse sua conta</h1>
            </div>
            <div class="space-y-4">
                <input type="text" placeholder="E-mail" v-model="email" name="email"
                       class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <input type="password" placeholder="Senha" v-model="password" name="password"
                       class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
            </div>
            <div class="text-center mt-6">
                <button @click="access" class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Acesse</button>
                <p class="mt-4 text-sm">Não possui uma conta?
                    <router-link to="/register" class="underline cursor-pointer">Cadastre-se</router-link>
                </p>
            </div>
        </div>
        <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
        <div
            class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        async access () {
            let user = {
                email: this.email,
                password: this.password,
            }

            await this.$http.post('/auth/login', user)
                .then(response => {
                    localStorage.setItem('token', response.data.data.token)
                    setTimeout(() => {
                        this.$router.push('/home')
                    }, 1000)
                })
                .catch(error => {
                    console.log(error.response)
                })
        }
    }
}
</script>
