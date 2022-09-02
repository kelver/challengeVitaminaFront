<template>
    <div>
        <Datepicker v-model="date" @update:modelValue="handleDate"
            :enableTimePicker="false" locale="pt-br" format="dd/MM/yyyy"
            cancelText="Cancelar" selectText="Confirmar" autoApply :closeOnAutoApply="true" />
    </div>
</template>

<script>
    import Datepicker from '@vuepic/vue-datepicker';
    import {ref} from "vue";
    export default {
        components: {
            Datepicker
        },
        emits: ['addFilter'],
        setup(props, {emit}) {
            const date = ref();

            const handleDate = (modelData) => {
                let fullDate = '';
                if(modelData !== null) {
                    const day = modelData.getDate();
                    const month = modelData.getMonth() + 1;
                    const year = modelData.getFullYear();
                    fullDate = `${day}/${month}/${year}`;
                }
                emit('addFilter', {name: 'date', value:fullDate});
                return fullDate;
            }

            return {
                date,
                handleDate,
            }
        }
    }
</script>