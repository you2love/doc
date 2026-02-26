// 代码块折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有代码块
    const codeBlocks = document.querySelectorAll('.code-block, .xml-panel, .analysis-example, .component-example');
    
    codeBlocks.forEach(function(block, index) {
        // 检查是否已经处理过
        if (block.classList.contains('code-fold-processed')) return;
        
        // 创建折叠容器
        const foldContainer = document.createElement('div');
        foldContainer.className = 'code-fold';
        
        // 创建标题栏
        const header = document.createElement('div');
        header.className = 'code-fold-header';
        
        // 尝试获取代码块的标题
        let title = '代码示例';
        const prevElement = block.previousElementSibling;
        if (prevElement && prevElement.classList.contains('section-heading')) {
            title = prevElement.textContent.replace(/^\d+\.\s*/, '');
        }
        
        header.innerHTML = `
            <span class="code-fold-title">
                <span>📄</span>
                <span>${title}</span>
            </span>
            <span class="code-fold-toggle">
                <span class="toggle-text">收起</span>
                <span class="icon">▼</span>
            </span>
        `;
        
        // 创建内容区
        const content = document.createElement('div');
        content.className = 'code-fold-content';
        
        // 将原代码块移入内容区
        block.parentNode.insertBefore(foldContainer, block);
        foldContainer.appendChild(header);
        foldContainer.appendChild(content);
        content.appendChild(block);
        
        // 标记已处理
        block.classList.add('code-fold-processed');
        
        // 添加点击事件
        header.addEventListener('click', function() {
            const isCollapsed = content.classList.toggle('collapsed');
            const icon = header.querySelector('.icon');
            const toggleText = header.querySelector('.toggle-text');
            
            if (isCollapsed) {
                icon.classList.add('collapsed');
                toggleText.textContent = '展开';
            } else {
                icon.classList.remove('collapsed');
                toggleText.textContent = '收起';
            }
        });
    });
});
