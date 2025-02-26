/**
 * 큐레이션 데이터
 */
const CURATIONS_DATA = [
    {
        id: 1,
        title: '서울 핫플 미술관 투어',
        period: '2024.03.03 - 2024.06.30',
        thumbnail: 'https://via.placeholder.com/80/0057FE/ffffff?text=Art',
        category: 'culture',
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
        category: 'cafe',
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
        category: 'activity',
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
        category: 'food',
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