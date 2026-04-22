const checklistData = [
    //IT Setup
    {
        id: 1,
        category: 'IT Setup',
        description: 'Collect laptop from IT department',
        completed: false
    },
    {
        id: 2,
        category: 'IT Setup',
        description: 'Set up email acount and calendar',
        completed: false
    },
    {
        id: 3,
        category: 'IT Setup',
        description: 'Install required software (IDE, Slack, VPN)',
        completed: false
    },
    {
        id: 4,
        category: 'IT Setup',
        description: 'Configure two-factor authentication',
        completed: false
    },
    {
        id: 5,
        category: 'IT Setup',
        description: 'Connect to office Wi-Fi and printer',
        completed: false
    },
    //HR Paperwork
    {
        id: 6,
        category: 'HR Paperwork',
        description: 'Submit signed employment contract',
        completed: false
    },
    {
        id: 7,
        category: 'HR Paperwork',
        description: 'Complete tax forms (P46 / W-4)',
        completed: false
    },
    {
        id: 8,
        category: 'HR Paperwork',
        description: 'Provide bank details for payroll',
        completed: false
    },
    {
        id: 9,
        category: 'HR Paperwork',
        description: 'Review employee handbook and sign acknowledgement',
        completed: false
    },
    {
        id: 10,
        category: 'HR Paperwork',
        description: 'Upload profile photo for company directive',
        completed: false
    },
    //Team Introductions
    {
        id: 11,
        category: 'Team Introductions',
        description: 'Meet your direct manager for 1:1 welcome chat',
        completed: false
    },
    {
        id: 12,
        category: 'Team Introductions',
        description: 'Attend team standup meeting',
        completed: false
    },
    {
        id: 13,
        category: 'Team Introductions',
        description: 'Have lunch with your assigned onboarding buddy',
        completed: false
    },
    {
        id: 14,
        category: 'Team Introductions',
        description: 'Introduce yourself in the #new-joiners Slack channel',
        completed: false
    },
    {
        id: 15,
        category: 'Team Introductions',
        description: 'Schedule meet-and-greet with cross-functional team leads',
        completed: false
    }
]

// ============================================
// DOM REFERENCES — Grab elements once, reuse everywhere
// ============================================

const checklistContainer = document.getElementById('checklist-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const filterSelect = document.getElementById('filter-select');
const resetBtn = document.getElementById('reset-btn');

// ============================================
// RENDER — Build the checklist UI from data
// ============================================

function renderTasks(filter = 'all') {
    checklistContainer.innerHTML = '';

    let tasksToShow;

    if (filter === 'complete') {
        tasksToShow = checklistData.filter(task => task.completed === true);
    } else if (filter === 'incomplete') {
        tasksToShow = checklistData.filter(task => task.completed === false)
    } else {
        tasksToShow = checklistData
    }

    const categories = [];
    for (const task of tasksToShow) {
        if (!categories.includes(task.category)) {
            categories.push(task.category);
        }
    }

    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');

        const allCategoryTasks = checklistData.filter(task => task.category === category);
        const completedIncategory = allCategoryTasks.filter(task => task.completed).length;
        categoryTitle.textContent = `${category} (${completedIncategory}/${allCategoryTasks.length})`;
        categoryDiv.appendChild(categoryTitle);

        const categoryTasks = tasksToShow.filter(task => task.category === category);

        // Create each task item
        for (const task of categoryTasks) {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            //Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.completed;
            checkbox.id = `task-${task.id}`;
            checkbox.setAttribute('aria-label', task.description);

            //Create a label
            const label = document.createElement('label');
            label.classList.add('task-label');
            label.setAttribute('for', `task-${task.id}`);
            label.textContent = task.description;

            //Toggling event listener
            checkbox.addEventListener('change', function () {
                toggleTask(task.id);
            });

            //Assemble the task item
            taskItem.appendChild(checkbox);
            taskItem.appendChild(label);
            categoryDiv.appendChild(taskItem);
        }

        //Add category to the container
        checklistContainer.appendChild(categoryDiv);
    }

    if (tasksToShow.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-state');
        emptyMessage.textContent =
            filter === 'complete' ? 'No tasks completed yet. Get started!'
                : filter === 'incomplete' ? 'All tasks complete - well done!'
                    : 'No tasks available.';
        checklistContainer.appendChild(emptyMessage);
    }

    updateProgress();
}

// ============================================
// TOGGLE — Change a task's completed state
// ============================================

function toggleTask(taskId) {
    const task = checklistData.find(task => task.id === taskId);

    if (task) {
        task.completed = !task.completed;

        saveTolocalStorage();

        renderTasks(filterSelect.value)
    }
}

// ============================================
// PROGRESS — Calculate and display completion
// ============================================

function updateProgress() {
    const totalTasks = checklistData.length;
    const completedTasks = checklistData.filter(task => task.completed).length;
    const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    //Update the text displays
    progressText.textContent = `${completedTasks} of ${totalTasks} tasks complete`;
    progressPercent.textContent = `${percent}%`;
    progressBarFill.style.width = `${percent}%`;

    // Change progress bar colour based on completion percentage
    if (percent === 100) {
        progressBarFill.style.background = 'linear-gradient(90deg, #2196f3, #1565c0)';
    } else if (percent >= 60) {
        progressBarFill.style.background = 'linear-gradient(90deg, #4caf50, #2e7d32)';
    } else if (percent >= 30) {
        progressBarFill.style.background = 'linear-gradient(90deg, #ff9800, #e65100)';
    } else {
        progressBarFill.style.background = 'linear-gradient(90deg, #f44336, #c62828)'
    }

    // Show celebration when all tasks are complete
    const existingCelebration = document.querySelector('.celebration');
    if (existingCelebration) {
        existingCelebration.remove();
    }

    if (percent === 100) {
        const celebration = document.createElement('div');
        celebration.classList.add('celebration');
        celebration.setAttribute('role', 'alert');
        celebration.textContent = 'Onboarding complete! You are all set for your new role.';

        // Insert after the progress section
        const progressSection = document.querySelector('.progress-section');
        progressSection.insertAdjacentElement('afterend', celebration);
    }

    const progressBar = progressBarFill.parentElement;
    progressBar.setAttribute('aria-valuenow', percent);
    progressBar.setAttribute('aria-valuetext', `${completedTasks} of ${totalTasks} tasks comlete, ${percent} percent`);


}

// ============================================
// EVENT LISTENERS — Wire up controls
// ============================================

filterSelect.addEventListener('change', function () {
    renderTasks(filterSelect.value);
});

resetBtn.addEventListener('click', function () {
    const confirmReset = confirm('Are you sure you want to reset all tasks?');

    if (confirmReset) {
        checklistData.forEach(function (task) {
            task.completed = false;
        });

        filterSelect.value = 'all';
        saveTolocalStorage();
        renderTasks('all');
    }
});

// ============================================
// PERSISTENCE — Save and load from localStorage
// ============================================

function saveTolocalStorage() {
    const saveData = checklistData.map(function (task) {
        return {
            id: task.id,
            completed: task.completed
        }
    });

    localStorage.setItem('onboarding-checklist', JSON.stringify(saveData));
}

function loadFromlocalStorage() {
    const saved = localStorage.getItem('onboarding-checklist');

    if (saved) {
        const saveData = JSON.parse(saved);

        saveData.forEach(function (savedTask) {
            const task = checklistData.find(function (t) {
                return t.id === savedTask.id;
            });

            if (task) {
                task.completed = savedTask.completed;
            }
        });
    }
}

// ============================================
// INITIALISE — Start the app
// ============================================

loadFromlocalStorage();
renderTasks('all');



