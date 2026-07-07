<template>
  <div class="spin-wheel">
    <h2>决策转盘</h2>
    <p>不知道选什么？让命运来决定吧！🎲</p>
    
    <div class="spin-wheel__input-section">
      <input 
        type="text" 
        v-model="newOption" 
        placeholder="输入选项，按回车添加"
        @keyup.enter="addOption"
        class="spin-wheel__input"
      >
      <button @click="addOption" class="spin-wheel__btn-add">添加</button>
    </div>
    
    <div class="spin-wheel__options" v-if="options.length > 0">
      <span 
        v-for="(opt, index) in options" 
        :key="index"
        class="spin-wheel__tag"
      >
        {{ opt }}
        <button @click="removeOption(index)" class="spin-wheel__btn-remove">×</button>
      </span>
    </div>
    
    <div class="spin-wheel__container" v-if="options.length >= 2">
      <div class="spin-wheel__wheel" :style="wheelStyle">
        <div 
          v-for="(opt, index) in options" 
          :key="index"
          class="spin-wheel__slice"
          :style="getSliceStyle(index)"
        >
          <span class="spin-wheel__slice-text">{{ opt }}</span>
        </div>
      </div>
      
      <div class="spin-wheel__pointer"></div>
      
      <button 
        @click="spin" 
        class="spin-wheel__btn-spin"
        :disabled="isSpinning"
      >
        {{ isSpinning ? '转动中...' : '开始转动' }}
      </button>
    </div>
    
    <div class="spin-wheel__result" v-if="result">
      <div class="spin-wheel__result-content">
        🎉 结果是：{{ result }}
      </div>
    </div>
    
    <div class="spin-wheel__empty" v-if="options.length < 2">
      <p>请添加至少 2 个选项</p>
      <button @click="loadPresets" class="spin-wheel__btn-presets">加载预设选项</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpinWheel',
  data() {
    return {
      options: [],
      newOption: '',
      isSpinning: false,
      rotation: 0,
      result: '',
    };
  },
  computed: {
    wheelStyle() {
      return {
        transform: `rotate(${this.rotation}deg)`,
      };
    },
  },
  methods: {
    addOption() {
      const opt = this.newOption.trim();
      if (opt && !this.options.includes(opt)) {
        this.options.push(opt);
        this.newOption = '';
        this.result = '';
      }
    },
    removeOption(index) {
      this.options.splice(index, 1);
      this.result = '';
    },
    getSliceStyle(index) {
      const angle = 360 / this.options.length;
      const startAngle = index * angle;
      const colors = [
        '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6ec7',
        '#ffa502', '#00d9ff', '#9d4edd', '#ff006e', '#06d6a0',
      ];
      
      return {
        background: `linear-gradient(${startAngle}deg, ${colors[index % colors.length]} 0%, ${colors[(index + 1) % colors.length]} 100%)`,
        transform: `rotate(${startAngle}deg)`,
        clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`,
      };
    },
    spin() {
      if (this.isSpinning || this.options.length < 2) return;
      
      this.isSpinning = true;
      this.result = '';
      
      const extraSpins = 5 + Math.random() * 5;
      const randomAngle = Math.random() * 360;
      const totalRotation = this.rotation + extraSpins * 360 + randomAngle;
      
      this.rotation = totalRotation;
      
      setTimeout(() => {
        this.isSpinning = false;
        const normalizedRotation = this.rotation % 360;
        const anglePerOption = 360 / this.options.length;
        const selectedIndex = Math.floor((360 - normalizedRotation) / anglePerOption) % this.options.length;
        this.result = this.options[selectedIndex];
      }, 4000);
    },
    loadPresets() {
      this.options = [
        '奶茶', '火锅', '烧烤', '披萨', '寿司', '汉堡',
      ];
    },
  },
};
</script>

<style scoped>
.spin-wheel {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
}

.spin-wheel h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 8px;
}

.spin-wheel p {
  color: #666;
  margin-bottom: 24px;
}

.spin-wheel__input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.spin-wheel__input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e4e7ed;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #667eea;
  }
}

.spin-wheel__btn-add {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
}

.spin-wheel__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 30px;
}

.spin-wheel__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f5f7fa;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.spin-wheel__btn-remove {
  width: 20px;
  height: 20px;
  border: none;
  background: #f56c6c;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin-wheel__container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 30px;
}

.spin-wheel__wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 4s cubic-bezier(0.25, 0.1, 0.25, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.spin-wheel__slice {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 0;
  transform-origin: 0% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin-wheel__slice-text {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  color: white;
  font-weight: 600;
  font-size: 12px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.spin-wheel__pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 25px solid #f56c6c;
  z-index: 10;
}

.spin-wheel__btn-spin {
  padding: 14px 40px;
  background: linear-gradient(135deg, #f56c6c 0%, #f78366 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(245, 108, 108, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.spin-wheel__result {
  margin-top: 30px;
  animation: fadeIn 0.5s ease;
}

.spin-wheel__result-content {
  padding: 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.spin-wheel__empty {
  padding: 40px;
  background: #f8f9fa;
  border-radius: 12px;
}

.spin-wheel__empty p {
  color: #909399;
  margin-bottom: 16px;
}

.spin-wheel__btn-presets {
  padding: 10px 24px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  
  &:hover {
    background: #667eea;
    color: white;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>