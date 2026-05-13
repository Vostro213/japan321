
// ===============================
// Taxes Management
// ===============================
let taxRecords = JSON.parse(localStorage.getItem('taxRecords')) || [
    { date: '2024-06-01', description: 'ضريبة الدخل - يونيو', type: 'دخل', amount: 5000 },
    { date: '2024-06-05', description: 'ضريبة القيمة المضافة - يونيو', type: 'قيمة', amount: 8500 }
];

function showTaxesModal() {
    document.getElementById('taxesModal').style.display = 'block';
    loadTaxRecords();
}

function closeTaxesModal() {
    document.getElementById('taxesModal').style.display = 'none';
    clearTaxForm();
}

function clearTaxForm() {
    document.getElementById('tax-description').value = '';
    document.getElementById('tax-date').value = '';
    document.getElementById('tax-amount').value = '';
    document.getElementById('tax-type').value = 'دخل';
}

function addTaxRecord() {
    const description = document.getElementById('tax-description').value.trim();
    const date = document.getElementById('tax-date').value;
    const amount = parseFloat(document.getElementById('tax-amount').value);
    const type = document.getElementById('tax-type').value;

    if (!description || !date || isNaN(amount) || amount <= 0) {
        alert('يرجى ملء جميع الحقول بشكل صحيح');
        return;
    }

    taxRecords.push({ date, description, type, amount });
    localStorage.setItem('taxRecords', JSON.stringify(taxRecords));
    loadTaxRecords();
    clearTaxForm();
    alert('تم إضافة العملية الضريبية بنجاح');
}

function loadTaxRecords() {
    const tbody = document.getElementById('tax-records-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    let totalTaxes = 0;
    taxRecords.forEach((record, index) => {
        totalTaxes += record.amount;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.description}</td>
            <td>${record.type}</td>
            <td>${record.amount.toFixed(2)} دج</td>
            <td>
                <button class="delete-btn" onclick="deleteTaxRecord(${index})" style="padding: 5px 10px; border: none; border-radius: 5px; background: #ff6b6b; color: white; cursor: pointer;">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('total-taxes').textContent = totalTaxes.toFixed(2);
}

function deleteTaxRecord(index) {
    if (confirm('هل أنت متأكد من حذف هذه العملية الضريبية؟')) {
        taxRecords.splice(index, 1);
        localStorage.setItem('taxRecords', JSON.stringify(taxRecords));
        loadTaxRecords();
    }
}

// ===============================
// Profit & Loss Management
// ===============================
let incomeItems = JSON.parse(localStorage.getItem('incomeItems')) || [
    { description: 'المبيعات', amount: 50000 },
    { description: 'الخدمات', amount: 25000 },
    { description: 'الفوائد', amount: 5000 }
];

let expenseItems = JSON.parse(localStorage.getItem('expenseItems')) || [
    { description: 'الرواتب', amount: 30000 },
    { description: 'الإيجار', amount: 10000 },
    { description: 'المواد الخام', amount: 15000 },
    { description: 'الكهرباء والماء', amount: 3000 }
];

function showProfitLossModal() {
    document.getElementById('profitLossModal').style.display = 'block';
    loadProfitLossData();
}

function closeProfitLossModal() {
    document.getElementById('profitLossModal').style.display = 'none';
    clearProfitLossForm();
}

function clearProfitLossForm() {
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
}

function addIncomeItem() {
    const description = document.getElementById('income-description').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('يرجى ملء بيانات الدخل بشكل صحيح');
        return;
    }

    incomeItems.push({ description, amount });
    localStorage.setItem('incomeItems', JSON.stringify(incomeItems));
    document.getElementById('income-description').value = '';
    document.getElementById('income-amount').value = '';
    loadProfitLossData();
    alert('تم إضافة بند الدخل بنجاح');
}

function addExpenseItem() {
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('يرجى ملء بيانات المصروفات بشكل صحيح');
        return;
    }

    expenseItems.push({ description, amount });
    localStorage.setItem('expenseItems', JSON.stringify(expenseItems));
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    loadProfitLossData();
    alert('تم إضافة بند المصروفات بنجاح');
}

function loadProfitLossData() {
    loadIncomeTable();
    loadExpensesTable();
    calculateProfitLoss();
}

function loadIncomeTable() {
    const tbody = document.getElementById('income-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    incomeItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.amount.toFixed(2)} دج</td>
            <td>
                <button class="delete-btn" onclick="deleteIncomeItem(${index})" style="padding: 5px 10px; border: none; border-radius: 5px; background: #ff6b6b; color: white; cursor: pointer;">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadExpensesTable() {
    const tbody = document.getElementById('expenses-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    expenseItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.amount.toFixed(2)} دج</td>
            <td>
                <button class="delete-btn" onclick="deleteExpenseItem(${index})" style="padding: 5px 10px; border: none; border-radius: 5px; background: #ff6b6b; color: white; cursor: pointer;">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function calculateProfitLoss() {
    const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenseItems.reduce((sum, item) => sum + item.amount, 0);
    const netResult = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    
    const resultElement = document.getElementById('net-result');
    resultElement.textContent = netResult.toFixed(2);
    
    // تغيير اللون بناءً على الربح أو الخسارة
    if (netResult >= 0) {
        resultElement.style.color = '#4CAF50'; // أخضر للأرباح
    } else {
        resultElement.style.color = '#f44336'; // أحمر للخسائر
    }
}

function deleteIncomeItem(index) {
    if (confirm('هل أنت متأكد من حذف هذا البند؟')) {
        incomeItems.splice(index, 1);
        localStorage.setItem('incomeItems', JSON.stringify(incomeItems));
        loadProfitLossData();
    }
}

function deleteExpenseItem(index) {
    if (confirm('هل أنت متأكد من حذف هذا البند؟')) {
        expenseItems.splice(index, 1);
        localStorage.setItem('expenseItems', JSON.stringify(expenseItems));
        loadProfitLossData();
    }
}

// Load on page load
if (window.location.pathname.includes('accounting.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        loadInvoices();
    });
}

// Close modals when clicking outside
window.onclick = function(event) {
    const taxesModal = document.getElementById('taxesModal');
    const profitLossModal = document.getElementById('profitLossModal');
    if (event.target === taxesModal) taxesModal.style.display = 'none';
    if (event.target === profitLossModal) profitLossModal.style.display = 'none';
}
