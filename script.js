document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const pill = document.getElementById('themePill');
    const radios = document.querySelectorAll('.theme-switcher-input');
    const radioLight = document.getElementById('themeLight');
    const radioSystem = document.getElementById('themeSystem');
    const radioDark = document.getElementById('themeDark');

    // Position map: light=0, system=1, dark=2
    const positionMap = { light: '0', system: '1', dark: '2' };

    // Resolve what the system preference actually is
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply the resolved theme to the document
    function applyTheme(mode) {
        const resolvedTheme = mode === 'system' ? getSystemTheme() : mode;
        htmlElement.setAttribute('data-theme', resolvedTheme);
    }

    // Move the sliding pill to the correct position
    function movePill(mode) {
        pill.setAttribute('data-position', positionMap[mode]);
    }

    // Check the correct radio button
    function checkRadio(mode) {
        if (mode === 'light') radioLight.checked = true;
        else if (mode === 'system') radioSystem.checked = true;
        else if (mode === 'dark') radioDark.checked = true;
    }

    // Set everything for a given mode
    function setMode(mode) {
        applyTheme(mode);
        movePill(mode);
        checkRadio(mode);
    }

    // Determine initial mode from localStorage
    const savedMode = localStorage.getItem('themeMode'); // 'light' | 'system' | 'dark'
    const initialMode = savedMode || 'system';
    setMode(initialMode);

    // Listen for radio changes
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const mode = e.target.value;
            setMode(mode);
            localStorage.setItem('themeMode', mode);
        });
    });

    // Listen for system preference changes (matters when "system" is selected)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentMode = localStorage.getItem('themeMode') || 'system';
        if (currentMode === 'system') {
            applyTheme('system');
        }
    });
});
