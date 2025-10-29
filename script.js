document.addEventListener('DOMContentLoaded', function() {
    // 项目路径映射
    const projectPaths = {
        'quiz-game': './quiz-game/index.html',
        'recipe-finder': './recipe-finder/index.html',
        'todo-list': './todo-list/index.html',
        'password-generator': './password-generator/index.html',
        'registration-form': './registration-form/index.html'
    };
    
    // 为所有卡片添加点击事件
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectName = card.getAttribute('data-project');
        
        card.addEventListener('click', function() {
            const projectPath = projectPaths[projectName];
            if (projectPath) {
                // 在新标签页中打开项目
                window.open(projectPath, '_blank');
            } else {
                alert(`找不到项目: ${projectName}`);
            }
        });
    });
});