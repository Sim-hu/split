function calculateRequiredExp(level) {
    return Math.floor(Math.pow(level, 4) / 40) + 2 * level;
}

function calculateTotalExpToLevel(startLevel, startExpPercentage, endLevel, endExpPercentage) {
    let total = 0;
    for (let i = startLevel; i < endLevel; i++) {
        total += calculateRequiredExp(i);
    }
    total -= calculateRequiredExp(startLevel) * (startExpPercentage / 100);
    total += calculateRequiredExp(endLevel) * (endExpPercentage / 100);
    return total;
}

function calculateLevelAndPercentage(baseLevel, baseExpPercentage, addedExp) {
    let totalExp = calculateTotalExpToLevel(1, 0, baseLevel, baseExpPercentage) + addedExp;
    let level = 1;
    while (calculateTotalExpToLevel(1, 0, level + 1, 0) <= totalExp) {
        level++;
    }
    const currentLevelExp = calculateTotalExpToLevel(1, 0, level, 0);
    const nextLevelExp = calculateTotalExpToLevel(1, 0, level + 1, 0);
    const expPercentage = ((totalExp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return { level, expPercentage };
}

function calculateDiary(button) {
    const diaryEntry = button.closest('.diary-entry');
    const currentLevel = parseInt(diaryEntry.querySelector('.currentLevel').value);
    const currentExpPercentage = parseFloat(diaryEntry.querySelector('.currentExpPercentage').value);
    const targetLevel = parseInt(diaryEntry.querySelector('.targetLevel').value);
    const targetExpPercentage = parseFloat(diaryEntry.querySelector('.targetExpPercentage').value);
    const storyStart = parseInt(diaryEntry.querySelector('.storyStart').value);
    const storyEnd = parseInt(diaryEntry.querySelector('.storyEnd').value);
    const skip77 = diaryEntry.querySelector('.skip77').checked;

    const requiredExp = calculateTotalExpToLevel(currentLevel, currentExpPercentage, targetLevel, targetExpPercentage);

    let storyExp = 0;
    for (let i = storyStart; i <= storyEnd; i++) {
        if (i !== CHAPTER_77_INDEX || (i === CHAPTER_77_INDEX && !skip77)) {
            storyExp += stories[i].exp;
        }
    }

    const newLevelInfo = calculateLevelAndPercentage(currentLevel, currentExpPercentage, storyExp);

    let resultHTML = `
        <p>目標レベルに必要な経験値: ${formatNumber(Math.round(requiredExp))}</p>
        <p>ストーリー経験値: ${formatNumber(Math.round(storyExp))} (${Math.round(storyExp / requiredExp * 100)}%)</p>
        <p>完遂後レベル: ${newLevelInfo.level} (${newLevelInfo.expPercentage.toFixed(2)}%)</p>
    `;

    if (storyExp >= requiredExp) {
        resultHTML += `<p>目標達成！ 余剰経験値: ${formatNumber(Math.round(storyExp - requiredExp))}</p>`;
    } else {
        resultHTML += `<p>目標未達成。あと${formatNumber(Math.round(requiredExp - storyExp))}の経験値が必要です。</p>`;
    }

    diaryEntry.querySelector('.diaryResult').innerHTML = resultHTML;

    const nextDiaryEntry = diaryEntry.nextElementSibling;
    if (nextDiaryEntry && nextDiaryEntry.classList.contains('diary-entry')) {
        nextDiaryEntry.querySelector('.currentLevel').value = newLevelInfo.level;
        nextDiaryEntry.querySelector('.currentExpPercentage').value = newLevelInfo.expPercentage.toFixed(2);
    }

    return newLevelInfo;
}

function addDiaryEntry() {
    const diaryEntries = document.getElementById('diaryEntries');
    const newEntry = diaryEntries.children[0].cloneNode(true);
    newEntry.querySelector('h3').textContent = `日記 ${diaryEntries.children.length + 1}`;
    
    const prevEntry = diaryEntries.children[diaryEntries.children.length - 1];
    const prevLevelInfo = calculateDiary(prevEntry.querySelector('button'));
    
    newEntry.querySelector('.currentLevel').value = prevLevelInfo.level;
    newEntry.querySelector('.currentExpPercentage').value = prevLevelInfo.expPercentage.toFixed(2);
    
    const storyStartSelect = newEntry.querySelector('.storyStart');
    const storyEndSelect = newEntry.querySelector('.storyEnd');
    
    populateStoryOptions(storyStartSelect);
    populateStoryOptions(storyEndSelect);
    
    storyStartSelect.value = CHAPTER_78_INDEX;
    storyEndSelect.value = stories.length - 1;
    
    diaryEntries.appendChild(newEntry);
    updateSkip77Option(newEntry);
}

function populateStoryOptions(select) {
    select.innerHTML = '';
    let chapterEpisodeCount = {};
    stories.forEach((story, index) => {
        if (!chapterEpisodeCount[story.chapter]) {
            chapterEpisodeCount[story.chapter] = 1;
        }
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${story.chapter}章-${chapterEpisodeCount[story.chapter]}(${index + 1}話) ${story.title}`;
        select.appendChild(option);
        chapterEpisodeCount[story.chapter]++;
    });
    select.addEventListener('change', function() {
        updateSkip77Option(this.closest('.diary-entry'));
    });
}

function updateSkip77Option(diaryEntry) {
    const storyStart = parseInt(diaryEntry.querySelector('.storyStart').value);
    const storyEnd = parseInt(diaryEntry.querySelector('.storyEnd').value);
    const skip77Option = diaryEntry.querySelector('.skip77Option');
    
    if (storyStart <= CHAPTER_77_INDEX && storyEnd >= CHAPTER_77_INDEX) {
        skip77Option.classList.remove('hidden');
    } else {
        skip77Option.classList.add('hidden');
    }
}

function initializeDiaryEntry() {
    const initialDiaryEntry = document.querySelector('.diary-entry');
    initialDiaryEntry.querySelector('.currentLevel').value = 250;
    initialDiaryEntry.querySelector('.currentExpPercentage').value = 0;
    initialDiaryEntry.querySelector('.targetLevel').value = 300;
    initialDiaryEntry.querySelector('.targetExpPercentage').value = 0;
    
    const storyStartSelect = initialDiaryEntry.querySelector('.storyStart');
    const storyEndSelect = initialDiaryEntry.querySelector('.storyEnd');
    
    populateStoryOptions(storyStartSelect);
    populateStoryOptions(storyEndSelect);
    
    storyStartSelect.value = CHAPTER_78_INDEX;
    storyEndSelect.value = stories.length - 1;
    
    updateSkip77Option(initialDiaryEntry);
}
