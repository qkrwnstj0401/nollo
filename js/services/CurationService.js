/**
 * 큐레이션 서비스
 */
class CurationService {
    constructor(initialData = []) {
        this.curations = initialData;
    }
    
    getCurations() {
        return this.curations;
    }
    
    getCurationById(id) {
        return this.curations.find(curation => curation.id == id);
    }
    
    filterCurations(filter) {
        if (filter === 'all') {
            return this.curations;
        }
        
        return this.curations.filter(curation => {
            // 여기서는 임시로 ID를 기준으로 필터링합니다.
            // 실제로는 카테고리나 태그 등의 속성으로 필터링해야 합니다.
            if (filter === 'culture' && (curation.id === 1)) return true;
            if (filter === 'cafe' && (curation.id === 2)) return true;
            if (filter === 'activity' && (curation.id === 3)) return true;
            if (filter === 'food' && (curation.id === 4)) return true;
            return false;
        });
    }
    
    createCuration(curationData) {
        // 새 큐레이션 생성 로직
        const newId = Math.max(...this.curations.map(c => c.id), 0) + 1;
        const newCuration = {
            id: newId,
            ...curationData
        };
        
        this.curations.push(newCuration);
        return newCuration;
    }
    
    updateCuration(id, curationData) {
        // 큐레이션 업데이트 로직
        const index = this.curations.findIndex(c => c.id == id);
        if (index === -1) return null;
        
        this.curations[index] = {
            ...this.curations[index],
            ...curationData
        };
        
        return this.curations[index];
    }
    
    deleteCuration(id) {
        // 큐레이션 삭제 로직
        const index = this.curations.findIndex(c => c.id == id);
        if (index === -1) return false;
        
        this.curations.splice(index, 1);
        return true;
    }
} 