// ============================================
// 原神角色人格测试 - 8维度交互逻辑
// ============================================

const STORAGE_KEY = 'genshinPersonalityProgress';
const RESULT_KEY = 'genshinPersonalityResult';

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
        this.answers = [];  // Each: { questionId, selected, selectedIndex }
        this.isAnimating = false;
        this.radarChart = null;
        this.focusedOption = -1;  // For keyboard navigation
        this.soundEnabled = false;
        this.currentTopMatches = [];
        this._beforeunloadHandler = null;
        this._shareImageData = null;

        this.initElements();
        this.bindEvents();
        this.checkSavedProgress();
    }

    initElements() {
        this.landingPage = document.getElementById('landing-page');
        this.quizPage = document.getElementById('quiz-page');
        this.resultPage = document.getElementById('result-page');

        this.startBtn = document.getElementById('start-btn');
        this.continueBtn = document.getElementById('continue-btn');
        this.clearProgressBtn = document.getElementById('clear-progress-btn');
        this.clearProgressWrap = document.getElementById('clear-progress-wrap');
        this.backBtn = document.getElementById('back-btn');
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

        // 新增 UI 元素
        this.dimensionPills = document.getElementById('dimension-pills');
        this.exitModal = document.getElementById('exit-modal');
        this.shareImageModal = document.getElementById('share-image-modal');
        this.soundToggle = document.getElementById('sound-toggle');
        this.loadingSkeleton = document.getElementById('loading-skeleton');
        this.quizContentWrapper = document.getElementById('quiz-content-wrapper');
        this.similarSection = document.getElementById('similar-section');
        this.similarCards = document.getElementById('similar-cards');
        this.shareImageBtn = document.getElementById('share-image-btn');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.continueBtn.addEventListener('click', () => this.continueQuiz());
        this.clearProgressBtn.addEventListener('click', () => this.clearProgress());
        this.backBtn.addEventListener('click', () => this.goToPreviousQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.shareBtn.addEventListener('click', () => this.shareResult());
        this.shareImageBtn.addEventListener('click', () => this.generateShareImage());

        // Exit modal
        document.getElementById('exit-continue').addEventListener('click', () => this.hideExitModal());
        document.getElementById('exit-leave').addEventListener('click', () => this.confirmExit());

        // Share image modal
        document.getElementById('share-image-download').addEventListener('click', () => this.downloadShareImage());
        document.getElementById('share-image-close').addEventListener('click', () => {
            this.shareImageModal.style.display = 'none';
        });

        // Sound toggle
        this.soundToggle.addEventListener('click', () => this.toggleSound());

        // Dimension pills - click to jump
        this.dimensionPills.addEventListener('click', (e) => {
            const pill = e.target.closest('.dim-pill');
            if (!pill || !pill.classList.contains('completed')) return;
            const dim = pill.dataset.dim;
            const idx = this.getDimensionFirstQuestion(dim);
            if (idx >= 0 && idx !== this.currentQuestion) {
                this.currentQuestion = idx;
                this.saveProgress();
                this.showQuestion();
            }
        });

        // Landing page "返回首页" handling - intercept navigation on quiz page
        // (the exit modal is triggered by beforeunload and explicit back-to-landing actions)

        // 键盘支持
        document.addEventListener('keydown', (e) => {
            if (!this.quizPage.classList.contains('active')) return;
            if (this.isAnimating) return;

            switch (e.key) {
                case '1': case '2': case '3': case '4': {
                    const idx = parseInt(e.key) - 1;
                    const options = this.optionsContainer.querySelectorAll('.option');
                    if (options[idx] && !options[idx].classList.contains('disabled')) {
                        options[idx].click();
                    }
                    break;
                }
                case 'ArrowLeft':
                    e.preventDefault();
                    this.goToPreviousQuestion();
                    break;
                case 'ArrowRight':
                case 'Enter': {
                    e.preventDefault();
                    // If there's a focused option, click it; otherwise do nothing
                    const options = this.optionsContainer.querySelectorAll('.option');
                    if (this.focusedOption >= 0 && this.focusedOption < options.length) {
                        if (!options[this.focusedOption].classList.contains('disabled')) {
                            options[this.focusedOption].click();
                        }
                    } else {
                        // Focus first option
                        this.focusOption(0);
                    }
                    break;
                }
                case 'ArrowDown':
                    e.preventDefault();
                    this.moveFocus(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.moveFocus(-1);
                    break;
            }
        });
    }

    focusOption(index) {
        const options = this.optionsContainer.querySelectorAll('.option');
        // Remove previous focus
        options.forEach(opt => opt.classList.remove('focused'));
        if (index >= 0 && index < options.length) {
            this.focusedOption = index;
            options[index].classList.add('focused');
        }
    }

    moveFocus(direction) {
        const options = this.optionsContainer.querySelectorAll('.option');
        if (options.length === 0) return;
        let next = this.focusedOption + direction;
        if (next < 0) next = options.length - 1;
        if (next >= options.length) next = 0;
        this.focusOption(next);
    }

    // ---- Sound ----

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const onIcon = this.soundToggle.querySelector('.sound-icon-on');
        const offIcon = this.soundToggle.querySelector('.sound-icon-off');
        if (this.soundEnabled) {
            onIcon.style.display = '';
            offIcon.style.display = 'none';
            this.showToast('音效已开启');
        } else {
            onIcon.style.display = 'none';
            offIcon.style.display = '';
            this.showToast('音效已关闭');
        }
    }

    playClickSound() {
        if (!this.soundEnabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            // Silently fail
        }
    }

    // ---- Progress Save/Restore ----

    checkSavedProgress() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                if (data && data.currentQuestion > 0 && data.answers && data.answers.length > 0) {
                    this.continueBtn.style.display = '';
                    this.clearProgressWrap.style.display = '';
                }
            }
        } catch (e) {
            // Ignore corrupt data
        }
    }

    saveProgress() {
        try {
            const data = {
                currentQuestion: this.currentQuestion,
                scores: { ...this.scores },
                answers: this.answers.map(a => a ? {
                    questionId: a.questionId,
                    selectedIndex: a.selectedIndex
                } : null)
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            // Silently fail if localStorage unavailable
        }
    }

    loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!saved) return false;
            this.currentQuestion = saved.currentQuestion || 0;
            this.scores = saved.scores || this.scores;
            // Rebuild answers from saved selectedIndex
            this.answers = (saved.answers || []).map(a => {
                if (!a) return null;
                const q = questions.find(qn => qn.id === a.questionId);
                const opt = q ? q.options[a.selectedIndex] : null;
                return {
                    questionId: a.questionId,
                    selected: opt,
                    selectedIndex: a.selectedIndex
                };
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    clearSavedProgress() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
    }

    clearProgress() {
        this.clearSavedProgress();
        this.continueBtn.style.display = 'none';
        this.clearProgressWrap.style.display = 'none';
        this.showToast('进度已清除');
    }

    // ---- Exit Confirmation ----

    enableExitWarning() {
        this._beforeunloadHandler = (e) => {
            const hasAnswers = this.answers.some(a => a !== null && a !== undefined);
            if (hasAnswers) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', this._beforeunloadHandler);
    }

    disableExitWarning() {
        if (this._beforeunloadHandler) {
            window.removeEventListener('beforeunload', this._beforeunloadHandler);
            this._beforeunloadHandler = null;
        }
    }

    showExitModal() {
        const hasAnswers = this.answers.some(a => a !== null && a !== undefined);
        if (!hasAnswers) {
            this.performExit();
            return;
        }
        this.exitModal.style.display = 'flex';
    }

    hideExitModal() {
        this.exitModal.style.display = 'none';
    }

    confirmExit() {
        this.hideExitModal();
        this.performExit();
    }

    performExit() {
        this.disableExitWarning();
        this.saveProgress();
        this.quizPage.classList.remove('active');
        this.landingPage.classList.add('active');
        this.checkSavedProgress();
    }

    // ---- Dimension Pills ----

    getDimensionFirstQuestion(dim) {
        return questions.findIndex(q => q.dimension === dim);
    }

    isDimensionComplete(dim) {
        // A dimension is complete if all questions of that dimension have been answered
        return questions.every(q => {
            if (q.dimension !== dim) return true;
            const idx = q.id - 1;
            return this.answers[idx] && this.answers[idx] !== null;
        });
    }

    updateDimensionPills() {
        const currentDim = questions[this.currentQuestion]?.dimension;
        const pills = this.dimensionPills.querySelectorAll('.dim-pill');

        pills.forEach(pill => {
            const dim = pill.dataset.dim;
            pill.classList.remove('active', 'completed');
            pill.textContent = dim;

            if (dim === currentDim) {
                pill.classList.add('active');
            } else if (this.isDimensionComplete(dim)) {
                pill.classList.add('completed');
                pill.innerHTML = '<span style="margin-right:2px;">✓</span>' + dim;
            }
        });
    }

    // ---- Counter Animation ----

    animateCounter(direction) {
        this.progressText.classList.remove('counter-animate-up', 'counter-animate-down');
        void this.progressText.offsetWidth; // force reflow
        this.progressText.classList.add(direction > 0 ? 'counter-animate-up' : 'counter-animate-down');
    }

    // ---- Loading Skeleton ----

    showSkeleton() {
        if (this.loadingSkeleton && this.quizContentWrapper) {
            this.loadingSkeleton.style.display = '';
            this.quizContentWrapper.style.display = 'none';
        }
    }

    hideSkeleton() {
        if (this.loadingSkeleton && this.quizContentWrapper) {
            this.loadingSkeleton.style.display = 'none';
            this.quizContentWrapper.style.display = '';
        }
    }

    // ---- Quiz Flow ----

    startQuiz() {
        this.currentQuestion = 0;
        this.scores = { EI: 0, SN: 0, TF: 0, JP: 0, AC: 0, LD: 0, RC: 0, HM: 0 };
        this.answers = [];
        this.clearSavedProgress();
        this.enableExitWarning();
        this.showSkeleton();
        this.landingPage.classList.remove('active');

        setTimeout(() => {
            this.quizPage.classList.add('active');
            setTimeout(() => {
                this.hideSkeleton();
                this.showQuestion();
            }, 300);
        }, 100);
    }

    continueQuiz() {
        if (this.loadProgress()) {
            this.enableExitWarning();
            this.showSkeleton();
            this.landingPage.classList.remove('active');

            setTimeout(() => {
                this.quizPage.classList.add('active');
                setTimeout(() => {
                    this.hideSkeleton();
                    this.showQuestion(true); // true = isResuming
                }, 300);
            }, 100);
        } else {
            this.showToast('无法恢复进度，将重新开始');
            this.startQuiz();
        }
    }

    showQuestion(isResuming = false) {
        const question = questions[this.currentQuestion];
        const prevCounter = this.progressText.textContent;

        // 更新进度
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        const newCounterText = `${this.currentQuestion + 1} / ${questions.length}`;
        this.progressText.textContent = newCounterText;

        // Counter animation
        if (prevCounter && prevCounter !== newCounterText) {
            const prevNum = parseInt(prevCounter);
            const newNum = this.currentQuestion + 1;
            this.animateCounter(newNum > prevNum ? 1 : -1);
        }

        // 更新题号和题目
        this.questionNumber.textContent = `Question ${String(this.currentQuestion + 1).padStart(2, '0')}`;
        this.questionText.textContent = question.question;

        // 显示/隐藏返回按钮
        this.backBtn.style.visibility = this.currentQuestion > 0 ? 'visible' : 'hidden';

        // 更新维度进度指示器
        this.updateDimensionPills();

        // 更新选项
        this.optionsContainer.innerHTML = '';
        this.focusedOption = -1;
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.innerHTML = `
                <span class="option-key">${index + 1}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.addEventListener('click', () => this.selectOption(option, button, index));
            this.optionsContainer.appendChild(button);
        });

        // 如果是返回到这题，高亮之前选过的选项
        const existingAnswer = this.answers[this.currentQuestion];
        if (existingAnswer && existingAnswer.selectedIndex !== undefined) {
            const allOptions = this.optionsContainer.querySelectorAll('.option');
            allOptions.forEach(opt => opt.classList.add('disabled'));
            const prevBtn = allOptions[existingAnswer.selectedIndex];
            if (prevBtn) {
                prevBtn.classList.remove('disabled');
                prevBtn.classList.add('previously-selected');
            }
        }

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

    selectOption(option, buttonElement, optionIndex) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Play click sound
        this.playClickSound();

        // If we had a previous answer for this question (going back then forward), remove its score first
        const existingAnswer = this.answers[this.currentQuestion];
        if (existingAnswer && existingAnswer.selected) {
            const dim = questions[this.currentQuestion].dimension;
            this.scores[dim] -= existingAnswer.selected.score;
        }

        // Record/overwrite answer for this question
        this.answers[this.currentQuestion] = {
            questionId: questions[this.currentQuestion].id,
            selected: option,
            selectedIndex: optionIndex
        };

        // 更新分数（累加score，可以是正负）
        const dim = questions[this.currentQuestion].dimension;
        this.scores[dim] += option.score;

        // Save progress
        this.saveProgress();

        // 视觉反馈
        const allOptions = this.optionsContainer.querySelectorAll('.option');
        allOptions.forEach(opt => {
            opt.classList.remove('previously-selected', 'focused');
            opt.classList.add('disabled');
        });
        buttonElement.classList.remove('disabled');
        buttonElement.classList.add('selected');

        // 延迟后进入下一题
        setTimeout(() => {
            this.currentQuestion++;
            // If we've already answered questions ahead (went back), skip forward
            if (this.currentQuestion < questions.length) {
                this.transitionToNextQuestion();
            } else {
                this.clearSavedProgress();
                this.disableExitWarning();
                this.showResult();
            }
        }, 600);
    }

    goToPreviousQuestion() {
        if (this.isAnimating) return;
        if (this.currentQuestion <= 0) return;

        // Subtract current question's score if it was answered
        const existingAnswer = this.answers[this.currentQuestion];
        if (existingAnswer && existingAnswer.selected) {
            const dim = questions[this.currentQuestion].dimension;
            this.scores[dim] -= existingAnswer.selected.score;
        }

        // Null out the answer so it won't double-subtract when going forward again
        this.answers[this.currentQuestion] = null;

        this.currentQuestion--;
        this.saveProgress();
        this.transitionToPreviousQuestion();
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

    transitionToPreviousQuestion() {
        this.isAnimating = true;
        const elements = [this.questionNumber, this.questionText, ...this.optionsContainer.children];
        elements.forEach((el, i) => {
            el.style.transition = `all 0.3s ease ${i * 0.03}s`;
            el.style.opacity = '0';
            el.style.transform = 'translateX(20px)';
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

    // 通过欧氏距离匹配最相似角色 - 返回 top 3
    findBestMatch() {
        const userRadar = this.calculateRadarScores();
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];

        const results = [];

        Object.values(characters).forEach(char => {
            let distance = 0;
            dims.forEach((dim, i) => {
                const diff = userRadar[dim] - char.radar[i];
                distance += diff * diff;
            });
            distance = Math.sqrt(distance);

            // 匹配度：距离最大约 282.8 (8*100^2 开根)，转换为百分比
            const maxPossible = Math.sqrt(8 * 100 * 100);
            const matchPercent = Math.max(0, Math.round((1 - distance / maxPossible) * 100));

            results.push({ character: char, matchPercent, distance });
        });

        // Sort by distance (ascending)
        results.sort((a, b) => a.distance - b.distance);

        const top3 = results.slice(0, 3).map(r => ({
            character: r.character,
            matchPercent: r.matchPercent
        }));

        return {
            character: top3[0].character,
            matchPercent: top3[0].matchPercent,
            userRadar,
            top3
        };
    }

    showResult() {
        this.quizPage.classList.remove('active');
        this.resultPage.classList.add('active');

        const { character, matchPercent, userRadar, top3 } = this.findBestMatch();
        this.currentTopMatches = top3;

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

            // Top 3 相似角色
            if (this.similarSection && this.similarCards && top3.length > 1) {
                this.similarSection.style.display = '';
                this.similarCards.innerHTML = '';
                for (let i = 1; i < top3.length; i++) {
                    const match = top3[i];
                    const card = document.createElement('div');
                    card.className = 'similar-card';
                    card.innerHTML = `
                        <span class="similar-card-emoji">${match.character.emoji}</span>
                        <div class="similar-card-name">${match.character.name}</div>
                        <div class="similar-card-element">${elementIcons[match.character.element] || ''} ${match.character.element}元素 · ${match.character.title}</div>
                        <div class="similar-card-match">匹配度 <span>${match.matchPercent}%</span></div>
                    `;
                    this.similarCards.appendChild(card);
                }
            }

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
            try {
                localStorage.setItem(RESULT_KEY, JSON.stringify({
                    character: character.name,
                    matchPercent,
                    radar: userRadar,
                    date: new Date().toISOString()
                }));
            } catch (e) {}
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
            ctx.fillStyle = '#8a8478';
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
        ctx.fillStyle = '#8a8478';
        ctx.font = '11px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(charName, w - 92, 18);

        ctx.fillStyle = 'rgba(79, 195, 247, 0.8)';
        ctx.fillRect(w - 110, 28, 12, 12);
        ctx.fillStyle = '#8a8478';
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
            { el: this.similarSection, delay: 600, type: 'stagger-in' },
            { el: this.radarCanvas?.parentElement, delay: 700, type: 'stagger-in' },
            { el: this.dimensionBars, delay: 800, type: 'stagger-in' },
            { el: this.quoteBlock, delay: 900, type: 'stagger-in' },
            { el: this.playstyleBlock, delay: 1000, type: 'stagger-in' },
            { el: this.teammatesBlock, delay: 1100, type: 'stagger-in' },
            { el: this.avoidBlock, delay: 1200, type: 'stagger-in' }
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
        this.focusedOption = -1;
        this.currentTopMatches = [];

        this.clearSavedProgress();
        this.disableExitWarning();
        this.resultPage.classList.remove('active');
        this.landingPage.classList.add('active');

        // Re-check if there's any saved progress (in case user came from continue)
        this.continueBtn.style.display = 'none';
        this.clearProgressWrap.style.display = 'none';
    }

    shareResult() {
        const { character, matchPercent } = this.findBestMatch();
        const typeLabels = this.getDimensionLabels();
        const shareText = `我在原神角色人格测试中匹配到了「${character.name}」！匹配度${matchPercent}%\n${character.title}\n人格类型：${typeLabels}\n\n来测测你最像哪位原神角色吧！`;

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

    // ---- Share Image Generation ----

    generateShareImage() {
        const { character, matchPercent, userRadar, top3 } = this.currentTopMatches.length > 0
            ? { character: this.currentTopMatches[0].character, matchPercent: this.currentTopMatches[0].matchPercent, userRadar: this.calculateRadarScores(), top3: this.currentTopMatches }
            : this.findBestMatch();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const W = 750, H = 1334;
        canvas.width = W;
        canvas.height = H;

        // Dark background
        ctx.fillStyle = '#0c0c14';
        ctx.fillRect(0, 0, W, H);

        // Background gradient
        const grad = ctx.createRadialGradient(W / 2, H * 0.25, 0, W / 2, H * 0.25, W * 0.6);
        grad.addColorStop(0, 'rgba(212, 168, 67, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Border decoration
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, W - 60, H - 60);

        // Corner decorations
        const corners = [
            [30, 30], [W - 46, 30], [30, H - 46], [W - 46, H - 46]
        ];
        corners.forEach(([x, y]) => {
            ctx.fillStyle = 'rgba(212, 168, 67, 0.4)';
            ctx.fillRect(x, y, 16, 16);
        });

        // Title
        ctx.fillStyle = '#d4a843';
        ctx.font = '600 36px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.fillText('原神角色人格测试', W / 2, 90);

        // Subtitle
        ctx.fillStyle = '#8a8478';
        ctx.font = '18px "Noto Sans SC", sans-serif';
        ctx.fillText('发现你最像哪位提瓦特大陆的伙伴', W / 2, 130);

        // Decorative line
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W * 0.25, 155);
        ctx.lineTo(W * 0.75, 155);
        ctx.stroke();

        // Center ornament
        ctx.fillStyle = '#d4a843';
        ctx.font = '16px sans-serif';
        ctx.fillText('✦', W / 2, 160);

        // Character emoji (large)
        ctx.font = '100px sans-serif';
        ctx.fillText(character.emoji, W / 2, 290);

        // Character name
        ctx.fillStyle = '#f0d78c';
        ctx.font = '700 48px "Noto Serif SC", serif';
        ctx.fillText(character.name, W / 2, 360);

        // Character title
        ctx.fillStyle = '#8a8478';
        ctx.font = '22px "Noto Sans SC", sans-serif';
        ctx.fillText(character.title, W / 2, 400);

        // Match percentage
        ctx.fillStyle = '#d4a843';
        ctx.font = '600 32px "Noto Sans SC", sans-serif';
        ctx.fillText(`匹配度 ${matchPercent}%`, W / 2, 455);

        // Personality type
        const typeLabels = this.getDimensionLabels();
        ctx.fillStyle = 'rgba(212, 168, 67, 0.15)';
        const typeWidth = ctx.measureText(typeLabels).width + 40;
        const typeX = W / 2 - typeWidth / 2;
        ctx.beginPath();
        ctx.roundRect(typeX, 475, typeWidth, 36, 18);
        ctx.fill();
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#d4a843';
        ctx.font = '600 18px "Noto Sans SC", sans-serif';
        ctx.fillText(typeLabels, W / 2, 499);

        // Mini radar chart
        this.drawMiniRadar(ctx, userRadar, W / 2, 640, 140);

        // Dimension bars summary
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];
        const dimLabels = ['外向', '实感', '思考', '判断', '冒险', '光明', '规则', '热情'];
        const dimColors = ['#ff7043', '#4fc3f7', '#7fb069', '#d4a843', '#ba68c8', '#90caf9', '#a5d6a7', '#e0a0ff'];

        ctx.textAlign = 'left';
        ctx.font = '15px "Noto Sans SC", sans-serif';
        dims.forEach((dim, i) => {
            const y = 830 + i * 40;
            const val = userRadar[dim];

            // Label
            ctx.fillStyle = '#8a8478';
            ctx.textAlign = 'right';
            ctx.fillText(dimLabels[i], 190, y);

            // Bar track
            ctx.fillStyle = 'rgba(255,255,255,0.04)';
            ctx.beginPath();
            ctx.roundRect(210, y - 14, 330, 16, 4);
            ctx.fill();

            // Bar fill
            ctx.fillStyle = dimColors[i];
            ctx.beginPath();
            ctx.roundRect(210, y - 14, 330 * val / 100, 16, 4);
            ctx.fill();

            // Percentage
            ctx.fillStyle = '#f0e6d2';
            ctx.textAlign = 'left';
            ctx.fillText(`${val}%`, 550, y);
        });

        // Footer
        ctx.textAlign = 'center';
        ctx.fillStyle = '#5a5548';
        ctx.font = '14px "Noto Sans SC", sans-serif';
        ctx.fillText('原神角色人格测试 · 8维度64题 · 32位角色', W / 2, H - 60);

        // Decorative line at bottom
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(W * 0.3, H - 85);
        ctx.lineTo(W * 0.7, H - 85);
        ctx.stroke();
        ctx.fillStyle = '#d4a843';
        ctx.font = '14px sans-serif';
        ctx.fillText('✦', W / 2, H - 82);

        // Store the image data
        this._shareImageData = canvas.toDataURL('image/png');

        // Show preview in modal
        const previewContainer = document.getElementById('share-image-preview');
        const img = new Image();
        img.src = this._shareImageData;
        img.style.width = '100%';
        img.style.height = 'auto';
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);

        this.shareImageModal.style.display = 'flex';
    }

    drawMiniRadar(ctx, radar, cx, cy, radius) {
        const dims = ['EI', 'SN', 'TF', 'JP', 'AC', 'LD', 'RC', 'HM'];

        // Grid
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath();
            const r = (radius / 4) * i;
            for (let j = 0; j < 8; j++) {
                const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = i === 4 ? 'rgba(212, 168, 67, 0.2)' : 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Axes
        for (let j = 0; j < 8; j++) {
            const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
            ctx.stroke();
        }

        // User data polygon
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
            const r = (radar[dims[i]] / 100) * radius;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(79, 195, 247, 0.15)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(79, 195, 247, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
            const r = (radar[dims[i]] / 100) * radius;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(79, 195, 247, 0.8)';
            ctx.fill();
        }

        // Labels
        const dimLabels = ['外向', '实感', '思考', '判断', '冒险', '光明', '规则', '热情'];
        ctx.fillStyle = '#8a8478';
        ctx.font = '12px "Noto Sans SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let j = 0; j < 8; j++) {
            const angle = (Math.PI * 2 / 8) * j - Math.PI / 2;
            const lr = radius + 18;
            ctx.fillText(dimLabels[j], cx + Math.cos(angle) * lr, cy + Math.sin(angle) * lr);
        }
    }

    downloadShareImage() {
        if (!this._shareImageData) return;
        const link = document.createElement('a');
        link.download = '原神人格测试结果.png';
        link.href = this._shareImageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.shareImageModal.style.display = 'none';
        this.showToast('分享图已保存！');
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
