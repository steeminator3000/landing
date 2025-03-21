/**
 * Animations JavaScript for LiquidVest Landing Page
 * Contains canvas animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize canvas animations after modules are loaded
    document.addEventListener('allModulesLoaded', initializeCanvasAnimations);
    
    // Make the function globally available so it can be called from main.js
    window.initializeCanvasAnimations = initializeCanvasAnimations;
    
    function initializeCanvasAnimations() {
        // Get canvas element
        const canvas = document.getElementById('liquidCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Liquid drops class
        class Drop {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -50;
                this.size = Math.random() * 20 + 10;
                this.speed = Math.random() * 2 + 2;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.hue = Math.random() * 40 + 200; // Blue to cyan range
            }
            
            update() {
                this.y += this.speed;
                this.opacity -= 0.002;
                
                if (this.y > canvas.height || this.opacity <= 0) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                // Create gradient for drop
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.opacity})`);
                gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create drops
        const drops = [];
        const dropCount = 20;
        
        for (let i = 0; i < dropCount; i++) {
            drops.push(new Drop());
        }
        
        // Floating particles class
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.hue = Math.random() * 40 + 200; // Blue to cyan range
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        const particles = [];
        const particleCount = 150;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Draw water wave
        function drawWave(time) {
            ctx.beginPath();
            
            const height = 50;
            const amplitude = 20;
            const frequency = 0.02;
            const y = canvas.height - height;
            
            ctx.moveTo(0, y + Math.sin(time * 0.001) * amplitude);
            
            for (let x = 0; x < canvas.width; x++) {
                const wave1 = Math.sin(x * frequency + time * 0.001) * amplitude;
                const wave2 = Math.sin(x * frequency * 2 + time * 0.002) * amplitude / 2;
                ctx.lineTo(x, y + wave1 + wave2);
            }
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            
            const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(0, 112, 243, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 200, 255, 0.05)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        
        // Animation loop
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw drops
            drops.forEach(drop => {
                drop.update();
                drop.draw();
            });
            
            // Draw wave
            drawWave(performance.now());
            
            // Continue animation loop
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        console.log('Canvas animations initialized');
    }
});