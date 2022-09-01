<template>
    <div class="flex flex-col min-h-screen">
        <Header />

        <main class="">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Replace with your content -->
                <div class="px-4 py-6 sm:px-0">
                    <div class="rounded-lg h-auto">

                    </div>
                </div>
                <!-- /End replace -->
            </div>
        </main>

        <Footer />
    </div>

</template>

<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
    name: 'HomeView',
    components: {Header, Footer},
}
</script>

<style>
body {
    overflow: hidden;
}
</style>