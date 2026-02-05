    function loadItems() {
        const list = document.getElementById('reminderList');
        list.innerHTML = '';
        let data = JSON.parse(localStorage.getItem(`data_${currentUser}`) || "[]");
        const now = new Date().getTime();

        // Sort data: Soonest dates first
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        data.forEach((item, i) => {
            const li = document.createElement('li');
            let statusHtml = "";
            let buttonHtml = "";
            let diffDays = 0;

            if (item.doneDate) {
                li.className = 'locked';
                const waitPeriod = 30 * 24 * 60 * 60 * 1000; 
                const timePassed = now - item.doneDate;
                diffDays = Math.ceil((waitPeriod - timePassed) / (1000 * 60 * 60 * 24));
                
                statusHtml = diffDays > 0 ? `<span class="countdown">Delete in ${diffDays}d</span>` : `<span class="countdown" style="color:green">Ready</span>`;
                buttonHtml = `<button class="delete-btn" onclick="deleteItem(${i}, ${diffDays})">Delete</button>`;
            } else {
                buttonHtml = `<button class="done-btn" onclick="markDone(${i})">Done</button>`;
            }

            li.innerHTML = `
                <div class="item-header">
                    <div><strong>${item.task}</strong><br><small>Due: ${item.date}</small></div>
                    ${statusHtml}
                </div>
                <div class="controls">
                    ${buttonHtml}
                </div>
            `;
            list.appendChild(li);
        });
    }
