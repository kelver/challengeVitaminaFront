<template>
    <div class="relative my-4 p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
        <span class="block p-6 bg-white sm:p-8 rounded-xl">
            <div class="mt-1 sm:pr-8">
                <strong class="absolute right-3 top-3 border text-red-500 border-current
                     uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                    {{ this.data.status }}
                </strong>

                <h5 class="text-xl font-bold text-gray-900">{{ this.data.product.name }}</h5>

                <p class="mt-2 text-sm text-gray-500">
                    {{ this.data.product.description.substring(0, 150) }}.
                </p>
                <p class="mt-2 text-sm text-gray-500 font-bold">
                    {{ this.data.client.name }}.
                </p>
                <p v-if="this.data.status === 'open' && this.data.is_valid"
                   class="flex justify-center space-x-4 mt-4 text-sm text-gray-500 font-bold">
                    <!-- Base -->
                    <span class="relative inline-block text-sm font-medium text-green-600 active:text-green-500 group
                            focus:outline-none focus:ring cursor-pointer" @click.stop="updateStatus('accept',
                            this.data.identify)">
                        <span class="absolute inset-0 border border-current"></span>
                        <span
                            class="block px-6 py-2 bg-white border transition-transform border-current group-hover:-translate-x-1 group-hover:-translate-y-1">
                            Aceitar
                        </span>
                    </span>
                    <span class="relative inline-block text-sm font-medium text-red-600 active:text-red-500 group
                        focus:outline-none focus:ring cursor-pointer" @click.stop="updateStatus('lost',
                            this.data.identify)">
                        <span class="absolute inset-0 border border-current"></span>
                        <span
                            class="block px-6 py-2 bg-white border transition-transform border-current group-hover:-translate-x-1 group-hover:-translate-y-1">
                            Perdida
                        </span>
                    </span>
                </p>
            </div>
        </span>
    </div>
</template>

<script>
export default {
    name: 'CardOportunity',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    emits: ["loadOportunities"],
    methods: {
        async updateStatus(status, identifier) {
            await this.$http.put('oportunities/' + identifier, {status: status}).then(data => {
                if (data.status > 200 && data.status < 300) {
                    this.$emit('showAlert', {msg: 'Oportunidade Atualizada com Sucesso!', type: 'success'});
                    this.$emit('loadOportunities')
                }
            }).catch(error => {
                if(error.response.status > 400){
                    this.$emit('showAlert', 'Problema durante a atualização.', 'danger');
                }
            })
        }
    }
}
</script>