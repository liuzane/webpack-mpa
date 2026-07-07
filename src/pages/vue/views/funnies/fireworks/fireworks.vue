<template>
  <div class="fireworks">
    <div class="fireworks__info">
      <h2>粒子烟花</h2>
      <p>点击屏幕任意位置绽放烟花 ✨</p>
    </div>
    <canvas ref="canvas" class="fireworks__canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Fireworks',
  data() {
    return {
      canvas: null,
      ctx: null,
      fireworks: [],
      particles: [],
      animationId: null,
    };
  },
  mounted() {
    this.initCanvas();
    this.animate();
  },
  beforeUnmount() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', this.resizeCanvas);
      this.canvas.addEventListener('click', this.createFirework);
    },
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    createFirework(e) {
      const x = e.clientX;
      const y = e.clientY;
      this.fireworks.push({
        x: this.canvas.width / 2,
        y: this.canvas.height,
        targetX: x,
        targetY: y,
        speed: 8,
        angle: Math.atan2(y - this.canvas.height, x - this.canvas.width / 2),
        color: this.getRandomColor(),
        trail: [],
      });
    },
    getRandomColor() {
      const colors = [
        '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6ec7',
        '#ffa502', '#00d9ff', '#9d4edd', '#ff006e', '#06d6a0',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    createParticles(x, y, color) {
      const particleCount = 60 + Math.random() * 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 / particleCount) * i + Math.random() * 0.3;
        const speed = 2 + Math.random() * 6;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.015 + Math.random() * 0.015,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    },
    updateFireworks() {
      for (let i = this.fireworks.length - 1; i >= 0; i--) {
        const fw = this.fireworks[i];
        fw.x += Math.cos(fw.angle) * fw.speed;
        fw.y += Math.sin(fw.angle) * fw.speed;
        
        fw.trail.push({ x: fw.x, y: fw.y });
        if (fw.trail.length > 10) fw.trail.shift();
        
        const dist = Math.sqrt(
          Math.pow(fw.targetX - fw.x, 2) + Math.pow(fw.targetY - fw.y, 2)
        );
        
        if (dist < 20) {
          this.createParticles(fw.x, fw.y, fw.color);
          this.fireworks.splice(i, 1);
        }
      }
    },
    updateParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= p.decay;
        p.size *= 0.98;
        
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    },
    drawFireworks() {
      this.fireworks.forEach(fw => {
        this.ctx.beginPath();
        this.ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = fw.color;
        this.ctx.fill();
        
        fw.trail.forEach((point, i) => {
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, 2 * (i / fw.trail.length), 0, Math.PI * 2);
          this.ctx.fillStyle = fw.color;
          this.ctx.globalAlpha = i / fw.trail.length;
          this.ctx.fill();
          this.ctx.globalAlpha = 1;
        });
      });
    },
    drawParticles() {
      this.particles.forEach(p => {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.life;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
      });
    },
    animate() {
      this.ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.updateFireworks();
      this.updateParticles();
      this.drawFireworks();
      this.drawParticles();
      
      this.animationId = requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped>
.fireworks {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 50%, #0c0c1e 100%);
  position: relative;
}

.fireworks__info {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  pointer-events: none;
}

.fireworks__info h2 {
  font-size: 32px;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.fireworks__info p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.fireworks__canvas {
  display: block;
  cursor: crosshair;
}
</style>