/**
 * 헤더 컴포넌트
 */
class Header {
    constructor(options = {}) {
        this.onSearch = options.onSearch || function() {};
    }
    
    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <header class="app-header">
                <div class="logo">
                    <h1>nollo</h1>
                    <span class="tagline">놀러갈 곳</span>
                </div>
                <div class="search-container">
                    <div class="search-box">
                        <input type="text" id="search-input" placeholder="어디로 놀러갈까요?">
                        <button id="search-button"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                <nav class="main-nav">
                    <ul>
                        <li><a href="#" class="active">홈</a></li>
                        <li><a href="#">큐레이션</a></li>
                        <li><a href="#">내 지도</a></li>
                        <li><a href="#">로그인</a></li>
                    </ul>
                </nav>
            </header>
        `;
        
        this.bindEvents();
    }
    
    bindEvents() {
        const searchButton = this.container.querySelector('#search-button');
        const searchInput = this.container.querySelector('#search-input');
        
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    this.onSearch(searchTerm);
                } else {
                    alert('검색어를 입력해주세요.');
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchButton.click();
                }
            });
        }
    }
} 