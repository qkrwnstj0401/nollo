/**
 * API 서비스
 */
class ApiService {
    constructor() {
        this.baseUrl = 'https://api.nollo.kr'; // 예시 URL
    }
    
    async get(endpoint, params = {}) {
        try {
            // 실제 API 호출 대신 임시 데이터 반환
            console.log(`GET 요청: ${endpoint}`, params);
            return this.getMockData(endpoint);
        } catch (error) {
            console.error('API 요청 실패:', error);
            throw error;
        }
    }
    
    async post(endpoint, data = {}) {
        try {
            // 실제 API 호출 대신 임시 데이터 반환
            console.log(`POST 요청: ${endpoint}`, data);
            return { success: true, message: '요청이 성공적으로 처리되었습니다.' };
        } catch (error) {
            console.error('API 요청 실패:', error);
            throw error;
        }
    }
    
    getMockData(endpoint) {
        // 임시 데이터 반환
        switch (endpoint) {
            case '/curations':
                return CURATIONS_DATA;
            case '/user/profile':
                return {
                    id: 1,
                    name: '사용자',
                    email: 'user@example.com'
                };
            default:
                return { message: '데이터가 없습니다.' };
        }
    }
} 