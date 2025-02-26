/**
 * 지도 컴포넌트
 */
class Map {
    constructor(options = {}) {
        this.mapService = options.mapService;
        this.onMarkerClick = options.onMarkerClick || function() {};
        this.map = null;
        this.markers = [];
    }
    
    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <main class="map-area">
                <div id="map-placeholder">
                    <p>지도를 로드하는 중입니다...</p>
                    <button id="retry-map-load">지도 다시 로드하기</button>
                </div>
                <div id="map" style="display: none;"></div>
                
                <!-- 지도 컨트롤 -->
                <div class="map-controls">
                    <button class="map-control-btn" id="zoom-in"><i class="fas fa-plus"></i></button>
                    <button class="map-control-btn" id="zoom-out"><i class="fas fa-minus"></i></button>
                    <button class="map-control-btn" id="current-location"><i class="fas fa-location-arrow"></i></button>
                </div>
                
                <!-- 모바일용 사이드바 토글 버튼 -->
                <button class="sidebar-toggle" id="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </main>
        `;
        
        this.bindEvents();
        this.loadMap();
    }
    
    bindEvents() {
        // 지도 다시 로드 버튼
        const retryButton = this.container.querySelector('#retry-map-load');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                this.loadMap();
            });
        }
        
        // 모바일용 사이드바 토글 버튼
        const sidebarToggle = this.container.querySelector('#sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                document.querySelector('.sidebar').parentElement.classList.toggle('active');
            });
        }
    }
    
    loadMap() {
        this.mapService.loadMap('map', 'map-placeholder')
            .then(map => {
                this.map = map;
                this.setupMapControls();
                this.displayAllMarkers();
            })
            .catch(error => {
                console.error('지도 로드 실패:', error);
                const placeholder = this.container.querySelector('#map-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = `
                        <p>지도를 로드하는 데 실패했습니다.</p>
                        <button id="retry-map-load">다시 시도</button>
                    `;
                    
                    const retryButton = placeholder.querySelector('#retry-map-load');
                    if (retryButton) {
                        retryButton.addEventListener('click', () => {
                            this.loadMap();
                        });
                    }
                }
            });
    }
    
    setupMapControls() {
        const zoomInButton = this.container.querySelector('#zoom-in');
        const zoomOutButton = this.container.querySelector('#zoom-out');
        const currentLocationButton = this.container.querySelector('#current-location');
        
        if (zoomInButton) {
            zoomInButton.addEventListener('click', () => {
                this.mapService.zoomIn();
            });
        }
        
        if (zoomOutButton) {
            zoomOutButton.addEventListener('click', () => {
                this.mapService.zoomOut();
            });
        }
        
        if (currentLocationButton) {
            currentLocationButton.addEventListener('click', () => {
                this.mapService.goToCurrentLocation();
            });
        }
    }
    
    displayAllMarkers() {
        this.mapService.clearMarkers();
        const curations = window.nolloApp.services.curation.getCurations();
        this.displayMarkers(curations);
    }
    
    displayMarkers(curations) {
        curations.forEach(curation => {
            curation.locations.forEach(location => {
                const marker = this.mapService.addMarker({
                    lat: location.lat,
                    lng: location.lng,
                    id: curation.id,
                    title: curation.title
                });
                
                this.mapService.addMarkerClickListener(marker, () => {
                    this.onMarkerClick(curation.id);
                });
            });
        });
    }
    
    updateMarkers(curations) {
        this.mapService.clearMarkers();
        this.displayMarkers(curations);
    }
    
    focusOnCuration(curation) {
        if (!curation || !curation.locations || curation.locations.length === 0) return;
        
        const location = curation.locations[0];
        this.mapService.panTo(location.lat, location.lng);
        this.mapService.highlightMarker(curation.id);
    }
    
    resize() {
        if (this.map) {
            this.mapService.resizeMap();
        }
    }
} 