/**
 * 지도 서비스 개선
 */
class MapService {
    constructor() {
        this.map = null;
        this.markers = [];
    }
    
    initMap(container) {
        // 카카오맵 API 초기화
        if (window.kakao && window.kakao.maps) {
            const options = {
                center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
                level: 7
            };
            
            this.map = new kakao.maps.Map(container, options);
            
            // 지도 컨트롤 추가
            const zoomControl = new kakao.maps.ZoomControl();
            this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
            
            return true;
        }
        return false;
    }
    
    // 마커 추가 기능
    addMarkers(locations) {
        if (!this.map) return;
        
        // 기존 마커 제거
        this.clearMarkers();
        
        // 새 마커 추가
        locations.forEach(location => {
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(location.lat, location.lng),
                map: this.map
            });
            
            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', () => {
                // 마커 정보창 표시
                this.showInfoWindow(marker, location);
            });
            
            this.markers.push({
                id: location.id,
                marker: marker
            });
        });
    }
    
    addMarker(options) {
        if (!this.map || !this.kakao) return null;
        
        const position = new this.kakao.maps.LatLng(options.lat, options.lng);
        
        // 커스텀 마커 생성
        const markerContent = document.createElement('div');
        markerContent.className = 'custom-marker';
        markerContent.textContent = options.id;
        markerContent.dataset.id = options.id;
        
        const customOverlay = new this.kakao.maps.CustomOverlay({
            position: position,
            content: markerContent,
            yAnchor: 1
        });
        
        customOverlay.setMap(this.map);
        this.markers.push({
            overlay: customOverlay,
            id: options.id,
            position: position
        });
        
        return customOverlay;
    }
    
    addMarkerClickListener(marker, callback) {
        if (!marker) return;
        
        this.kakao.maps.event.addListener(marker, 'click', callback);
    }
    
    clearMarkers() {
        this.markers.forEach(marker => {
            marker.overlay.setMap(null);
        });
        this.markers = [];
    }
    
    highlightMarker(markerId) {
        this.markers.forEach(marker => {
            const markerElement = marker.overlay.getContent();
            if (marker.id == markerId) {
                markerElement.classList.add('highlight');
                
                // 3초 후 하이라이트 제거
                setTimeout(() => {
                    markerElement.classList.remove('highlight');
                }, 3000);
            } else {
                markerElement.classList.remove('highlight');
            }
        });
    }
    
    panTo(lat, lng) {
        if (!this.map || !this.kakao) return;
        
        const position = new this.kakao.maps.LatLng(lat, lng);
        this.map.panTo(position);
    }
    
    zoomIn() {
        if (!this.map) return;
        this.map.setLevel(this.map.getLevel() - 1);
    }
    
    zoomOut() {
        if (!this.map) return;
        this.map.setLevel(this.map.getLevel() + 1);
    }
    
    goToCurrentLocation() {
        if (!this.map || !this.kakao) return;
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const locPosition = new this.kakao.maps.LatLng(lat, lng);
                    
                    this.map.setCenter(locPosition);
                    
                    // 현재 위치 마커 표시
                    const marker = new this.kakao.maps.Marker({
                        position: locPosition
                    });
                    marker.setMap(this.map);
                    
                    // 인포윈도우 표시
                    const iwContent = '<div style="padding:5px;">현재 위치</div>';
                    const infowindow = new this.kakao.maps.InfoWindow({
                        content: iwContent
                    });
                    infowindow.open(this.map, marker);
                    
                    // 3초 후 인포윈도우 닫기
                    setTimeout(() => {
                        infowindow.close();
                    }, 3000);
                },
                (error) => {
                    console.error('위치 정보를 가져오는 데 실패했습니다.', error);
                    alert('위치 정보를 가져오는 데 실패했습니다.');
                }
            );
        } else {
            alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
        }
    }
    
    resizeMap() {
        if (!this.map) return;
        
        setTimeout(() => {
            this.map.relayout();
        }, 0);
    }
} 