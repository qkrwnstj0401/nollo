/**
 * 큐레이션 에디터 컴포넌트
 */
class CurationEditor {
    constructor(options = {}) {
        this.curation = options.curation || {
            title: '',
            period: '',
            category: 'culture',
            locations: []
        };
        this.onSave = options.onSave || function() {};
        this.onCancel = options.onCancel || function() {};
    }
    
    render(container) {
        this.container = container;
        
        container.innerHTML = `
            <div class="curation-editor">
                <h2>${this.curation.id ? '큐레이션 편집' : '새 큐레이션 만들기'}</h2>
                
                <form id="curation-form">
                    <div class="form-group">
                        <label for="title">제목</label>
                        <input type="text" id="title" value="${this.curation.title}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="period">기간</label>
                        <input type="text" id="period" value="${this.curation.period}" placeholder="예: 2024.01.01 - 2024.12.31">
                    </div>
                    
                    <div class="form-group">
                        <label for="category">카테고리</label>
                        <select id="category">
                            <option value="culture" ${this.curation.category === 'culture' ? 'selected' : ''}>문화</option>
                            <option value="cafe" ${this.curation.category === 'cafe' ? 'selected' : ''}>카페</option>
                            <option value="activity" ${this.curation.category === 'activity' ? 'selected' : ''}>액티비티</option>
                            <option value="food" ${this.curation.category === 'food' ? 'selected' : ''}>음식</option>
                        </select>
                    </div>
                    
                    <h3>장소</h3>
                    <div id="locations-container">
                        ${this.renderLocations()}
                    </div>
                    
                    <button type="button" id="add-location-btn">장소 추가</button>
                    
                    <div class="form-actions">
                        <button type="button" id="cancel-btn">취소</button>
                        <button type="submit" id="save-btn">저장</button>
                    </div>
                </form>
            </div>
        `;
        
        this.bindEvents();
    }
    
    // 나머지 메서드들...
} 