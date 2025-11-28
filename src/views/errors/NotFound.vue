<template>
  <div class="dashboard-404">
    <!-- Contenedor principal -->
    <div class="container">

      <!-- Sección izquierda: Visual -->
      <div class="visual-section">
        <div class="illustration-wrapper">
          <!-- Círculo de fondo animado -->
          <div class="circle-bg"></div>

          <!-- Número 404 artístico -->
          <div class="error-display">
            <span class="digit">4</span>
            <div class="zero-container">
              <LucideSearchX class="zero-icon" />
            </div>
            <span class="digit">4</span>
          </div>

          <!-- Línea decorativa -->
          <div class="decorative-bar"></div>
        </div>
      </div>

      <!-- Sección derecha: Contenido -->
      <div class="content-section">

        <!-- Breadcrumb/Path -->
        <div class="breadcrumb">
          <LucideHome class="breadcrumb-icon" />
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-text">Error 404</span>
        </div>

        <!-- Título principal -->
        <h1 class="main-title">
          {{ $t('NotFound.NotFound') }}
        </h1>

        <!-- Descripción -->
        <p class="description">
          {{ $t('NotFound.Subtitle') }}
        </p>

        <!-- Sugerencias -->
        <div class="suggestions">
          <p class="suggestions-title">{{ t('NotFound.CanTry.Title') }}</p>
          <ul class="suggestions-list">
            <li>
              <LucideCheck class="check-icon" />
              {{ t('NotFound.CanTry.First') }}
            </li>
            <li>
              <LucideCheck class="check-icon" />
              {{ t('NotFound.CanTry.Second') }}
            </li>
          </ul>
        </div>

        <!-- Botones de acción -->
        <div class="actions">
          <button @click="goBack" class="btn-secondary">
            <LucideArrowLeft class="btn-icon" />
            {{ t('NotFound.GoBack') }}
          </button>
        </div>

        <!-- Separador -->
        <div class="separator"></div>

        <!-- Footer info -->
        <div class="footer-info">
          <LucideInfo class="footer-icon" />
          <span>
            {{ t('NotFound.NeedHelp') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Elementos decorativos de fondo -->
    <div class="bg-decoration">
      <div class="dot-pattern"></div>
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LucideSearchX,
  LucideHome,
  LucideArrowLeft,
  LucideCheck,
  LucideInfo
} from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
/* Contenedor principal */
.dashboard-404 {
  min-height: 100vh;
  background-color: #0A0909;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* === SECCIÓN VISUAL === */
.visual-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.illustration-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Círculo de fondo */
.circle-bg {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at center,
      rgba(220, 190, 154, 0.08) 0%,
      rgba(220, 190, 154, 0.03) 50%,
      transparent 100%);
  border: 1px solid rgba(220, 190, 154, 0.1);
  animation: pulse-circle 4s ease-in-out infinite;
}

@keyframes pulse-circle {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

/* Display del 404 */
.error-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.digit {
  font-size: 10rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #DCBE9A 0%, #F5E6D3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: float-digit 3s ease-in-out infinite;
}

.digit:nth-child(1) {
  animation-delay: 0s;
}

.digit:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes float-digit {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.zero-container {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(220, 190, 154, 0.1);
  border: 3px solid #DCBE9A;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: rotate-slow 20s linear infinite;
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.zero-icon {
  width: 60px;
  height: 60px;
  color: #DCBE9A;
  animation: float-digit 3s ease-in-out infinite 0.1s;
}

/* Barra decorativa */
.decorative-bar {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #DCBE9A, transparent);
  border-radius: 9999px;
  animation: bar-pulse 2s ease-in-out infinite;
}

@keyframes bar-pulse {

  0%,
  100% {
    opacity: 0.3;
    width: 60%;
  }

  50% {
    opacity: 0.8;
    width: 70%;
  }
}

/* === SECCIÓN DE CONTENIDO === */
.content-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #DCBE9A;
  opacity: 0.6;
  font-size: 0.875rem;
  animation: fade-in-down 0.6s ease-out;
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
}

.breadcrumb-separator {
  opacity: 0.5;
}

.breadcrumb-text {
  font-weight: 500;
}

/* Título */
.main-title {
  font-size: 3rem;
  font-weight: 800;
  color: #DCBE9A;
  line-height: 1.2;
  margin: 0;
  animation: fade-in-left 0.6s ease-out 0.1s both;
}

/* Descripción */
.description {
  font-size: 1.125rem;
  color: #DCBE9A;
  opacity: 0.7;
  line-height: 1.6;
  margin: 0;
  animation: fade-in-left 0.6s ease-out 0.2s both;
}

/* Sugerencias */
.suggestions {
  background: rgba(220, 190, 154, 0.05);
  border: 1px solid rgba(220, 190, 154, 0.15);
  border-radius: 1rem;
  padding: 1.5rem;
  animation: fade-in-left 0.6s ease-out 0.3s both;
}

.suggestions-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #DCBE9A;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.suggestions-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #DCBE9A;
  opacity: 0.8;
  font-size: 0.9375rem;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  color: #DCBE9A;
  flex-shrink: 0;
}

/* Botones de acción */
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: fade-in-left 0.6s ease-out 0.4s both;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: #DCBE9A;
  color: #0A0909;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(220, 190, 154, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #DCBE9A;
  border: 1px solid rgba(220, 190, 154, 0.3);
}

.btn-secondary:hover {
  background: rgba(220, 190, 154, 0.05);
  border-color: rgba(220, 190, 154, 0.5);
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* Separador */
.separator {
  height: 1px;
  background: linear-gradient(90deg, #DCBE9A, transparent);
  opacity: 0.2;
  animation: fade-in-left 0.6s ease-out 0.5s both;
}

/* Acceso rápido */
.quick-access {
  animation: fade-in-left 0.6s ease-out 0.6s both;
}

.quick-access-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #DCBE9A;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(220, 190, 154, 0.03);
  border: 1px solid rgba(220, 190, 154, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.quick-link:hover {
  background: rgba(220, 190, 154, 0.08);
  border-color: rgba(220, 190, 154, 0.3);
  transform: translateY(-2px);
}

.quick-link-icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 190, 154, 0.1);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.quick-link:hover .quick-link-icon-wrapper {
  background: rgba(220, 190, 154, 0.2);
  transform: scale(1.1);
}

.quick-link-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #DCBE9A;
}

.quick-link-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #DCBE9A;
  opacity: 0.8;
}

/* Footer info */
.footer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(220, 190, 154, 0.03);
  border: 1px solid rgba(220, 190, 154, 0.1);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  color: #DCBE9A;
  opacity: 0.7;
  animation: fade-in-left 0.6s ease-out 0.7s both;
}

.footer-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.footer-link {
  color: #DCBE9A;
  text-decoration: underline;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.footer-link:hover {
  opacity: 0.7;
}

/* === DECORACIÓN DE FONDO === */
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.dot-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(220, 190, 154, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: pattern-move 30s linear infinite;
}

@keyframes pattern-move {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(30px, 30px);
  }
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.orb-1 {
  top: 10%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(220, 190, 154, 0.2) 0%, transparent 70%);
  animation: orb-float-1 15s ease-in-out infinite;
}

.orb-2 {
  bottom: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(220, 190, 154, 0.15) 0%, transparent 70%);
  animation: orb-float-2 20s ease-in-out infinite;
}

@keyframes orb-float-1 {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(30px, -30px);
  }
}

@keyframes orb-float-2 {

  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-30px, 30px);
  }
}

/* === ANIMACIONES === */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* === RESPONSIVE === */
@media (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1.5rem;
  }

  .visual-section {
    order: 2;
  }

  .content-section {
    order: 1;
  }

  .illustration-wrapper {
    max-width: 400px;
  }

  .digit {
    font-size: 8rem;
  }

  .zero-container {
    width: 120px;
    height: 120px;
  }

  .zero-icon {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .actions {
    flex-direction: column;
  }

  .quick-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .digit {
    font-size: 6rem;
  }

  .zero-container {
    width: 100px;
    height: 100px;
  }

  .zero-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 2rem 1rem;
  }

  .content-section,
  .visual-section {
    padding: 1rem;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>
