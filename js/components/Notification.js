/**
 * 알림 컴포넌트
 */
class Notification {
    constructor() {
        this.container = null;
        this.timeout = null;
        this.init();
    }
    
    init() {
        // 알림 컨테이너 생성
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', duration = 3000) {
        // 기존 알림 제거
        this.clear();
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // 닫기 버튼 이벤트
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.clear());
        
        // 알림 표시
        this.container.appendChild(notification);
        
        // 자동 제거 타이머 설정
        this.timeout = setTimeout(() => this.clear(), duration);
    }
    
    clear() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        
        this.container.innerHTML = '';
    }
} 