/**
 * 유틸리티 함수 모음
 */

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
}

// 디바운스 함수
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// 로컬 스토리지 래퍼 함수
const storage = {
    get: (key, defaultValue = null) => {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },
    set: (key, value) => {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    }
}; 