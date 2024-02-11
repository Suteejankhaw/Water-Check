<template>
    <div class="image-container">
        <img :src="imagePath" @error="setDefaultImage" alt="Image" class="mx-auto mb-4 w-full h-52 rounded-lg ">
    </div>
</template>

<script>
export default {
    props: {
        imageId: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            defaultImagePath: '/houses/house1.jpg', // Updated path to your default image
        };
    },
    computed: {
        imagePath() {
            // Construct the path based on the imageId
            return `/houses/house${this.imageId}.jpg`;
        }
    },
    methods: {
        setDefaultImage(event) {
            // Set the src to the default image path when the original image fails to load
            event.target.src = this.defaultImagePath;
        }
    }
}
</script>
