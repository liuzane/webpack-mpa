<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="home__hero">
      <div class="home__hero-content">
        <h1 class="home__hero-title">Webpack MPA Demo</h1>
        <p class="home__hero-subtitle">基于 Webpack 的多页面应用架构演示项目</p>
        <div class="home__hero-buttons">
          <router-link to="/library" class="home__btn home__btn--primary">
            探索组件库
          </router-link>
          <router-link to="/funnies" class="home__btn home__btn--secondary">
            趣味页面
          </router-link>
        </div>
      </div>
      <div class="home__hero-visual">
        <div class="home__floating-box home__floating-box--1">Vue</div>
        <div class="home__floating-box home__floating-box--2">Ant Design Vue</div>
        <div class="home__floating-box home__floating-box--3">Canvas</div>
        <div class="home__floating-box home__floating-box--4">Webpack</div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="home__features">
      <h2 class="home__section-title">技术栈特性</h2>
      <div class="home__features-grid">
        <div class="home__feature-card">
          <div class="home__feature-icon">💚</div>
          <h3>Vue 3</h3>
          <p>Vue 3 Composition API，更好的代码组织和逻辑复用</p>
        </div>
        <div class="home__feature-card">
          <div class="home__feature-icon">📦</div>
          <h3>Webpack 5</h3>
          <p>最新的模块打包工具，优化的构建性能和缓存策略</p>
        </div>
        <div class="home__feature-card">
          <div class="home__feature-icon">🚀</div>
          <h3>MPA 架构</h3>
          <p>多页面应用架构，独立的入口和路由管理</p>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="home__links">
      <h2 class="home__section-title">快速导航</h2>
      <div class="home__links-grid">
        <router-link to="/library/antd-ui" class="home__link-card">
          <div class="home__link-icon">🎯</div>
          <h3>Ant Design Vue</h3>
          <p>UI 组件库示例</p>
        </router-link>
        <router-link to="/library/lodash" class="home__link-card">
          <div class="home__link-icon">🔗</div>
          <h3>Lodash</h3>
          <p>工具函数库示例</p>
        </router-link>
        <router-link to="/funnies/fireworks" class="home__link-card">
          <div class="home__link-icon">🎆</div>
          <h3>粒子烟花</h3>
          <p>炫酷的视觉效果</p>
        </router-link>
        <router-link to="/funnies/spin-wheel" class="home__link-card">
          <div class="home__link-icon">🎲</div>
          <h3>决策转盘</h3>
          <p>随机选择工具</p>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="home__footer">
      <p>© 2026 Webpack MPA Demo. Built with ❤️</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Hero Section */
.home__hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 60px;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.home__hero-content {
  flex: 1;
  z-index: 10;
}

.home__hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.home__hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
}

.home__hero-buttons {
  display: flex;
  gap: 16px;
}

.home__btn {
  padding: 14px 32px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.home__btn--primary {
  background: #fff;
  color: #667eea;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.home__btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
}

.home__btn--secondary {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.home__btn--secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.home__hero-visual {
  flex: 1;
  position: relative;
  height: 400px;
}

.home__floating-box {
  position: absolute;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  animation: float 4s ease-in-out infinite;
}

.home__floating-box--1 {
  top: 50px;
  left: 50px;
  animation-delay: 0s;
}

.home__floating-box--2 {
  top: 100px;
  right: 80px;
  animation-delay: 0.5s;
}

.home__floating-box--3 {
  bottom: 100px;
  left: 100px;
  animation-delay: 1s;
}

.home__floating-box--4 {
  bottom: 100px;
  right: 200px;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Features Section */
.home__features {
  padding: 60px;
  background: #fff;
}

.home__section-title {
  font-size: 32px;
  font-weight: 700;
  color: #303133;
  text-align: center;
  margin-bottom: 40px;
}

.home__features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.home__feature-card {
  padding: 32px;
  background: #f8f9fa;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.home__feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.home__feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.home__feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.home__feature-card p {
  color: #909399;
  line-height: 1.6;
}

/* Quick Links Section */
.home__links {
  padding: 60px;
  background: #f5f7fa;
}

.home__links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.home__link-card {
  padding: 28px;
  background: #fff;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e4e7ed;
}

.home__link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.home__link-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.home__link-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}

.home__link-card p {
  font-size: 13px;
  color: #909399;
}

/* Footer */
.home__footer {
  padding: 30px;
  text-align: center;
  background: #303133;
  color: #909399;
}

.home__footer p {
  margin: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .home__hero {
    flex-direction: column;
    text-align: center;
  }

  .home__features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .home__links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .home__features-grid {
    grid-template-columns: 1fr;
  }

  .home__links-grid {
    grid-template-columns: 1fr;
  }

  .home__hero-title {
    font-size: 32px;
  }
}
</style>