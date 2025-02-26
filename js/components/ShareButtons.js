/**
 * 소셜 공유 버튼 컴포넌트
 */
class ShareButtons {
    constructor(options = {}) {
        this.url = options.url || window.location.href;
        this.title = options.title || document.title;
        this.description = options.description || '';
    }
    
    render(container) {
        container.innerHTML = `
            <div class="share-buttons">
                <button class="share-btn kakao" title="카카오톡으로 공유">
                    <i class="fas fa-comment"></i>
                </button>
                <button class="share-btn facebook" title="페이스북으로 공유">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="share-btn twitter" title="트위터로 공유">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="share-btn link" title="링크 복사">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        `;
        
        this.bindEvents(container);
    }
    
    bindEvents(container) {
        const kakaoBtn = container.querySelector('.kakao');
        const facebookBtn = container.querySelector('.facebook');
        const twitterBtn = container.querySelector('.twitter');
        const linkBtn = container.querySelector('.link');
        
        if (kakaoBtn) {
            kakaoBtn.addEventListener('click', () => this.shareKakao());
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => this.shareFacebook());
        }
        
        if (twitterBtn) {
            twitterBtn.addEventListener('click', () => this.shareTwitter());
        }
        
        if (linkBtn) {
            linkBtn.addEventListener('click', () => this.copyLink());
        }
    }
    
    // 공유 메서드들...
} 