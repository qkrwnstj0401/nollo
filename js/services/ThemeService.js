/**
 * 테마 서비스
 */
class ThemeService {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.applyTheme(this.theme);
    }
    
    applyTheme(theme) {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('theme', theme);
        this.theme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        return newTheme;
    }
} 