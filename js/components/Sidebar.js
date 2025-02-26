/**
 * 사이드바 컴포넌트
 */
class Sidebar {
    constructor(options = {}) {
        this.curationService = options.curationService;
        this.onFilterChange = options.onFilterChange || function() {};
        this.onCurationSelect = options.onCurationSelect || function() {};
        this.activeFilter = 'all';
    }
    
    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <aside class="sidebar">
                <!-- 필터 영역 -->
                <div class="filter-section">
                    <div class="filter-options">
                        <button class="filter-btn active" data-filter="all">전체</button>
                        <button class="filter-btn" data-filter="culture">문화</button>
                        <button class="filter-btn" data-filter="food">맛집</button>
                        <button class="filter-btn" data-filter="cafe">카페</button>
                        <button class="filter-btn" data-filter="activity">액티비티</button>
                    </div>
                </div>

                <!-- 내 큐레이션 영역 -->
                <div class="my-curation-section">
                    <div class="section-header">
                        <h2>내 놀로</h2>
                        <button id="create-curation" class="icon-btn"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="curation-list" id="my-curation-list">
                        <p>아직 만든 놀로가 없습니다.</p>
                    </div>
                </div>

                <!-- 추천 큐레이션 영역 -->
                <div class="recommended-section">
                    <div class="section-header">
                        <h2>추천 놀로</h2>
                        <button class="icon-btn refresh-btn"><i class="fas fa-sync-alt"></i></button>
                    </div>
                    <div class="curation-list" id="recommended-curation-list"></div>
                </div>
                
                <!-- 모바일용 닫기 버튼 -->
                <button class="close-sidebar-btn">
                    <i class="fas fa-times"></i>
                </button>
            </aside>
        `;
        
        this.renderCurations();
        this.bindEvents();
    }
    
    renderCurations() {
        const recommendedList = this.container.querySelector('#recommended-curation-list');
        if (!recommendedList) return;
        
        recommendedList.innerHTML = '';
        
        const curations = this.curationService.getCurations();
        curations.forEach(curation => {
            const curationItemComponent = new CurationItem({
                curation,
                onClick: this.onCurationSelect
            });
            
            const curationElement = document.createElement('div');
            curationElement.innerHTML = curationItemComponent.render();
            recommendedList.appendChild(curationElement.firstChild);
        });
    }
    
    updateCurations(curations) {
        const recommendedList = this.container.querySelector('#recommended-curation-list');
        if (!recommendedList) return;
        
        recommendedList.innerHTML = '';
        
        if (curations.length === 0) {
            recommendedList.innerHTML = '<p>해당 필터에 맞는 놀로가 없습니다.</p>';
            return;
        }
        
        curations.forEach(curation => {
            const curationItemComponent = new CurationItem({
                curation,
                onClick: this.onCurationSelect
            });
            
            const curationElement = document.createElement('div');
            curationElement.innerHTML = curationItemComponent.render();
            recommendedList.appendChild(curationElement.firstChild);
        });
    }
    
    highlightCuration(curationId) {
        // 선택된 큐레이션 강조 표시
        const curationItems = this.container.querySelectorAll('.curation-item');
        curationItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id == curationId) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }
    
    bindEvents() {
        // 필터 버튼 이벤트
        const filterButtons = this.container.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.activeFilter = filter;
                this.onFilterChange(filter);
            });
        });
        
        // 새 큐레이션 만들기 버튼
        const createButton = this.container.querySelector('#create-curation');
        if (createButton) {
            createButton.addEventListener('click', () => {
                alert('새 놀로 만들기 기능은 현재 개발 중입니다.');
            });
        }
        
        // 새로고침 버튼
        const refreshButton = this.container.querySelector('.refresh-btn');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                this.renderCurations();
            });
        }
        
        // 모바일용 닫기 버튼
        const closeButton = this.container.querySelector('.close-sidebar-btn');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.container.parentElement.classList.remove('active');
            });
        }
    }
} 