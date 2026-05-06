document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'LIGHT MODE';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = 'DARK MODE';
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'light';
        let btnText = 'DARK MODE';

        if (currentTheme === 'light') {
            newTheme = 'dark';
            btnText = 'LIGHT MODE';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        themeToggleBtn.textContent = btnText;
        localStorage.setItem('theme', newTheme);
    });
});
