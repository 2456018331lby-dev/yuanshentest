// ============================================
// 原神角色人格测试 - 8维度交互逻辑
// ============================================

class PersonalityQuiz {
    constructor() {
        this.currentQuestion = 0;
        // 8维度得分：正向得分累加
        this.scores = {
            EI: 0,  // 正=E, 负=I
            SN: 0,  // 正=S, 负=N
            TF: 0,  // 正=T, 负=F
            JP: 0,  // 正=J, 负=P
            AC: 0,  // 正=A, 负=C
            LD: 0,  // 正=L, 负=D
            RC: 0,  // 正=R, 负=C(混沌)
            HM: 0   // 正=H, 负=M
        };
        this.answers = [];
        this.isAnimating = false;
        this.radarChart = null;

        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.landingPage = document.getElementById('landing-page');
        this.quizPage = document.getElementById('quiz-page');
        this.resultPage = document.getElementById('result-page');

        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.shareBtn = document.getElementById('share-btn');

        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.questionNumber = document.getElementById('question-number');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');

        this.characterImage = document.getElementById('character-image');
        this.characterName = document.getElementById('character-name');
        this.characterTitle = document.getElementById('character-title');
        this.personalityType = document.getElementById('personality-type');
        this.characterDescription = document.getElementById('character-description');
        this.traits = document.getElementById('traits');
        this.elementBadge = document.getElementById('element-badge');
        this.toast = document.getElementById('toast');

        // 结果页新增元素
        this.radarCanvas = document.getElementById('radar-canvas');
        this.dimensionBars = document.getElementById('dimension-bars');
        this.quoteBlock = document.getElementById('quote-block');
        this.playstyleBlock = document.getElementById('playstyle-block');
        this.teammatesBlock = document.getElementById('teammates-block');
        this.avoidBlock = document.getElementById('avoid-block');
        this.matchScore = document.getElementById('match-score');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.shareBtn.addEventListener('click', () => this.shareResult());

        // 键盘支持
        document.addEventListener('keydown', (e) => {
            if (!this.quizPage.classList.contains('active')) return;
            if (this.isAnimating) return;

            const key = parseInt(e.key);
            if (key >= 1 && key <= 4) {
                const options = this.optionsContainer.querySelectorAll('.option');
                if (options[key - 1]) {
                    options[key - 1].click();
                }
            }
        });
    }

    startQuiz() {
        this.landingPage.classList.remove('active');
        this.quizPage.classList.add('active');
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];

        // 更新进度
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `${this.currentQuestion + 1} / ${questions.length}`;

        // 更新题号和题目
        this.questionNumber.textContent = `Question ${String(this.currentQuestion + 1).padStart(2, '0')}`;
        this.questionText.textContent = question.question;

        // 更新选项
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.innerHTML = `
                <span class="option-key">${index + 1}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.addEventListener('click', () => this.selectOption(option, button));
            this.optionsContainer.appendChild(button);
        });

        // 入场动画
        this.animateQuestionIn();
    }

    animateQuestionIn() {
        const elements = [this.questionNumber, this.questionText, ...this.optionsContainer.children];
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(12px)';
            el.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }

    selectOption(option, buttonElement) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // 记录答案
        this.answers.push({
            questionId: questions[this.currentQuestion].id,
            selected: option
        });

        // 更新分数（累加score，可以是正负）
        const dim = questions[this.currentQuestion].dimension;
        this.scores[dim] += option.score;

        // 视觉反馈
        const allOptions = this.optionsContainer.querySelectorAll('.option');
        allOptions.forEach(opt => opt.classList.add('disabled'));
        buttonElement.classList.remove('disabled');
        buttonElement.classList.add('selected');

        // 延迟后进入下一题
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < questions.length) {
                this.transitionToNextQuestion();
            } else {
                this.showResult();
            }
        }, 600);
    }

    transitionToNextQuestion() {
        const elements = [this.questionNumber, this.questionText, ...this.optionsContainer.children];
        elements.forEach((el, i) => {
            el.style.transition = `all 0.3s ease ${i * 0.03}s`;
            el.style.opacity = '0';
            el.style.transform = 'translateX(-20px)';
        });

        setTimeout(() => {
            this.showQuestion();
            this.isAnimating = false;
        }, 350);
    }

    // 计算8维雷达得分（0-100）
    calculateRadarScores() {
        // 每个维度8题，每题最高2分，所以理论范围是 -16 到 +16
        // 映射到 0-100
        const radar = {};
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
        dims.forEach(dim => {
            const raw = this.scores[dim];
            // raw范围约 -16 到 16，映射到 0-100
            radar[dim] = Math.max(0, Math.min(100, Math.round((raw + 16) / 32 * 100)));
        });
        return radar;
    }

    // 通过欧氏距离匹配最相似角色
    findBestMatch() {
        const userRadar = this.calculateRadarScores();
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];

        let bestMatch = null;
        let minDistance = Infinity;

        Object.values(characters).forEach(char => {
            let distance = 0;
            dims.forEach(dim => {
                const diff = userRadar[dim] - char.radar[dims.indexOf(dim)];
                distance += diff * diff;
            });
            distance = Math.sqrt(distance);

            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = char;
            }
        });

        // 匹配度：距离最大约 800 (8*100^2 开根)，转换为百分比
        const maxPossible = Math.sqrt(8 * 100 * 100); // ~282.8
        const matchPercent = Math.max(0, Math.round((1 - minDistance / maxPossible) * 100));

        return { character: bestMatch, matchPercent, userRadar };
    }

    showResult() {
        this.quizPage.classList.remove('active');
        this.resultPage.classList.add('active');

        const { character, matchPercent, userRadar } = this.findBestMatch();

        if (character) {
            // 设置角色内容
            if (character.image) {
                this.characterImage.innerHTML = `<img src="${character.image}" alt="${character.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'emoji-fallback\\'>${character.emoji}</span>'">`;
            } else {
                this.characterImage.innerHTML = `<span class="emoji-fallback">${character.emoji}</span>`;
            }
            this.characterImage.style.background = `linear-gradient(135deg, ${elementColors[character.element]}, ${this.adjustColor(elementColors[character.element], 40)})`;

            this.characterName.textContent = character.name;
            this.characterTitle.textContent = character.title;

            // 8维度类型标签
            const typeLabels = this.getDimensionLabels();
            this.personalityType.innerHTML = `
                <span>${typeLabels}</span>
                <span class="divider"></span>
                <span>${character.element}元素</span>
            `;

            this.characterDescription.textContent = character.description;
            this.elementBadge.textContent = elementIcons[character.element] || character.emoji;

            // 匹配度
            if (this.matchScore) {
                this.matchScore.textContent = `匹配度 ${matchPercent}%`;
            }

            // 特质标签
            this.traits.innerHTML = '';
            character.traits.forEach(trait => {
                const tag = document.createElement('span');
                tag.className = 'trait-tag';
                tag.textContent = trait;
                this.traits.appendChild(tag);
            });

            // 雷达图
            if (this.radarCanvas) {
                this.drawRadarChart(userRadar, character.radar, character.name);
            }

            // 维度条
            if (this.dimensionBars) {
                this.renderDimensionBars(userRadar);
            }

            // 名言
            if (this.quoteBlock) {
                this.quoteBlock.innerHTML = `
                    <div class="quote-mark">"</div>
                    <p class="quote-text">${character.quote}</p>
                    <p class="quote-author">—— ${character.name}</p>
                `;
            }

            // 游戏风格
            if (this.playstyleBlock) {
                this.playstyleBlock.innerHTML = `
                    <h4 class="section-subtitle">游戏风格</h4>
                    <p>${character.playstyle}</p>
                `;
            }

            // 推荐队友
            if (this.teammatesBlock && character.teammates) {
                const matesHtml = character.teammates.map(name => {
                    const mate = Object.values(characters).find(c => c.name === name);
                    return mate ? `<span class="relation-tag mate">${mate.emoji} ${name}</span>` : '';
                }).join('');
                this.teammatesBlock.innerHTML = `
                    <h4 class="section-subtitle">默契搭档</h4>
                    <div class="relation-tags">${matesHtml}</div>
                `;
            }

            // 不合拍
            if (this.avoidBlock && character.avoid) {
                const avoidHtml = character.avoid.map(name => {
                    const av = Object.values(characters).find(c => c.name === name);
                    return av ? `<span class="relation-tag avoid">${av.emoji} ${name}</span>` : '';
                }).join('');
                this.avoidBlock.innerHTML = `
                    <h4 class="section-subtitle">气场相冲</h4>
                    <div class="relation-tags">${avoidHtml}</div>
                `;
            }

            // 触发错开入场动画
            this.animateResultIn();

            // 保存结果到本地存储
            localStorage.setItem('genshinPersonalityResult', JSON.stringify({
                character: character.name,
                matchPercent,
                radar: userRadar,
                date: new Date().toISOString()
            }));
        }

        this.isAnimating = false;
    }

    // 获取维度标签，如 "E-S-T-J-A-L-R-H"
    getDimensionLabels() {
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
        const pos = ['E', 'S', 'T', 'J', 'A', 'L', 'R', 'H'];
        const neg = ['I', 'N', 'F', 'P', 'C', 'D', 'C', 'M'];
        return dims.map((dim, i) => this.scores[dim] >= 0 ? pos[i] : neg[i]).join('');
    }

    drawRadarChart(userRadar, charRadar, charName) {
        const canvas = this.radarCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) / 2 - 40;
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
        const dimLabels = ['外向', '实感', '思考', '判断', '冒险', '光明', '规则', '热情'];

        ctx.clearRect(0, 0, w, h);

        // 绘制网格
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            const r = (radius / 5) * i;
            for (let j = 0; j < 8; j++) {
                const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = i === 5 ? 'rgba(212, 168, 67, 0.3)' : 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 绘制轴线
        for (let j = 0; j < 8; j++) {
            const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.stroke();

            // 标签
            const labelR = radius + 22;
            const lx = cx + Math.cos(angle) * labelR;
            const ly = cy + Math.sin(angle) * labelR;
            ctx.fillStyle = 'var(--text-secondary)';
            ctx.font = '12px "Noto Sans SC", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dimLabels[j], lx, ly);
        }

        // 绘制角色数据
        this.drawRadarPolygon(ctx, cx, cy, radius, charRadar, 'rgba(212, 168, 67, 0.15)', 'rgba(212, 168, 67, 0.6)', 2);

        // 绘制用户数据
        const userValues = dims.map(d => userRadar[d]);
        this.drawRadarPolygon(ctx, cx, cy, radius, userValues, 'rgba(79, 195, 247, 0.1)', 'rgba(79, 195, 247, 0.7)', 2);

        // 图例
        ctx.fillStyle = 'rgba(212, 168, 67, 0.8)';
        ctx.fillRect(w - 110, 10, 12, 12);
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = '11px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(charName, w - 92, 18);

        ctx.fillStyle = 'rgba(79, 195, 247, 0.8)';
        ctx.fillRect(w - 110, 28, 12, 12);
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText('你', w - 92, 36);
    }

    drawRadarPolygon(ctx, cx, cy, radius, values, fillStyle, strokeStyle, lineWidth) {
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
            const r = (values[i] / 100) * radius;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // 顶点
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
            const r = (values[i] / 100) * radius;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = strokeStyle;
            ctx.fill();
        }
    }

    renderDimensionBars(userRadar) {
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
        const labels = {
            EI: ['外向', '内向'],
            SN: ['实感', '直觉'],
            TF: ['思考', '情感'],
            JP: ['判断', '知觉'],
            AC: ['冒险', '谨慎'],
            LD: ['光明', '黑暗'],
            RC: ['规则', '混沌'],
            HM: ['热情', '冷静']
        };

        this.dimensionBars.innerHTML = '';
        dims.forEach(dim => {
            const val = userRadar[dim];
            const leftLabel = labels[dim][0];
            const rightLabel = labels[dim][1];
            const barHtml = `
                <div class="dim-bar-row">
                    <span class="dim-label left">${leftLabel}</span>
                    <div class="dim-bar-track">
                        <div class="dim-bar-fill" style="left: ${val <= 50 ? val + '%' : '50%'}; width: ${Math.abs(val - 50)}%; background: ${val > 50 ? 'var(--gold-primary)' : 'var(--el-hydro)'};"></div>
                        <div class="dim-bar-center"></div>
                    </div>
                    <span class="dim-label right">${rightLabel}</span>
                </div>
            `;
            this.dimensionBars.innerHTML += barHtml;
        });
    }

    animateResultIn() {
        const animatedElements = [
            { el: this.characterName, delay: 0, type: 'stagger-scale' },
            { el: this.characterTitle, delay: 150, type: 'stagger-in' },
            { el: this.personalityType, delay: 250, type: 'stagger-in' },
            { el: this.matchScore, delay: 300, type: 'stagger-in' },
            { el: this.characterDescription, delay: 400, type: 'stagger-in' },
            { el: this.traits, delay: 550, type: 'stagger-in' },
            { el: this.radarCanvas?.parentElement, delay: 600, type: 'stagger-in' },
            { el: this.dimensionBars, delay: 700, type: 'stagger-in' },
            { el: this.quoteBlock, delay: 800, type: 'stagger-in' },
            { el: this.playstyleBlock, delay: 900, type: 'stagger-in' },
            { el: this.teammatesBlock, delay: 1000, type: 'stagger-in' },
            { el: this.avoidBlock, delay: 1100, type: 'stagger-in' }
        ];

        // 头像特殊动画
        this.characterImage.parentElement.style.opacity = '0';
        this.characterImage.parentElement.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.characterImage.parentElement.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.characterImage.parentElement.style.opacity = '1';
            this.characterImage.parentElement.style.transform = 'scale(1)';
        }, 100);

        // 其他元素错开动画
        animatedElements.forEach(({ el, delay, type }) => {
            if (!el) return;
            el.style.opacity = '0';
            el.classList.remove('stagger-in', 'stagger-scale');
            void el.offsetWidth;
            setTimeout(() => {
                el.classList.add(type);
            }, delay);
        });
    }

    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.min(255, parseInt(hex.substr(0, 2), 16) + amount);
        const g = Math.min(255, parseInt(hex.substr(2, 2), 16) + amount);
        const b = Math.min(255, parseInt(hex.substr(4, 2), 16) + amount);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.scores = { EI: 0, SN: 0, TF: 0, JP: 0, AC: 0, LD: 0, RC: 0, HM: 0 };
        this.answers = [];
        this.isAnimating = false;

        this.resultPage.classList.remove('active');
        this.landingPage.classList.add('active');
    }

    shareResult() {
        const { character, matchPercent } = this.findBestMatch();
        const typeLabels = this.getDimensionLabels();
        const shareText = `我在原神角色人格测试中匹配到了「${character.name}」！匹配度${matchPercent}%
${character.title}
人格类型：${typeLabels}

来测测你最像哪位原神角色吧！`;

        if (navigator.share) {
            navigator.share({
                title: '原神角色人格测试',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                if (err.name !== 'AbortError') {
                    this.copyToClipboard(shareText);
                }
            });
        } else {
            this.copyToClipboard(shareText);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('结果已复制到剪贴板！');
        }).catch(() => {
            this.showToast('复制失败，请手动复制');
        });
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2500);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new PersonalityQuiz();
});
