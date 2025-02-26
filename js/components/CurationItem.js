/**
 * 큐레이션 아이템 컴포넌트
 */
class CurationItem {
    constructor(options = {}) {
        this.curation = options.curation;
        this.onClick = options.onClick || function() {};
    }
    
    render() {
        return `
            <div class="curation-item" data-id="${this.curation.id}">
                <div class="curation-thumbnail">
                    <img src="${this.curation.thumbnail || 'https://via.placeholder.com/80'}" alt="${this.curation.title}">
                </div>
                <div class="curation-info">
                    <h3>${this.curation.title}</h3>
                    <p class="period">${this.curation.period}</p>
                    <button class="view-curation-btn" data-id="${this.curation.id}">보기</button>
                </div>
            </div>
        `;
    }
    
    bindEvents(element) {
        const viewButton = element.querySelector('.view-curation-btn');
        if (viewButton) {
            viewButton.addEventListener('click', () => {
                this.onClick(this.curation.id);
            });
        }
        
        // 아이템 전체 클릭 이벤트
        element.addEventListener('click', (e) => {
            if (!e.target.classList.contains('view-curation-btn')) {
                this.onClick(this.curation.id);
            }
        });
    }
} 