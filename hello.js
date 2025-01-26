document.addEventListener('DOMContentLoaded', function () {
    // 카카오 객체가 로드되었는지 확인
    if (typeof kakao === 'undefined') {
        console.error('카카오 지도 API가 로드되지 않았습니다.');
        return;
    }

    const container = document.getElementById('map'); 
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
        level: 3 // 확대 레벨
    };

    try {
        // 지도 생성
        const map = new kakao.maps.Map(container, options); 

        // 마커 추가
        const markerPosition = new kakao.maps.LatLng(37.5665, 126.9780); // 마커 위치
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 마커 클릭 시 정보창 표시 (선택 사항)
        kakao.maps.event.addListener(marker, 'click', function () {
            alert('서울시청 위치입니다!');
        });

    } catch (error) {
        console.error('지도 로드 중 오류 발생:', error);
    }
});