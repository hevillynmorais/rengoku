const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Som de "Swoosh" da espada e brasas
function playSwordSound(freq, duration) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// Rastro da Espada ao mover o mouse
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    
    // Cores alternadas de fogo
    const colors = ['#ff4500', '#ffcc00', '#ffffff'];
    trail.style.background = colors[Math.floor(Math.random() * colors.length)];
    trail.style.boxShadow = `0 0 10px ${trail.style.background}`;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 600);
});

// Explosão de Chamas ao clicar
document.getElementById('rengokuCard').addEventListener('click', (e) => {
    playSwordSound(150, 0.6); // Som de impacto
    
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'fire-particle';
        
        // Direção aleatória da explosão
        const moveX = (Math.random() - 0.5) * 300 + 'px';
        const moveY = (Math.random() - 0.5) * 300 + 'px';
        p.style.setProperty('--x', moveX);
        p.style.setProperty('--y', moveY);
        
        const size = Math.random() * 10 + 5 + 'px';
        p.style.width = size;
        p.style.height = size;
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
});
