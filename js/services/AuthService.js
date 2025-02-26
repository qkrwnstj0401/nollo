/**
 * 인증 서비스
 */
class AuthService {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        
        // 로컬 스토리지에서 사용자 정보 복원
        this.restoreSession();
    }
    
    async login(email, password) {
        try {
            // API 호출 (실제로는 서버와 통신)
            // 임시 구현
            if (email === 'user@example.com' && password === 'password') {
                const userData = {
                    id: 1,
                    name: '사용자',
                    email: email,
                    token: 'sample-token-123'
                };
                
                this.setCurrentUser(userData);
                return { success: true, user: userData };
            }
            
            return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
        } catch (error) {
            console.error('로그인 오류:', error);
            return { success: false, message: '로그인 중 오류가 발생했습니다.' };
        }
    }
    
    logout() {
        this.currentUser = null;
        this.isLoggedIn = false;
        localStorage.removeItem('user');
        return { success: true };
    }
    
    // 나머지 메서드들...
} 