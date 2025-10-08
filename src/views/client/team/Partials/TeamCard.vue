<template>
  <div class="doctor-card card-medium" @click="emit('showMore')">
    <img :src="image" alt="Dermatólogo"
      class="doctor-image">
    <div class="doctor-info">
      <h3 class="font-display text-2xl font-semibold text-white mb-2">{{ name }}</h3>
      <p class="text-[#DCBE9A] text-sm font-medium mb-4 tracking-wide">{{ specialty }}</p>
      <button
        class="view-profile-btn text-white text-xs border border-[#DCBE9A] px-[16px] py-[6px] hover:bg-[#DCBE9A] hover:text-[#202020] transition-all duration-300">
        Ver Perfil
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  image: string
  name: string
  specialty: string
}>()

const emit = defineEmits<{
  (e: "showMore"): void
}>()

</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  color: #202020;
}

.font-display {
  font-family: 'Playfair Display', serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.doctor-card {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(220, 190, 154, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.doctor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(32, 32, 32, 0.1);
  border-color: #DCBE9A;
}

.card-large {
  grid-column: span 2;
  grid-row: span 2;
}

.card-medium {
  grid-column: span 1;
  grid-row: span 2;
}

.card-small {
  grid-column: span 1;
  grid-row: span 1;
}

.doctor-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.doctor-card:hover .doctor-image {
  transform: scale(1.05);
}

.doctor-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(32, 32, 32, 0.95) 0%, rgba(32, 32, 32, 0.8) 70%, transparent 100%);
  padding: 2rem;
  transform: translateY(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.doctor-card:hover .doctor-info {
  background: linear-gradient(to top, rgba(32, 32, 32, 0.98) 0%, rgba(32, 32, 32, 0.9) 80%, transparent 100%);
}

.view-profile-btn {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.doctor-card:hover .view-profile-btn {
  opacity: 1;
  transform: translateY(0);
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(32, 32, 32, 0.95);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal.active {
  display: flex;
  opacity: 1;
}

.modal-content {
  background: #ffffff;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
  position: relative;
  transform: scale(0.9);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal.active .modal-content {
  transform: scale(1);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .card-large {
    grid-column: span 2;
    grid-row: span 2;
  }

  .card-medium {
    grid-column: span 1;
    grid-row: span 2;
  }
}

@media (max-width: 640px) {
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-large,
  .card-medium,
  .card-small {
    grid-column: span 1;
    grid-row: span 1;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
