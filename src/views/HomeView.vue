<template>
    <div class="flex flex-col min-h-screen">
        <Header />

        <main class="">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-6 sm:px-0">
                    <div class="rounded-lg h-auto">
                        <p class="mb-2 text-left text-lg">Filtros:</p>
                        <div class="flex space-x-2 p-3 border-b-2 border-gray-800">
                            <div class="w-2/6 text-left">
                                <label for="status">Selecione um cliente:</label>
                                <select @change="addFilter($event.target.name, $event.target.value)"
                                        class="w-full border border-2 border-gray-800 p-2"
                                        name="client"
                                        id="client">
                                    <option value="">Todos</option>
                                    <option v-for="(client, key) in clients" :value="client.identify" v-bind:key="key">
                                        {{ client.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="w-2/6 text-left">
                                <label for="status">Selecione um status:</label>
                                <select @change="addFilter($event.target.name, $event.target.value)" class="w-full border border-2 border-gray-800 p-2" name="status" id="status">
                                    <option value="">Todos</option>
                                    <option value="open">Open</option>
                                    <option value="lost">Lost</option>
                                    <option value="accept">Accept</option>
                                </select>
                            </div>
                            <div class="w-2/6 text-left">
                                <label for="status">Selecione uma data:</label>
                                <date-picker @add-filter="addFilter($event.name, $event.value)" v-model="date" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div v-for="(oportunity, key) in this.oportunities" :key="key">
                                <CardOportunity @load-oportunities="loadOportunities"
                                    @show-alert="showAlert" :data="oportunity" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </main>

        <div v-bind:class="[hiddenAlert ? 'hidden' : '']"
             class="flex w-96 shadow-lg rounded-lg absolute right-0 bottom-[5%]">
            <div class="py-4 px-6 rounded-l-lg flex items-center"
                 v-bind:class="[typeAlert=='success' ? 'bg-green-500' : 'bg-red-500']">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white" viewBox="0 0 16 16" width="20" height="20"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"></path></svg>
            </div>
            <div class="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                <div>{{ this.messageAlert }}</div>
            </div>
        </div>

        <div class="w-full">
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4
                border border-blue-500 hover:border-transparent rounded w-[90%] mb-4"
                @click="paginate"
            >
                Mostrar Mais
            </button>
        </div>

        <Footer />
    </div>

</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CardOportunity from "@/components/CardOportunity";
import DatePicker from "@/components/DatePicker";

export default {
    name: 'HomeView',
    components: {Header, Footer,CardOportunity,DatePicker},
    data () {
        return {
            oportunities: [],
            clients: [],
            hiddenAlert: true,
            messageAlert: '',
            typeAlert: 'success',
            page: 2,
            isPaginate: false,
            filter: '',
        }
    },
    methods: {
        async loadMe(){
            await this.$http.get('me').then(data => {
                localStorage.setItem('user.name', data.data.data.name)
                localStorage.setItem('user.email', data.data.data.email)
            }).catch(error => {
                if(error.response.status > 400){
                    this.$router.push('/');
                }
            })
        },
        addFilter(name, value){
            let filters = ['client', 'date', 'status', 'page'];

            // eslint-disable-next-line no-prototype-builtins
            if((this.filter.hasOwnProperty(name) && this.filter[name] == value)) {
                this.filter = '';
            }

            // eslint-disable-next-line no-prototype-builtins
            if(name !== 'page' && !this.filter.hasOwnProperty(name)){
                this.oportunities = [];
                this.page = 2;
                // eslint-disable-next-line no-prototype-builtins
                this.filter.hasOwnProperty('page') ? delete this.filter['page'] : '';
            }
            if(filters.includes(name)){
                this.filter = {
                    ...this.filter,
                    [name]: value
                }
            }

            // eslint-disable-next-line no-prototype-builtins
            this.isPaginate = this.filter.hasOwnProperty('page');

            this.loadOportunities(this.filter);
        },
        async loadOportunities(search = null){
            let params = [];
            if(search){
                for (var key in search) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (search.hasOwnProperty(key) && search[key] !== '') {
                        params.push(key + '=' + encodeURIComponent(search[key]));
                    }
                }

                params = params.join('&');
            }
            await this.$http.get('oportunities?' + params).then(data => {
                this.oportunities = this.isPaginate ? this.oportunities.concat(data.data.data) : data.data.data
            }).catch(error => {
                if(error.response.status > 400){
                    this.$router.push('/');
                }
            })
        },
        showAlert(data){
            this.hiddenAlert = false
            this.messageAlert = data.msg
            this.typeAlert = data.type
            setTimeout(() => {
                this.hiddenAlert = true
            }, 2000);
        },
        loadClients(){
            this.$http.get('clients').then(data => {
                this.clients = data.data.data
            }).catch(error => {
                if(error.response.status > 400){
                    this.$router.push('/');
                }
            })
        },
        paginate(){
            let page = this.page;
            this.page++;
            this.addFilter('page', page);
        }
    },
    async created() {
        await this.loadMe();
        await this.loadOportunities();
        await this.loadClients();
    }
}
</script>