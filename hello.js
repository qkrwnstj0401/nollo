// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nollo 페이지가 로드되었습니다.');
    
    // 큐레이션 데이터 표시
    displayCurations();
    
    // 검색 기능
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('검색어:', searchTerm);
                alert(`"${searchTerm}"에 대한 검색 결과가 없습니다.`);
            } else {
                alert('검색어를 입력해주세요.');
            }
        });
        
        // 엔터 키 입력 시 검색
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // 지도 다시 로드 버튼
    const retryMapLoadButton = document.getElementById('retry-map-load');
    if (retryMapLoadButton) {
        retryMapLoadButton.addEventListener('click', function() {
            alert('지도 로드를 시도합니다. 잠시 기다려주세요.');
            loadKakaoMap();
        });
    }
    
    // 필터 버튼 이벤트
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성화된 필터 버튼 변경
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            console.log('선택된 필터:', filter);
            // 여기에 필터링 로직 추가
        });
    });
    
    // 새 큐레이션 만들기 버튼
    const createCurationButton = document.getElementById('create-curation');
    if (createCurationButton) {
        createCurationButton.addEventListener('click', function() {
            alert('새 놀로 만들기 기능은 현재 개발 중입니다.');
        });
    }
    
    // 모바일 사이드바 토글
    const sidebarToggleButton = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggleButton && sidebar) {
        sidebarToggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // 지도 컨트롤 버튼
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const currentLocationButton = document.getElementById('current-location');
    
    if (zoomInButton) {
        zoomInButton.addEventListener('click', function() {
            alert('확대 기능은 지도가 로드된 후 사용 가능합니다.');
        });
    }
    
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function() {
            alert('축소 기능은 지도가 로드된 후 사용 가능합니다.');
        });
    }
    
    if (currentLocationButton) {
        currentLocationButton.addEventListener('click', function() {
            alert('현재 위치 기능은 지도가 로드된 후 사용 가능합니다.');
        });
    }
    
    // 지도 로드 시도
    loadKakaoMap();
});

// 카카오 맵 로드 시도 함수
function loadKakaoMap() {
    console.log('카카오 맵 로드 시도...');
    
    // 지도 플레이스홀더와 실제 지도 요소
    const mapPlaceholder = document.getElementById('map-placeholder');
    const mapElement = document.getElementById('map');
    
    try {
        // 카카오 맵 API 스크립트 동적 로드
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=8860d49ba12bba27e49057b7ad39d947&libraries=services,clusterer,drawing&autoload=false';
        script.onload = function() {
            console.log('카카오 맵 API 스크립트 로드 완료');
            
            // API 초기화
            kakao.maps.load(function() {
                console.log('카카오 맵 초기화 시작');
                
                // 플레이스홀더 숨기고 지도 요소 표시
                if (mapPlaceholder) mapPlaceholder.style.display = 'none';
                if (mapElement) {
                    mapElement.style.display = 'block';
                    
                    // 지도 생성
                    const options = {
                        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
                        level: 3 // 확대 레벨
                    };
                    
                    const map = new kakao.maps.Map(mapElement, options);
                    console.log('지도가 성공적으로 로드되었습니다.');
                    
                    // 지도 컨트롤 기능 활성화
                    setupMapControls(map);
                    
                    // 큐레이션 위치에 마커 표시
                    displayCurationMarkers(map);
                }
            });
        };
        
        script.onerror = function() {
            console.error('카카오 맵 API 스크립트 로드 실패');
            alert('지도를 로드하는 데 실패했습니다. 나중에 다시 시도해주세요.');
        };
        
        document.head.appendChild(script);
        
    } catch (error) {
        console.error('지도 로드 중 오류 발생:', error);
        alert('지도를 로드하는 데 문제가 발생했습니다.');
    }
}

// 지도 컨트롤 설정 함수
function setupMapControls(map) {
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const currentLocationButton = document.getElementById('current-location');
    
    if (zoomInButton) {
        zoomInButton.addEventListener('click', function() {
            map.setLevel(map.getLevel() - 1);
        });
    }
    
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function() {
            map.setLevel(map.getLevel() + 1);
        });
    }
    
    if (currentLocationButton) {
        currentLocationButton.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const locPosition = new kakao.maps.LatLng(lat, lng);
                    
                    map.setCenter(locPosition);
                    
                    // 현재 위치 마커 표시
                    const marker = new kakao.maps.Marker({
                        position: locPosition
                    });
                    marker.setMap(map);
                    
                    // 인포윈도우 표시
                    const iwContent = '<div style="padding:5px;">현재 위치</div>';
                    const infowindow = new kakao.maps.InfoWindow({
                        content: iwContent
                    });
                    infowindow.open(map, marker);
                    
                    // 3초 후 인포윈도우 닫기
                    setTimeout(function() {
                        infowindow.close();
                    }, 3000);
                    
                }, function(error) {
                    console.error('위치 정보를 가져오는 데 실패했습니다.', error);
                    alert('위치 정보를 가져오는 데 실패했습니다.');
                });
            } else {
                alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
            }
        });
    }
}

// 큐레이션 마커 표시 함수
function displayCurationMarkers(map) {
    curations.forEach(curation => {
        curation.locations.forEach(location => {
            const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
            
            // 커스텀 마커 생성
            const markerContent = document.createElement('div');
            markerContent.className = 'custom-marker curation-marker';
            markerContent.textContent = curation.id;
            
            const customOverlay = new kakao.maps.CustomOverlay({
                position: markerPosition,
                content: markerContent,
                yAnchor: 1
            });
            
            customOverlay.setMap(map);
            
            // 마커 클릭 이벤트
            kakao.maps.event.addListener(customOverlay, 'click', function() {
                alert(`${location.name} - ${curation.title}`);
            });
        });
    });
}

// 큐레이션 목록 표시 함수
function displayCurations() {
    // 내 큐레이션 목록 표시
    const myCurationList = document.getElementById('my-curation-list');
    if (myCurationList) {
        myCurationList.innerHTML = '<p>아직 만든 놀로가 없습니다.</p>';
    }
    
    // 추천 큐레이션 목록 표시
    const recommendedCurationList = document.getElementById('recommended-curation-list');
    if (recommendedCurationList) {
        curations.forEach(curation => {
            const curationItem = document.createElement('div');
            curationItem.className = 'curation-item';
            curationItem.innerHTML = `
                <div class="curation-thumbnail">
                    <img src="${curation.thumbnail || 'https://via.placeholder.com/80'}" alt="${curation.title}">
                </div>
                <div class="curation-info">
                    <h3>${curation.title}</h3>
                    <p class="period">${curation.period}</p>
                    <button class="view-curation-btn" data-id="${curation.id}">보기</button>
                </div>
            `;
            recommendedCurationList.appendChild(curationItem);
        });
        
        // 큐레이션 버튼 이벤트 추가
        recommendedCurationList.querySelectorAll('.view-curation-btn').forEach(button => {
            button.addEventListener('click', function() {
                const curationId = this.getAttribute('data-id');
                showCurationOnMap(curationId);
            });
        });
    }
}

// 큐레이션을 지도에 표시하는 함수
function showCurationOnMap(curationId) {
    const curation = curations.find(c => c.id == curationId);
    if (curation) {
        alert(`"${curation.title}" 놀로를 지도에 표시합니다.`);
    }
}

// 큐레이션 데이터 예시 업데이트
const curations = [
    {
        id: 1,
        title: '서울 핫플 미술관 투어',
        period: '2024.03.03 - 2024.06.30',
        thumbnail: 'https://via.placeholder.com/80/0057FE/ffffff?text=Art',
        locations: [
            {
                name: '국립현대미술관 서울관',
                address: '서울특별시 종로구 삼청로 30',
                lat: 37.5796,
                lng: 126.9770
            }
        ]
    },
    {
        id: 2,
        title: '을지로 힙지로 카페 투어',
        period: '상시',
        thumbnail: 'https://via.placeholder.com/80/4ECDC4/ffffff?text=Cafe',
        locations: [
            {
                name: '을지로 카페거리',
                address: '서울특별시 중구 을지로 일대',
                lat: 37.5656,
                lng: 126.9896
            }
        ]
    },
    {
        id: 3,
        title: '한강 피크닉 명소 모음',
        period: '2024.04.15 - 2024.10.15',
        thumbnail: 'https://via.placeholder.com/80/FFE66D/ffffff?text=Han',
        locations: [
            {
                name: '여의도 한강공원',
                address: '서울특별시 영등포구 여의동로 330',
                lat: 37.5285,
                lng: 126.9348
            }
        ]
    },
    {
        id: 4,
        title: '한남동 맛집 투어',
        period: '상시',
        thumbnail: 'https://via.placeholder.com/80/0057FE/ffffff?text=Food',
        locations: [
            {
                name: '한남동 맛집거리',
                address: '서울특별시 용산구 한남동 일대',
                lat: 37.5352,
                lng: 127.0090
            }
        ]
    }
];