/**
 * Nollo 애플리케이션 메인 파일
 */
class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.components = {};
        this.services = {};
        
        this.initServices();
        this.initComponents();
        this.render();
        this.bindEvents();
    }
    
    initServices() {
        this.services.api = new ApiService();
        this.services.map = new MapService();
        this.services.curation = new CurationService(CURATIONS_DATA); // 데이터 파일에서 가져옴
    }
    
    initComponents() {
        this.components.header = new Header({
            onSearch: this.handleSearch.bind(this)
        });
        
        this.components.sidebar = new Sidebar({
            curationService: this.services.curation,
            onFilterChange: this.handleFilterChange.bind(this),
            onCurationSelect: this.handleCurationSelect.bind(this)
        });
        
        this.components.map = new Map({
            mapService: this.services.map,
            onMarkerClick: this.handleMarkerClick.bind(this)
        });
    }
    
    render() {
        this.appContainer.innerHTML = `
            <div id="header-container"></div>
            <div class="main-content">
                <div id="sidebar-container"></div>
                <div id="map-container"></div>
            </div>
        `;
        
        // 각 컴포넌트 렌더링
        this.components.header.render(document.getElementById('header-container'));
        this.components.sidebar.render(document.getElementById('sidebar-container'));
        this.components.map.render(document.getElementById('map-container'));
    }
    
    bindEvents() {
        // 전역 이벤트 바인딩
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    // 이벤트 핸들러
    handleSearch(searchTerm) {
        console.log('검색어:', searchTerm);
        // 검색 로직 구현
    }
    
    handleFilterChange(filter) {
        console.log('필터 변경:', filter);
        const filteredCurations = this.services.curation.filterCurations(filter);
        this.components.sidebar.updateCurations(filteredCurations);
        this.components.map.updateMarkers(filteredCurations);
    }
    
    handleCurationSelect(curationId) {
        const curation = this.services.curation.getCurationById(curationId);
        this.components.map.focusOnCuration(curation);
    }
    
    handleMarkerClick(markerId) {
        const curation = this.services.curation.getCurationById(markerId);
        this.components.sidebar.highlightCuration(curation.id);
    }
    
    handleResize() {
        // 반응형 처리
        this.components.map.resize();
    }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.nolloApp = new App();
}); 