
        let startTime = 0, elapsed = 0, timerInterval = null, laps = [];
        const timerDisplay = document.getElementById('timer');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const lapBtn = document.getElementById('lapBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapsDiv = document.getElementById('laps');

        function formatTime(ms) {
            const centiseconds = Math.floor((ms % 1000) / 10);
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor(ms / (1000 * 60 * 60));
            return (
                (hours < 10 ? '0' : '') + hours + ':' +
                (minutes < 10 ? '0' : '') + minutes + ':' +
                (seconds < 10 ? '0' : '') + seconds + '.' +
                (centiseconds < 10 ? '0' : '') + centiseconds
            );
        }

        function updateDisplay() {
            timerDisplay.textContent = formatTime(elapsed);
        }

        function startTimer() {
            if (!timerInterval) {
                startTime = Date.now() - elapsed;
                timerInterval = setInterval(() => {
                    elapsed = Date.now() - startTime;
                    updateDisplay();
                }, 10);
            }
        }

        function stopTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }

        function resetTimer() {
            stopTimer();
            elapsed = 0;
            laps = [];
            updateDisplay();
            renderLaps();
        }

        function lapTimer() {
            if (timerInterval) {
                laps.push(elapsed);
                renderLaps();
            }
        }

        function renderLaps() {
            const lapList = laps.map((lap, i) =>
                `<div class="lap-item"><span>Lap ${i + 1}</span><span>${formatTime(lap)}</span></div>`
            ).join('');
            lapsDiv.innerHTML = `<h3>Laps</h3>${lapList}`;
        }

        startBtn.onclick = startTimer;
        stopBtn.onclick = stopTimer;
        resetBtn.onclick = resetTimer;
        lapBtn.onclick = lapTimer;

        updateDisplay();
        renderLaps();
    