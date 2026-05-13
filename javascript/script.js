// ===============================
// Login & Show Password
// ===============================
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passError = document.getElementById("passError");
    emailError.innerText = "";
    passError.innerText = "";

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email) { emailError.innerText = "يرجى إدخال البريد الإلكتروني"; return; }
    if (!emailPattern.test(email)) { emailError.innerText = "البريد الإلكتروني غير صحيح"; return; }
    if (!password) { passError.innerText = "يرجى إدخال كلمة المرور"; return; }
    if (password.length < 4) { passError.innerText = "كلمة المرور ضعيفة"; return; }

    alert("تم تسجيل الدخول بنجاح");
    smoothNavigate("dashboard.html");
}

// ===============================
// Dark Mode Toggle
// ===============================
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// حفظ الوضع عند إعادة تحميل الصفحة
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// ===============================
// Dashboard Navigation
// ===============================
function goToDashboard() { smoothNavigate("dashboard.html"); }
function goToAccounting() { smoothNavigate("accounting.html"); }
function goToSuppliers() { smoothNavigate("suppliers.html"); }
function goToLegal() { smoothNavigate("legal.html"); }
function goToSupport() { smoothNavigate("support.html"); }
function goToAnalysis() { smoothNavigate("analysis.html"); }

// ===============================
// Services Navigation
// ===============================
function openService(serviceName) {
    const pages = {
        accounting: "accounting.html",
        suppliers: "suppliers.html",
        legal: "legal.html",
        support: "support.html",
        market: "service.html?service=market",
        project: "service.html?service=project",
        finance: "service.html?service=finance",
        stats: "service.html?service=stats",
        balance: "service.html?service=balance"
    };
    smoothNavigate(pages[serviceName] || "service.html");
}

// ===============================
// Services Page Dynamic Content
// ===============================
if (window.location.pathname.includes("service.html")) {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const title = document.getElementById("serviceTitle");
    const desc = document.getElementById("serviceDescription");

    const content = {
        accounting: ["الملف المحاسبي", "فتح الملف المحاسبي، متابعة الحسابات، إدارة الفواتير والمعاملات المالية للشركة."],
        suppliers: ["نافذة الموردين", "نافذة للتواصل مع الموردين والشركات في المجالات الاقتصادية، الفلاحية، والاستشفائية."],
        legal: ["الملحق القانوني", "ملحق قانوني لجميع التساؤلات حول الحالات الاقتصادية والقانونية."],
        support: ["مركز الاستشارات", "تضم هذه النافذة متخصصين ومستشارين اقتصاديين وقانونيين لتقديم الدعم والمشورة."],
        market: ["دراسة السوق", "تحليل السوق، العرض والطلب والمنافسين لتحديد الفرص الاستثمارية."],
        project: ["إدارة المشاريع", "تنظيم المشاريع، توزيع المهام، التخطيط لتحقيق أهداف المشروع بنجاح."],
        finance: ["التحليل المالي", "تحليل الأرباح والخسائر والتكاليف لتقييم الأداء المالي للمشاريع."],
        stats: ["الإحصائيات", "عرض البيانات والأرقام لتحليل القرارات الاقتصادية بدقة."],
        balance: ["ميزان المراجعة", "عرض المجاميع والأرصدة أونلاين لمتابعة الأصول والخصوم وحساب النتائج."]
    };

    if (content[service]) {
        title.innerText = content[service][0];
        desc.innerText = content[service][1];
    } else {
        title.innerText = "الخدمات الاقتصادية";
        desc.innerText = "اختر خدمة لعرض التفاصيل.";
    }
}

// ===============================
// Alerts Toggle
// ===============================
function showAlerts() {
    const alertsBox = document.getElementById("alertsBox");
    if (alertsBox) alertsBox.classList.toggle("hidden");
}

// ===============================
// Profile Menu
// ===============================
function toggleProfileMenu() {
    const menu = document.getElementById("profileMenu");
    menu.classList.toggle("hidden");
}

function logout() {
    alert("تم تسجيل الخروج");
    smoothNavigate("index.html");
}

// اغلاق قائمة البروفايل عند الضغط خارجها
document.addEventListener("click", function(e) {
    const profile = document.querySelector(".user-profile");
    const menu = document.getElementById("profileMenu");
    if (menu && !profile.contains(e.target)) menu.classList.add("hidden");
});

// ===============================
// Sidebar Active Item
// ===============================
document.querySelectorAll(".sidebar-menu li").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
    });
});

// ===============================
// Smooth Page Navigation
// ===============================
function smoothNavigate(url) {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = 0;
    setTimeout(() => window.location.href = url, 300);
}

window.addEventListener('DOMContentLoaded', () => document.body.style.opacity = 1);
// ===============================
// Show Password
// ===============================


// ===============================
// Animated Text (English/Arabic)
// ===============================
const texts = ["Economic Mediator", "الوسيط الاقتصادي"];
let index = 0;
const textEl = document.getElementById("textAnimation");

function animateText() {
    textEl.style.opacity = 0;
    setTimeout(() => {
        textEl.innerText = texts[index];
        textEl.style.opacity = 1;
        index = (index + 1) % texts.length;
    }, 500);
}

setInterval(animateText, 2500);
// ===============================
// Invoices Management
// ===============================
let invoices = JSON.parse(localStorage.getItem('invoices')) || [
    { id: 1, client: 'شركة النور', amount: 15000, date: '2024-06-10', status: 'مدفوعة' },
    { id: 2, client: 'مؤسسة السلام', amount: 22000, date: '2024-06-12', status: 'قيد الانتظار' }
];

function loadInvoices() {
    const tbody = document.getElementById('invoice-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id.toString().padStart(3,'0')}</td>
            <td>${invoice.client}</td>
            <td>${invoice.amount} دج</td>
            <td>${invoice.date}</td>
            <td><span class="status ${invoice.status === 'مدفوعة' ? 'paid' : 'pending'}">${invoice.status}</span></td>
            <td>
                <button class="edit-btn" onclick="editInvoice(${invoice.id})">تحرير</button>
                <button class="delete-btn" onclick="deleteInvoice(${invoice.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddInvoiceForm() {
    document.getElementById('add-invoice-form').style.display = 'block';
}

function hideAddInvoiceForm() {
    document.getElementById('add-invoice-form').style.display = 'none';
    document.getElementById('invoice-client').value = '';
    document.getElementById('invoice-amount').value = '';
    document.getElementById('invoice-date').value = '';
    document.getElementById('invoice-status').value = 'مدفوعة';
}

function addInvoice() {
    const client = document.getElementById('invoice-client').value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount').value);
    const date = document.getElementById('invoice-date').value;
    const status = document.getElementById('invoice-status').value;

    if (!client || isNaN(amount) || !date) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    const newInvoice = { id: newId, client, amount, date, status };
    invoices.push(newInvoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    loadInvoices();
    hideAddInvoiceForm();
    alert('تم إضافة الفاتورة بنجاح');
}

function editInvoice(id) {
    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
        document.getElementById('invoice-client').value = invoice.client;
        document.getElementById('invoice-amount').value = invoice.amount;
        document.getElementById('invoice-date').value = invoice.date;
        document.getElementById('invoice-status').value = invoice.status;
        showAddInvoiceForm();
        // Change button to update
        const addBtn = document.querySelector('#add-invoice-form button:first-of-type');
        addBtn.textContent = 'تحديث';
        addBtn.onclick = () => updateInvoice(id);
    }
}

function updateInvoice(id) {
    const client = document.getElementById('invoice-client').value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount').value);
    const date = document.getElementById('invoice-date').value;
    const status = document.getElementById('invoice-status').value;

    if (!client || isNaN(amount) || !date) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
        invoice.client = client;
        invoice.amount = amount;
        invoice.date = date;
        invoice.status = status;
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
        hideAddInvoiceForm();
        // Reset button
        const addBtn = document.querySelector('#add-invoice-form button:first-of-type');
        addBtn.textContent = 'إضافة';
        addBtn.onclick = addInvoice;
        alert('تم تحديث الفاتورة بنجاح');
    }
}

function deleteInvoice(id) {
    if (confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
        invoices = invoices.filter(i => i.id !== id);
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
    }
}

function filterInvoices() {
    const query = document.getElementById('invoice-search').value.toLowerCase();
    const statusFilter = document.getElementById('invoice-status-filter').value;
    const tbody = document.getElementById('invoice-body');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.cells[4].textContent;
        const matchesQuery = text.includes(query);
        const matchesStatus = !statusFilter || status === statusFilter;
        row.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });
}

function exportInvoicesToCSV() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "رقم الفاتورة,العميل,المبلغ,التاريخ,الحالة\n"
        + invoices.map(i => `${i.id},"${i.client}",${i.amount},"${i.date}","${i.status}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load invoices on page load
if (window.location.pathname.includes('accounting.html')) {
    document.addEventListener('DOMContentLoaded', loadInvoices);
}

// Load legal content on page load
if (window.location.pathname.includes('legal.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        updateBadge();
    });
}

// ===============================
// Suppliers Management
// ===============================
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [
    { id: 1, name: 'شركة الإخلاص', phone: '0550123456', product: 'مواد غذائية', status: 'نشط', location: 'تلمسان - الجزائر' },
    { id: 2, name: 'مؤسسة النور', phone: '0660558899', product: 'معدات', status: 'غير نشط', location: 'وهران - الجزائر' }
];

function loadSuppliers() {
    const tbody = document.querySelector('.suppliers-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.id.toString().padStart(2,'0')}</td>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.product}</td>
            <td class="${supplier.status === 'نشط' ? 'paid' : 'pending'}">${supplier.status}</td>
            <td>
                <button class="edit-btn" onclick="editSupplier(${supplier.id})">تحرير</button>
                <button class="delete-btn" onclick="deleteSupplier(${supplier.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update example card if suppliers exist
    if (suppliers.length > 0) {
        const latest = suppliers[suppliers.length - 1];
        document.getElementById('card-name').textContent = latest.name;
        document.getElementById('card-phone').textContent = latest.phone;
        document.getElementById('card-product').textContent = latest.product;
        document.getElementById('card-location').textContent = latest.location;
        document.getElementById('supplier-card').style.display = 'flex';
    } else {
        document.getElementById('supplier-card').style.display = 'none';
    }
}

function showAddSupplierForm() {
    document.getElementById('add-supplier-form').style.display = 'block';
}

function hideAddSupplierForm() {
    document.getElementById('add-supplier-form').style.display = 'none';
    document.getElementById('supplier-name').value = '';
    document.getElementById('supplier-phone').value = '';
    document.getElementById('supplier-product').value = '';
    document.getElementById('supplier-location').value = '';
}

function addSupplier() {
    const name = document.getElementById('supplier-name').value.trim();
    const phone = document.getElementById('supplier-phone').value.trim();
    const product = document.getElementById('supplier-product').value.trim();
    const location = document.getElementById('supplier-location').value.trim();

    if (!name || !phone || !product || !location) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const newId = suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    const newSupplier = {
        id: newId,
        name,
        phone,
        product,
        status: 'نشط',
        location
    };

    suppliers.push(newSupplier);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    loadSuppliers();
    hideAddSupplierForm();
    alert('تم إضافة المورد بنجاح');
}

function deleteSupplier(id) {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
        suppliers = suppliers.filter(s => s.id !== id);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        loadSuppliers();
    }
}

// Load suppliers on page load
if (window.location.pathname.includes('suppliers.html')) {
    document.addEventListener('DOMContentLoaded', loadSuppliers);
}

// Dashboard Updates
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', updateDashboard);
}

function updateDashboard() {
    // Update suppliers count
    const suppliersCount = suppliers.length;
    const suppliersEl = document.getElementById('suppliers-count');
    if (suppliersEl) suppliersEl.textContent = `${suppliersCount} مورد`;

    // Update accounting count (assuming invoices are stored similarly)
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const accountingEl = document.getElementById('accounting-count');
    if (accountingEl) accountingEl.textContent = `${invoices.length} فاتورة`;

    // Load chart
    loadSuppliersChart();

    // Update badge
    updateBadge();

    // Load user profile
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
}

function loadSuppliersChart() {
    const ctx = document.getElementById('suppliersChart');
    if (!ctx) return;

    const active = suppliers.filter(s => s.status === 'نشط').length;
    const inactive = suppliers.filter(s => s.status === 'غير نشط').length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['نشط', 'غير نشط'],
            datasets: [{
                data: [active, inactive],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'حالة الموردين'
                }
            }
        }
    });
}

function addAlert() {
    const newAlert = prompt('أدخل نص الإشعار الجديد:');
    if (newAlert) {
        const alertsList = document.getElementById('alerts-list');
        const p = document.createElement('p');
        p.innerHTML = `<i class="fas fa-bell"></i> ${newAlert}`;
        alertsList.appendChild(p);
        updateBadge();
    }
}

function updateBadge() {
    const badge = document.querySelector('.badge');
    const alerts = document.querySelectorAll('#alerts-list p').length;
    if (badge) badge.textContent = alerts;
}

function showProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
    // Load current data
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-email').value = user.email;
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const user = { name, email };
    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    closeProfileModal();
    alert('تم حفظ الملف الشخصي');
}

function viewSupplierDetails(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        document.getElementById('modal-name').textContent = supplier.name;
        document.getElementById('modal-phone').textContent = supplier.phone;
        document.getElementById('modal-product').textContent = supplier.product;
        document.getElementById('modal-location').textContent = supplier.location;
        document.getElementById('modal-status').textContent = supplier.status;
        document.getElementById('supplier-modal').style.display = 'flex';
    }
}

// ===============================
// Legal Section Functions
// ===============================

function showContracts() {
    const content = `
        <h2>نماذج العقود</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #0d47a1;">
                <h3>عقد البيع والشراء</h3>
                <p><strong>الاستخدام:</strong> للعاملين في التجارة والصناعة</p>
                <p><strong>المحتوى:</strong> شروط البيع، التسليم، الثمن، وضمانات المنتج</p>
                <p><strong>مثال:</strong> متجر يبيع منتجات غذائية يحتاج هذا العقد مع موردي المنتجات</p>
                <button onclick="downloadContract('sale-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #1e3799;">
                <h3>عقد الإيجار التجاري</h3>
                <p><strong>الاستخدام:</strong> للمحلات والمشاتل والمستودعات</p>
                <p><strong>المحتوى:</strong> مدة الإيجار، الإيجار الشهري، الالتزامات، الشروط</p>
                <p><strong>مثال:</strong> محل ملابس يحتاج عقد إيجار مع صاحب العمارة</p>
                <button onclick="downloadContract('rent-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #4f46e5;">
                <h3>عقد العمل</h3>
                <p><strong>الاستخدام:</strong> لتوظيف الموظفين والعمال</p>
                <p><strong>المحتوى:</strong> الراتب، الوقت، المسؤوليات، الفسخ</p>
                <p><strong>مثال:</strong> شركة استشارات توظيف مستشاريين بعقد عمل</p>
                <button onclick="downloadContract('employment-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #2563eb;">
                <h3>عقد الشراكة</h3>
                <p><strong>الاستخدام:</strong> للشركاء في مشروع مشترك</p>
                <p><strong>المحتوى:</strong> حصة كل شريك، الأرباح، الخسائر، الاستقالة</p>
                <p><strong>مثال:</strong> شخصان يريدان فتح محل يوقعان عقد شراكة</p>
                <button onclick="downloadContract('partnership-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #ff9800;">
                <h3>عقد الخدمات</h3>
                <p><strong>الاستخدام:</strong> لتقديم خدمات مختلفة</p>
                <p><strong>المحتوى:</strong> نوع الخدمة، الحد الأدنى للخدمة، الثمن، المدة</p>
                <p><strong>مثال:</strong> شركة صيانة تقدم خدمات الصيانة بعقد خدمات</p>
                <button onclick="downloadContract('service-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-right: 4px solid #4caf50;">
                <h3>عقد التمويل / القرض</h3>
                <p><strong>الاستخدام:</strong> للقروض والتمويل من البنوك</p>
                <p><strong>المحتوى:</strong> مبلغ القرض، معدل الفائدة، مدة السداد، الضمانات</p>
                <p><strong>مثال:</strong> صاحب مشروع يحتاج قرض من البنك</p>
                <button onclick="downloadContract('loan-contract')" style="background: #0d47a1; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">تحميل النموذج</button>
            </div>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showFAQ() {
    const content = `
        <h2>الأسئلة القانونية الشائعة والقوانين</h2>
        <div style="margin-top: 20px;">
            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #0d47a1;">
                <summary style="cursor: pointer; font-weight: bold; color: #0d47a1; font-size: 16px;">
                    📋 ما هي الشروط القانونية لفتح متجر تجاري؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>متطلبات أساسية:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>الحصول على رخصة تجارية من مصلحة الضرائب</li>
                        <li>تسجيل في السجل التجاري</li>
                        <li>حساب بنكي باسم النشاط</li>
                        <li>رقم تعريف ضريبي (NIF)</li>
                        <li>اختيار مقر المتجر بحسب قانون استعمال الأراضي</li>
                        <li>تصريح من البلدية إذا كان المقر في ولاية</li>
                        <li>شهادة عدم المانعية من السلطات الأمنية</li>
                    </ul>
                    <p><strong>التكاليف التقريبية:</strong> 50,000 - 150,000 دج</p>
                </div>
            </details>

            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #1e3799;">
                <summary style="cursor: pointer; font-weight: bold; color: #1e3799; font-size: 16px;">
                    📝 ما الفرق بين المؤسسة الفردية والشركة؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>المؤسسة الفردية:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>مالك واحد فقط</li>
                        <li>أسهل في الإدارة والتأسيس</li>
                        <li>صاحبها مسؤول عن جميع الديون بأمواله الشخصية</li>
                        <li>مثال: محل حلاقة أو مقهى صغير</li>
                    </ul>
                    <p><strong>الشركة:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>عدة شركاء (اثنين على الأقل)</li>
                        <li>مسؤولية محدودة</li>
                        <li>تتمتع بشخصية معنوية مستقلة</li>
                        <li>مثال: شركة محدودة المسؤولية (SARL)</li>
                    </ul>
                </div>
            </details>

            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #4f46e5;">
                <summary style="cursor: pointer; font-weight: bold; color: #4f46e5; font-size: 16px;">
                    💼 ما هي التزامات صاحب العمل تجاه موظفيه؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>الالتزامات الأساسية:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>دفع الراتب في الموعد المتفق عليه</li>
                        <li>توفير بيئة عمل آمنة وصحية</li>
                        <li>احترام ساعات العمل المحددة قانوناً (40 ساعة أسبوعياً)</li>
                        <li>دفع الضمان الاجتماعي والصحي</li>
                        <li>احترام إجازات الموظف السنوية (25 يوماً)</li>
                        <li>عدم التمييز بين الموظفين</li>
                    </ul>
                    <p><strong>العقوبات:</strong> غرامات تصل إلى 500,000 دج في حالة المخالفة</p>
                </div>
            </details>

            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #2563eb;">
                <summary style="cursor: pointer; font-weight: bold; color: #2563eb; font-size: 16px;">
                    🏪 قوانين حماية المستهلك - ماذا يجب على البائع؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>حقوق المستهلك:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>الحق في معرفة سعر المنتج وتكوينه</li>
                        <li>استرجاع المنتج المعيب خلال 15 يوماً</li>
                        <li>الحق في ضمان لا يقل عن سنة واحدة</li>
                        <li>عدم الخداع في الإعلانات والأوصاف</li>
                        <li>الحق في طلب الفاتورة والتفاصيل</li>
                    </ul>
                    <p><strong>مثال عملي:</strong> متجر ملابس يبيع ملابس معيبة = غرامة + تعويض للمستهلك</p>
                </div>
            </details>

            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #ff9800;">
                <summary style="cursor: pointer; font-weight: bold; color: #ff9800; font-size: 16px;">
                    🏛️ قوانين الضرائب - ما يجب معرفته؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>أنواع الضرائب:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li><strong>IRG (الضريبة على الدخل):</strong> 10-35% من الدخل</li>
                        <li><strong>TVA (الضريبة على القيمة المضافة):</strong> 19% عادة</li>
                        <li><strong>IBS (ضريبة على الأرباح):</strong> 19% من الأرباح</li>
                    </ul>
                    <p><strong>الالتزامات:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>تقديم الإقرارات الضريبية في موعدها</li>
                        <li>الاحتفاظ بالفواتير والسجلات 10 سنوات</li>
                        <li>عدم التهرب الضريبي (عقوبة تصل إلى السجن)</li>
                    </ul>
                </div>
            </details>

            <details style="background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-right: 4px solid #4caf50;">
                <summary style="cursor: pointer; font-weight: bold; color: #4caf50; font-size: 16px;">
                    📄 ما هي الفاتورة القانونية ومتى تكون إجبارية؟
                </summary>
                <div style="margin-top: 15px; line-height: 1.8;">
                    <p><strong>البيانات الإجبارية للفاتورة:</strong></p>
                    <ul style="margin-right: 20px;">
                        <li>اسم وعنوان البائع والمشتري</li>
                        <li>رقم الفاتورة وتاريخها</li>
                        <li>وصف المنتج/الخدمة والكمية</li>
                        <li>السعر الإجمالي والضرائب</li>
                        <li>طريقة الدفع</li>
                        <li>التوقيع والختم</li>
                    </ul>
                    <p><strong>متى تكون إجبارية؟</strong> في جميع العمليات البيعية بقيمة أكثر من 10,000 دج</p>
                </div>
            </details>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showDocuments() {
    const content = `
        <h2>المستندات القانونية</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p>المستندات القانونية الأساسية المطلوبة:</p>
            <ul style="margin-right: 20px; line-height: 2;">
                <li>✓ السجل التجاري</li>
                <li>✓ الترخيص القانونية</li>
                <li>✓ النظام الأساسي للشركة</li>
                <li>✓ عقود العمل</li>
                <li>✓ الفواتير والإيصالات</li>
                <li>✓ السجلات المحاسبية</li>
                <li>✓ شهادة التسجيل بالضرائب</li>
                <li>✓ التأمينات الاجتماعية</li>
            </ul>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showLaws() {
    const content = `
        <h2>القوانين والتشريعات الجزائرية</h2>
        <div style="margin-top: 20px;">
            <div style="background: #e3f2fd; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-right: 4px solid #0d47a1;">
                <h3>🔹 القانون التجاري رقم 09-05</h3>
                <p>ينظم العمليات التجارية والنشاطات الاقتصادية</p>
            </div>
            <div style="background: #f3e5f5; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-right: 4px solid #7b1fa2;">
                <h3>🔹 قانون العمل رقم 11-90</h3>
                <p>ينظم حقوق وواجبات الموظفين وأصحاب العمل</p>
            </div>
            <div style="background: #fff3e0; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-right: 4px solid #e65100;">
                <h3>🔹 قانون الضرائب المباشرة</h3>
                <p>ينظم الضرائب على الدخل والأرباح والقيمة المضافة</p>
            </div>
            <div style="background: #e8f5e9; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-right: 4px solid #1b5e20;">
                <h3>🔹 قانون حماية المستهلك رقم 09-03</h3>
                <p>يحمي حقوق المستهلكين من التدليس والغش</p>
            </div>
            <div style="background: #fce4ec; padding: 15px; border-radius: 8px; border-right: 4px solid #880e4f;">
                <h3>🔹 القانون المدني والتجاري</h3>
                <p>ينظم العقود والالتزامات والعلاقات التعاقدية</p>
            </div>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function downloadContract(contractType) {
    const contractNames = {
        'sale-contract': 'عقد البيع والشراء',
        'rent-contract': 'عقد الإيجار التجاري',
        'employment-contract': 'عقد العمل',
        'partnership-contract': 'عقد الشراكة',
        'service-contract': 'عقد الخدمات',
        'loan-contract': 'عقد التمويل / القرض'
    };
    alert(`تم تحميل نموذج: ${contractNames[contractType] || 'العقد'}`);
}

// ===============================
// Support Section - Training Functions
// ===============================

function showEconomicConsulting() {
    const content = `
        <h2>🎯 الاستشارات الاقتصادية</h2>
        <div style="margin-top: 20px;">
            <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <h3>💡 خدماتنا الاستشارية</h3>
                <ul style="margin-right: 20px; line-height: 2;">
                    <li>✓ تحليل السوق والمنافسة</li>
                    <li>✓ دراسات الجدوى الاقتصادية</li>
                    <li>✓ إعداد خطط العمل والاستراتيجيات</li>
                    <li>✓ تحسين الإنتاجية والربحية</li>
                    <li>✓ المشورة في التوسع والنمو</li>
                </ul>
            </div>
            <div style="background: #f3e5f5; padding: 20px; border-radius: 10px;">
                <h3>📞 تواصل معنا</h3>
                <p>للحصول على استشارة اقتصادية، يرجى التواصل عبر:</p>
                <p><strong>البريد:</strong> consulting@economic.dz</p>
                <p><strong>الهاتف:</strong> +213 555 123 456</p>
                <p><strong>الموقع:</strong> الجزائر العاصمة - منطقة الأعمال</p>
            </div>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showLegalSupport() {
    const content = `
        <h2>⚖️ الاستشارات القانونية</h2>
        <div style="margin-top: 20px;">
            <div style="background: #fff3e0; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                <h3>📋 خدماتنا القانونية</h3>
                <ul style="margin-right: 20px; line-height: 2;">
                    <li>✓ الاستشارات التنظيمية والقانونية</li>
                    <li>✓ صياغة العقود والاتفاقيات</li>
                    <li>✓ حل النزاعات التجارية</li>
                    <li>✓ الامتثال للقوانين والتشريعات</li>
                    <li>✓ حماية الملكية الفكرية</li>
                </ul>
            </div>
            <div style="background: #e8f5e9; padding: 20px; border-radius: 10px;">
                <h3>📞 تواصل معنا</h3>
                <p>للحصول على استشارة قانونية، يرجى التواصل عبر:</p>
                <p><strong>البريد:</strong> legal@support.dz</p>
                <p><strong>الهاتف:</strong> +213 666 789 456</p>
                <p><strong>المكتب:</strong> وهران - الحي الإداري</p>
            </div>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showTraining() {
    const content = `
        <h2>🎓 التدريب والتكوين</h2>
        <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <button onclick="showProjectBank()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 30px; border-radius: 12px; cursor: pointer; font-size: 16px; font-weight: bold; transition: transform 0.3s;">
                💰 بنك المشاريع والتمويل
            </button>
            <button onclick="showTrainers()" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; padding: 30px; border-radius: 12px; cursor: pointer; font-size: 16px; font-weight: bold; transition: transform 0.3s;">
                👥 الباحثون عن التدريب
            </button>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function showProjectBank() {
    const content = `
        <h2>💰 بنك المشاريع والتمويل</h2>
        <p style="margin-bottom: 20px;">اكتشف فرص تمويل مشاريعك من خلال شركائنا الماليين والبنوك الموثوقة</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 البنك الوطني الجزائري</h3>
                <p><strong>نوع التمويل:</strong> قروض تجارية وصناعية</p>
                <p><strong>نسبة الفائدة:</strong> 4% - 6%</p>
                <p><strong>المبلغ المتاح:</strong> 5,000,000 دج - 50,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 10 سنوات</p>
                <button onclick="requestFunding('BNA')" style="background: white; color: #667eea; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>

            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 بنك الفلاحة والتنمية الريفية</h3>
                <p><strong>نوع التمويل:</strong> مشاريع فلاحية وريفية</p>
                <p><strong>نسبة الفائدة:</strong> 3% - 5%</p>
                <p><strong>المبلغ المتاح:</strong> 1,000,000 دج - 30,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 15 سنة</p>
                <button onclick="requestFunding('BADR')" style="background: white; color: #f5576c; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>

            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 البنك الخارجي الجزائري</h3>
                <p><strong>نوع التمويل:</strong> المشاريع الاستثمارية والصادرات</p>
                <p><strong>نسبة الفائدة:</strong> 5% - 7%</p>
                <p><strong>المبلغ المتاح:</strong> 10,000,000 دج - 100,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 20 سنة</p>
                <button onclick="requestFunding('BEA')" style="background: white; color: #00f2fe; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>

            <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 بنك التنمية المحلية</h3>
                <p><strong>نوع التمويل:</strong> المشاريع الصغيرة والمتوسطة</p>
                <p><strong>نسبة الفائدة:</strong> 2% - 4%</p>
                <p><strong>المبلغ المتاح:</strong> 500,000 دج - 20,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 10 سنوات</p>
                <button onclick="requestFunding('BDL')" style="background: white; color: #38f9d7; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>

            <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 صندوق دعم المشاريع الناشئة</h3>
                <p><strong>نوع التمويل:</strong> منح ودعم للمشاريع الناشئة</p>
                <p><strong>نسبة الفائدة:</strong> 0% - 2% (منح بدون فائدة)</p>
                <p><strong>المبلغ المتاح:</strong> 100,000 دج - 10,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 7 سنوات</p>
                <button onclick="requestFunding('STARTUP')" style="background: white; color: #fa709a; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>

            <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: white; padding: 25px; border-radius: 15px;">
                <h3>🏦 الصندوق الوطني للتأمين على البطالة</h3>
                <p><strong>نوع التمويل:</strong> دعم للعاطلين الراغبين في المشاريع</p>
                <p><strong>نسبة الفائدة:</strong> منح بدون فائدة</p>
                <p><strong>المبلغ المتاح:</strong> 200,000 دج - 15,000,000 دج</p>
                <p><strong>المدة:</strong> حتى 10 سنوات</p>
                <button onclick="requestFunding('ANEM')" style="background: white; color: #fe8c8c; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;">طلب تمويل</button>
            </div>
        </div>

        <div style="background: #fff3cd; border-right: 4px solid #ff9800; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3>⚠️ ملاحظة مهمة</h3>
            <p>للحصول على التمويل، يجب أن تتوفر لديك:</p>
            <ul style="margin-right: 20px;">
                <li>خطة عمل واضحة</li>
                <li>دراسة جدوى اقتصادية</li>
                <li>ضمانات أو كفيل</li>
                <li>رخصة تجارية</li>
            </ul>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

// ===============================
// Trainers Management
// ===============================
let trainers = JSON.parse(localStorage.getItem('trainers')) || [
    { id: 1, name: 'أحمد علي محمد', specialty: 'إدارة المشاريع والتسويق', experience: 15, courses: 25, trainees: 10, email: 'ahmad@example.com', phone: '0550123456', color: '#0d47a1', emoji: '👨‍💼' },
    { id: 2, name: 'فاطمة الزهراء خليفة', specialty: 'الاستشارات المالية والمحاسبة', experience: 12, courses: 18, trainees: 8, email: 'fatima@example.com', phone: '0660234567', color: '#1e3799', emoji: '👩‍💼' },
    { id: 3, name: 'محمود حسن إبراهيم', specialty: 'القانون التجاري والعقود', experience: 20, courses: 30, trainees: 15, email: 'mahmoud@example.com', phone: '0770345678', color: '#4f46e5', emoji: '👨‍⚖️' },
    { id: 4, name: 'ليليا محمد أمين', specialty: 'التسويق الرقمي والعلاقات العامة', experience: 10, courses: 22, trainees: 12, email: 'laila@example.com', phone: '0550456789', color: '#2563eb', emoji: '👩‍💻' },
    { id: 5, name: 'علي عبدالرحمان سليم', specialty: 'المبيعات والتفاوض', experience: 18, courses: 26, trainees: 20, email: 'ali@example.com', phone: '0660567890', color: '#7c3aed', emoji: '👨‍🏫' },
    { id: 6, name: 'سارة محمد علي', specialty: 'ريادة الأعمال والابتكار', experience: 8, courses: 14, trainees: 10, email: 'sarah@example.com', phone: '0770678901', color: '#db2777', emoji: '👩‍⚕️' }
];

function showTrainers() {
    let trainersHTML = trainers.map(trainer => `
        <div style="background: white; border: none; border-radius: 15px; padding: 25px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; transform: translateY(0);" 
             onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.2)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)';">
            
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: ${trainer.color}; border-radius: 15px 15px 0 0;"></div>
            
            <div style="font-size: 50px; margin-bottom: 10px; margin-top: 10px;">${trainer.emoji}</div>
            
            <h4 style="color: ${trainer.color}; margin: 10px 0; font-size: 18px; font-weight: bold;">${trainer.name}</h4>
            
            <div style="background: ${trainer.color}20; padding: 8px 12px; border-radius: 8px; margin: 10px 0; font-size: 14px; color: ${trainer.color}; font-weight: 600;">
                ${trainer.specialty}
            </div>
            
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>📅 الخبرة:</strong> ${trainer.experience} سنة
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>📊 الدورات:</strong> ${trainer.courses}+ دورة
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>👥 المتدربون:</strong> يبحث عن ${trainer.trainees} متدرب
            </p>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📧 ${trainer.email}
                </p>
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📱 ${trainer.phone}
                </p>
            </div>
            
            <button onclick="contactTrainer('${trainer.name}')" style="background: linear-gradient(135deg, ${trainer.color}, ${trainer.color}dd); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 15px; font-weight: bold; transition: all 0.3s ease;" 
                    onmouseover="this.style.transform='scale(1.05)';" 
                    onmouseout="this.style.transform='scale(1)';">
                التواصل الآن
            </button>
            
            <button onclick="deleteTrainer(${trainer.id})" style="background: #ff6b6b; color: white; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 8px; font-size: 12px;">
                حذف
            </button>
        </div>
    `).join('');
    
    const content = `
        <h2 style="color: #0d47a1; margin-bottom: 10px;">👥 المدربون والمتدربون</h2>
        <p style="margin-bottom: 20px; color: #666;">تواصل مع المتخصصين المستعدين للتدريب والتكوين</p>
        
        <button onclick="toggleAddTrainerForm()" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-bottom: 30px; font-size: 16;">
            ➕ إضافة مدرب جديد
        </button>
        
        <div id="addTrainerFormContainer" style="display: none; background: #f8f9fa; padding: 25px; border-radius: 15px; margin-bottom: 30px; border-right: 4px solid #0d47a1;">
            <h3>📝 إضافة مدرب جديد</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                <input type="text" id="trainer-name" placeholder="اسم المدرب" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="email" id="trainer-email" placeholder="البريد الإلكتروني" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="tel" id="trainer-phone" placeholder="رقم الهاتف" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="text" id="trainer-specialty" placeholder="التخصص" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-experience" placeholder="سنوات الخبرة" min="1" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-courses" placeholder="عدد الدورات" min="0" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-trainees" placeholder="عدد المتدربين المطلوبين" min="1" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
            </div>
            <div style="margin-top: 15px;">
                <button onclick="addNewTrainer()" style="background: #0d47a1; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-right: 10px;">
                    ✅ إضافة المدرب
                </button>
                <button onclick="toggleAddTrainerForm()" style="background: #999; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ❌ إلغاء
                </button>
            </div>
        </div>
        
        <h3 style="margin-top: 30px; color: #0d47a1; margin-bottom: 15px;">👨‍🏫 المدربون المتاحون للتدريب</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 30px;">
            ${trainersHTML}
        </div>

        <h3 style="margin-top: 30px; color: #ff6b6b;">🎓 الباحثون عن التدريب والتكوين</h3>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-top: 15px;">
            <p style="margin: 0;"><strong style="font-size: 18px;">عدد المتدربين المتاحين:</strong> ${45 + trainers.length}+ متدرب مستعد</p>
            <p style="margin: 15px 0 10px 0;"><strong>المجالات المطلوبة:</strong></p>
            <ul style="margin-right: 20px; line-height: 2; margin: 0;">
                <li>🔹 إدارة المشاريع والتسويق: 12 متدرب</li>
                <li>🔹 المحاسبة والاستشارات المالية: 8 متدرب</li>
                <li>🔹 القانون والعقود التجارية: 10 متدرب</li>
                <li>🔹 التسويق الرقمي: 15 متدرب</li>
            </ul>
        </div>
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function toggleAddTrainerForm() {
    const form = document.getElementById('addTrainerFormContainer');
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function addNewTrainer() {
    const name = document.getElementById('trainer-name').value.trim();
    const email = document.getElementById('trainer-email').value.trim();
    const phone = document.getElementById('trainer-phone').value.trim();
    const specialty = document.getElementById('trainer-specialty').value.trim();
    const experience = parseInt(document.getElementById('trainer-experience').value);
    const courses = parseInt(document.getElementById('trainer-courses').value);
    const trainees = parseInt(document.getElementById('trainer-trainees').value);

    if (!name || !email || !phone || !specialty || !experience || !trainees) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    const colors = ['#0d47a1', '#1e3799', '#4f46e5', '#2563eb', '#7c3aed', '#db2777', '#ff6b6b', '#ff9800'];
    const emojis = ['👨‍💼', '👩‍💼', '👨‍⚖️', '👩‍💻', '👨‍🏫', '👩‍⚕️', '👨‍🔬', '👩‍🎓'];
    
    const newTrainer = {
        id: trainers.length > 0 ? Math.max(...trainers.map(t => t.id)) + 1 : 1,
        name,
        email,
        phone,
        specialty,
        experience,
        courses: courses || 0,
        trainees,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };

    trainers.push(newTrainer);
    localStorage.setItem('trainers', JSON.stringify(trainers));
    
    // Clear form
    document.getElementById('trainer-name').value = '';
    document.getElementById('trainer-email').value = '';
    document.getElementById('trainer-phone').value = '';
    document.getElementById('trainer-specialty').value = '';
    document.getElementById('trainer-experience').value = '';
    document.getElementById('trainer-courses').value = '';
    document.getElementById('trainer-trainees').value = '';
    
    toggleAddTrainerForm();
    showTrainers();
    alert('تم إضافة المدرب بنجاح!');
}

function deleteTrainer(id) {
    if (confirm('هل أنت متأكد من حذف هذا المدرب؟')) {
        trainers = trainers.filter(t => t.id !== id);
        localStorage.setItem('trainers', JSON.stringify(trainers));
        showTrainers();
        alert('تم حذف المدرب بنجاح');
    }
}

function requestFunding(bankName) {
    alert(`تم إرسال طلب التمويل إلى ${bankName}. سيتم التواصل معك قريباً!`);
}

function contactTrainer(trainerName) {
    alert(`تم التواصل مع المدرب: ${trainerName}\nسيتم إرسال بيانات الاتصال إلى بريدك الإلكتروني.`);
}

// ===============================
// Trainees Management (طالبي التدريب)
// ===============================
let trainees = JSON.parse(localStorage.getItem('trainees')) || [
    {
        name: 'سلمى بوشريط',
        email: 'salma.bouchrit@example.com',
        phone: '0550987654',
        field: 'المحاسبة والمالية',
        education: 'ماجستير في المحاسبة التجارية',
        experience: 'سنة تدريب في مكتب محاسبي',
        seeking: 'تبحث عن فرصة تدريب من 3 إلى 6 أشهر في المحاسبة المالية',
        color: '#1e88e5',
        emoji: '👩‍🎓'
    },
    {
        name: 'يوسف بن صالح',
        email: 'youssef.bensaleh@example.com',
        phone: '0660123456',
        field: 'إدارة المشاريع والتسويق الرقمي',
        education: 'بكالوريوس إدارة أعمال',
        experience: 'خبرة تدريبية 10 أشهر',
        seeking: 'يبحث عن فرصة تدريب تطبيقي في التسويق الرقمي وإدارة المشاريع',
        color: '#e53935',
        emoji: '👨‍🎓'
    }
];

function showTrainersWithTrainees() {
    // First show trainers
    let trainersHTML = trainers.map(trainer => `
        <div style="background: white; border: none; border-radius: 15px; padding: 25px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; transform: translateY(0);" 
             onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.2)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)';">
            
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: ${trainer.color}; border-radius: 15px 15px 0 0;"></div>
            
            <div style="font-size: 50px; margin-bottom: 10px; margin-top: 10px;">${trainer.emoji}</div>
            
            <h4 style="color: ${trainer.color}; margin: 10px 0; font-size: 18px; font-weight: bold;">${trainer.name}</h4>
            
            <div style="background: ${trainer.color}20; padding: 8px 12px; border-radius: 8px; margin: 10px 0; font-size: 14px; color: ${trainer.color}; font-weight: 600;">
                ${trainer.specialty}
            </div>
            
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>📅 الخبرة:</strong> ${trainer.experience} سنة
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>📊 الدورات:</strong> ${trainer.courses}+ دورة
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>👥 المتدربون:</strong> يبحث عن ${trainer.trainees} متدرب
            </p>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📧 ${trainer.email}
                </p>
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📱 ${trainer.phone}
                </p>
            </div>
            
            <button onclick="contactTrainer('${trainer.name}')" style="background: linear-gradient(135deg, ${trainer.color}, ${trainer.color}dd); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 15px; font-weight: bold; transition: all 0.3s ease;" 
                    onmouseover="this.style.transform='scale(1.05)';" 
                    onmouseout="this.style.transform='scale(1)';">
                التواصل الآن
            </button>
            
            <button onclick="deleteTrainer(${trainer.id})" style="background: #ff6b6b; color: white; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 8px; font-size: 12px;">
                حذف
            </button>
        </div>
    `).join('');

    // Then show trainees
    let traineesHTML = trainees.map((trainee, index) => `
        <div style="background: white; border: none; border-radius: 15px; padding: 25px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer; position: relative; overflow: hidden; transform: translateY(0);" 
             onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.2)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)';">
            
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: ${trainee.color}; border-radius: 15px 15px 0 0;"></div>
            
            <div style="font-size: 50px; margin-bottom: 10px; margin-top: 10px;">${trainee.emoji}</div>
            
            <h4 style="color: ${trainee.color}; margin: 10px 0; font-size: 18px; font-weight: bold;">${trainee.name}</h4>
            
            <div style="background: ${trainee.color}20; padding: 8px 12px; border-radius: 8px; margin: 10px 0; font-size: 14px; color: ${trainee.color}; font-weight: 600;">
                ${trainee.field}
            </div>
            
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>🎓 المستوى الدراسي:</strong> ${trainee.education}
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>💼 الخبرة:</strong> ${trainee.experience}
            </p>
            <p style="color: #555; margin: 8px 0; font-size: 14px;">
                <strong>🎯 يبحث عن:</strong> ${trainee.seeking}
            </p>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📧 ${trainee.email}
                </p>
                <p style="font-size: 12px; color: #999; margin: 5px 0;">
                    📱 ${trainee.phone}
                </p>
            </div>
            
            <button onclick="contactTrainee('${trainee.name}')" style="background: linear-gradient(135deg, ${trainee.color}, ${trainee.color}dd); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 15px; font-weight: bold; transition: all 0.3s ease;" 
                    onmouseover="this.style.transform='scale(1.05)';" 
                    onmouseout="this.style.transform='scale(1)';">
                عرض السيرة الذاتية
            </button>
            
            <button onclick="deleteTrainee(${index})" style="background: #ff6b6b; color: white; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 8px; font-size: 12px;">
                حذف
            </button>
        </div>
    `).join('');
    
    const content = `
        <h2 style="color: #0d47a1; margin-bottom: 10px;">👥 المدربون والمتدربون</h2>
        <p style="margin-bottom: 20px; color: #666;">تواصل مع المتخصصين المستعدين للتدريب والتكوين</p>
        
        <button onclick="toggleAddTrainerForm()" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-bottom: 30px; font-size: 16;">
            ➕ إضافة مدرب جديد
        </button>
        
        <div id="addTrainerFormContainer" style="display: none; background: #f8f9fa; padding: 25px; border-radius: 15px; margin-bottom: 30px; border-right: 4px solid #0d47a1;">
            <h3>📝 إضافة مدرب جديد</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                <input type="text" id="trainer-name" placeholder="اسم المدرب" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="email" id="trainer-email" placeholder="البريد الإلكتروني" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="tel" id="trainer-phone" placeholder="رقم الهاتف" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="text" id="trainer-specialty" placeholder="التخصص" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-experience" placeholder="سنوات الخبرة" min="1" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-courses" placeholder="عدد الدورات" min="0" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="number" id="trainer-trainees" placeholder="عدد المتدربين المطلوبين" min="1" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
            </div>
            <div style="margin-top: 15px;">
                <button onclick="addNewTrainer()" style="background: #0d47a1; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-right: 10px;">
                    ✅ إضافة المدرب
                </button>
                <button onclick="toggleAddTrainerForm()" style="background: #999; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ❌ إلغاء
                </button>
            </div>
        </div>
        
        <h3 style="margin-top: 30px; color: #0d47a1; margin-bottom: 15px;">👨‍🏫 المدربون المتاحون للتدريب</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-bottom: 30px;">
            ${trainersHTML}
        </div>

        <h3 style="margin-top: 30px; color: #ff6b6b; margin-bottom: 15px;">🎓 الباحثون عن التدريب والتكوين</h3>
        <button onclick="toggleAddTraineeForm()" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-bottom: 20px; font-size: 16;">
            ➕ إضافة متدرب (سيرة ذاتية)
        </button>

        <div id="addTraineeFormContainer" style="display: none; background: #fff5f5; padding: 25px; border-radius: 15px; margin-bottom: 30px; border-right: 4px solid #ff6b6b;">
            <h3>📝 إضافة متدرب جديد (CV)</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 20px;">
                <input type="text" id="trainee-name" placeholder="الاسم الكامل" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="email" id="trainee-email" placeholder="البريد الإلكتروني" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="tel" id="trainee-phone" placeholder="رقم الهاتف" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="text" id="trainee-field" placeholder="مجال التدريب المطلوب" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="text" id="trainee-education" placeholder="المستوى الدراسي" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <input type="text" id="trainee-experience" placeholder="الخبرة العملية" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial;">
                <textarea id="trainee-seeking" placeholder="يبحث عن..." style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-family: Arial; grid-column: 1/-1;"></textarea>
            </div>
            <div style="margin-top: 15px;">
                <button onclick="addNewTrainee()" style="background: #ff6b6b; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-right: 10px;">
                    ✅ إضافة المتدرب
                </button>
                <button onclick="toggleAddTraineeForm()" style="background: #999; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ❌ إلغاء
                </button>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px;">
            ${traineesHTML}
        </div>

        ${trainees.length === 0 ? `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; margin-top: 15px; text-align: center;">
                <p style="margin: 0;"><strong style="font-size: 18px;">عدد المتدربين المتاحين:</strong> ${45 + trainers.length}+ متدرب مستعد</p>
                <p style="margin: 15px 0 10px 0;"><strong>المجالات المطلوبة:</strong></p>
                <ul style="margin-right: 20px; line-height: 2; margin: 0;">
                    <li>🔹 إدارة المشاريع والتسويق: 12 متدرب</li>
                    <li>🔹 المحاسبة والاستشارات المالية: 8 متدرب</li>
                    <li>🔹 القانون والعقود التجارية: 10 متدرب</li>
                    <li>🔹 التسويق الرقمي: 15 متدرب</li>
                </ul>
            </div>
        ` : ''}
    `;
    document.getElementById('dynamic-content').innerHTML = content;
}

function toggleAddTraineeForm() {
    const form = document.getElementById('addTraineeFormContainer');
    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function addNewTrainee() {
    const name = document.getElementById('trainee-name').value.trim();
    const email = document.getElementById('trainee-email').value.trim();
    const phone = document.getElementById('trainee-phone').value.trim();
    const field = document.getElementById('trainee-field').value.trim();
    const education = document.getElementById('trainee-education').value.trim();
    const experience = document.getElementById('trainee-experience').value.trim();
    const seeking = document.getElementById('trainee-seeking').value.trim();

    if (!name || !email || !phone || !field || !education) {
        alert('يرجى ملء البيانات المطلوبة');
        return;
    }

    const colors = ['#0d47a1', '#1e3799', '#4f46e5', '#2563eb', '#7c3aed', '#db2777', '#ff6b6b', '#ff9800', '#43e97b', '#f5576c'];
    const emojis = ['👨‍🎓', '👩‍🎓', '👨‍💻', '👩‍💼', '👨‍🔬', '👩‍🏫', '👨‍⚕️', '👩‍⚕️', '🧑‍🔧', '👱‍♂️'];
    
    const newTrainee = {
        name,
        email,
        phone,
        field,
        education,
        experience,
        seeking,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };

    trainees.push(newTrainee);
    localStorage.setItem('trainees', JSON.stringify(trainees));
    
    // Clear form
    document.getElementById('trainee-name').value = '';
    document.getElementById('trainee-email').value = '';
    document.getElementById('trainee-phone').value = '';
    document.getElementById('trainee-field').value = '';
    document.getElementById('trainee-education').value = '';
    document.getElementById('trainee-experience').value = '';
    document.getElementById('trainee-seeking').value = '';
    
    toggleAddTraineeForm();
    showTrainersWithTrainees();
    alert('تم إضافة السيرة الذاتية بنجاح!');
}

function deleteTrainee(index) {
    if (confirm('هل أنت متأكد من حذف هذه السيرة الذاتية؟')) {
        trainees.splice(index, 1);
        localStorage.setItem('trainees', JSON.stringify(trainees));
        showTrainersWithTrainees();
        alert('تم حذف السيرة الذاتية بنجاح');
    }
}

function contactTrainee(traineeName) {
    alert(`تم التواصل مع المتدرب: ${traineeName}\nسيتم إرسال بيانات الاتصال إلى بريدك الإلكتروني.`);
}

// ===============================
// Update the showTrainers function to use the new function
// ===============================
function showTrainers() {
    showTrainersWithTrainees();
}

function showFinancialAnalysis() {
    const content = `
        <h2>📈 أرباح وخسائر</h2>
        <p>يمكنك تحميل ملف الأرباح والخسائر لمراجعة الأرقام والتقارير مباشرة.</p>
        <div style="margin-top: 20px; display: grid; grid-template-columns: minmax(280px, 1fr); gap: 20px;">
            <div style="background: #e8f5e9; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h3>ملف الأرباح والخسائر</h3>
                <p>هذا الملف يحتوي على بيانات الإيرادات، التكاليف، والأرباح والخسائر لفترة العمل.</p>
                <a href="documents/قائمة-الأرباح-والخسائر-Excel.xlsx" download style="display: inline-block; margin-top: 15px; background: #0d47a1; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none;">تحميل ملف الأرباح والخسائر</a>
            </div>
            <div style="background: #fff3e0; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h3>ملخص سريع</h3>
                <ul style="margin-right: 20px; line-height: 1.8;">
                    <li>✓ مراجعة صافي الأرباح</li>
                    <li>✓ تحليل التكاليف التشغيلية</li>
                    <li>✓ مقارنة الإيرادات بين فترات</li>
                    <li>✓ تحديد مصادر الربحية والخسارة</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('analysis-content').innerHTML = content;
}

function showTaxAnalysis() {
    const content = `
        <h2>💼 التحليل الضريبي</h2>
        <p>قم بتحميل ملف الضريبة لمراجعة النماذج والمستندات الضريبية والدفترية.</p>
        <div style="margin-top: 20px; display: grid; grid-template-columns: minmax(280px, 1fr); gap: 20px;">
            <div style="background: #e3f2fd; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h3>ملف الضريبة</h3>
                <p>يتضمن هذا الملف نموذج الدفاتر والمستندات الضريبية لسهولة المتابعة.</p>
                <a href="documents/نموذج-دفتر-اليومية-1.docx" download style="display: inline-block; margin-top: 15px; background: #2563eb; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none;">تحميل ملف الضريبة</a>
            </div>
            <div style="background: #fff8e1; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h3>نقاط ضريبية مهمة</h3>
                <ul style="margin-right: 20px; line-height: 1.8;">
                    <li>✓ حفظ الفواتير والسجلات لمدة 10 سنوات</li>
                    <li>✓ تقديم الإقرارات الضريبية في مواعيدها</li>
                    <li>✓ التحقق من خصم TVA إن لم يطبق</li>
                    <li>✓ متابعة الفاتورة القانونية والإيصالات</li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById('analysis-content').innerHTML = content;
}

function showAccountingTax() {
    const content = `
        <div style="display: grid; gap: 20px;">
            <div style="background: #e3f2fd; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h2>جدول الضرائب</h2>
                <p>عرض مفصل لفئات الضريبة والعمليات المطبقة.</p>
                <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background: #2563eb; color: white;">
                            <th style="padding: 12px; text-align: right;">البند</th>
                            <th style="padding: 12px; text-align: right;">المبلغ</th>
                            <th style="padding: 12px; text-align: right;">نسبة الضريبة</th>
                            <th style="padding: 12px; text-align: right;">المبلغ بعد الضريبة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #f3f6ff;"><td style="padding: 12px; text-align: right;">الإيرادات الخاضعة للضريبة</td><td style="padding: 12px; text-align: right;">8,500,000 دج</td><td style="padding: 12px; text-align: right;">19%</td><td style="padding: 12px; text-align: right;">1,615,000 دج</td></tr>
                        <tr><td style="padding: 12px; text-align: right;">الربح الصافي</td><td style="padding: 12px; text-align: right;">4,630,000 دج</td><td style="padding: 12px; text-align: right;">15%</td><td style="padding: 12px; text-align: right;">694,500 دج</td></tr>
                        <tr style="background: #f3f6ff;"><td style="padding: 12px; text-align: right;">المصاريف غير القابلة للخصم</td><td style="padding: 12px; text-align: right;">420,000 دج</td><td style="padding: 12px; text-align: right;">0%</td><td style="padding: 12px; text-align: right;">420,000 دج</td></tr>
                    </tbody>
                </table>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 20px;">
                <div style="background: #fff; border-radius: 15px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.06);">
                    <h3>ملف الضريبة</h3>
                    <a href="documents/نموذج-دفتر-اليومية-1.docx" download style="display:inline-block; margin-top: 15px; background: #2563eb; color: white; padding: 12px 18px; border-radius: 10px; text-decoration:none;">تحميل الملف</a>
                </div>
                <div style="background: #fff; border-radius: 15px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.06);">
                    <h3>التعليمات الضريبية</h3>
                    <ul style="line-height: 1.8; margin-right: 15px;">
                        <li>✓ حفظ الفواتير والمستندات لمدة 10 سنوات.</li>
                        <li>✓ تقديم الإقرارات في الموعد.</li>
                        <li>✓ التأكد من احتساب TVA بدقة.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('accounting-content').innerHTML = content;
}

function showAccountingProfitLoss() {
    const content = `
        <div style="display: grid; gap: 20px;">
            <div style="background: #e8f5e9; border-radius: 15px; padding: 25px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <h2>جدول الأرباح والخسائر</h2>
                <p>عرض تفصيلي للإيرادات والتكاليف والنتيجة النهائية.</p>
                <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                        <tr style="background: #0d47a1; color: white;">
                            <th style="padding: 12px; text-align: right;">البند</th>
                            <th style="padding: 12px; text-align: right;">المبلغ</th>
                            <th style="padding: 12px; text-align: right;">الوصف</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #f3f6ff;"><td style="padding: 12px; text-align: right;">الإيرادات التشغيلية</td><td style="padding: 12px; text-align: right;">12,450,000 دج</td><td style="padding: 12px; text-align: right;">مبيعات وخدمات</td></tr>
                        <tr><td style="padding: 12px; text-align: right;">تكاليف المبيعات</td><td style="padding: 12px; text-align: right;">4,650,000 دج</td><td style="padding: 12px; text-align: right;">تكاليف مباشرة</td></tr>
                        <tr style="background: #f3f6ff;"><td style="padding: 12px; text-align: right;">المصاريف التشغيلية</td><td style="padding: 12px; text-align: right;">2,120,000 دج</td><td style="padding: 12px; text-align: right;">إدارة وتسويق</td></tr>
                        <tr><td style="padding: 12px; text-align: right;">صافي الربح قبل الضريبة</td><td style="padding: 12px; text-align: right;">5,680,000 دج</td><td style="padding: 12px; text-align: right;">النتيجة النهائية</td></tr>
                    </tbody>
                </table>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 20px;">
                <div style="background: #fff; border-radius: 15px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.06);">
                    <h3>ملف الأرباح والخسائر</h3>
                    <a href="documents/قائمة-الأرباح-والخسائر-Excel.xlsx" download style="display:inline-block; margin-top: 15px; background: #0d47a1; color: white; padding: 12px 18px; border-radius: 10px; text-decoration:none;">تحميل الملف</a>
                </div>
                <div style="background: #fff; border-radius: 15px; padding: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.06);">
                    <h3>نظرة سريعة</h3>
                    <ul style="line-height: 1.8; margin-right: 15px;">
                        <li>✓ مراقبة هوامش الربح.</li>
                        <li>✓ مقارنة الإيرادات بالمصاريف.</li>
                        <li>✓ إنشاء تقرير سريع للدورة المالية.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('accounting-content').innerHTML = content;
}

function showFinancialReports() {
    const content = `
        <h2>📄 التقارير المالية</h2>
        <p>تقارير مفصلة عن الأداء المالي للشركة، ويمكنك تحميل استمارات إضافية إذا لزم الأمر.</p>
        <div style="margin-top: 20px; padding: 25px; border-radius: 15px; background: #f3f4f6; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
            <p>هذه الوظيفة تعرض ملخص المؤشرات المالية، التوازنات، والتوقعات المستقبلية.</p>
        </div>
    `;
    document.getElementById('analysis-content').innerHTML = content;
}

function showPerformanceIndicators() {
    const content = `
        <h2>📊 مؤشرات الأداء</h2>
        <p>عرض أهم مؤشرات الأداء المالية والتشغيلية (KPI) لمراقبة التقدم.</p>
        <div style="margin-top: 20px; padding: 25px; border-radius: 15px; background: #e8f5e9; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
            <ul style="margin-right: 20px; line-height: 1.8;">
                <li>✓ نسبة صافي الربح</li>
                <li>✓ هامش الربح الإجمالي</li>
                <li>✓ معدل الدوران</li>
                <li>✓ نسبة التكاليف إلى الإيرادات</li>
            </ul>
        </div>
    `;
    document.getElementById('analysis-content').innerHTML = content;
}

function showStatistics() {
    const content = `
        <h2>📈 إحصائيات</h2>
        <p>عرض بيانات الرسوم البيانية والنسب المالية لدعم القرارات.</p>
        <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr; gap: 25px;">
            <div style="padding: 25px; border-radius: 15px; background: #ede7f6; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                <p style="margin: 0 0 15px 0;">أربعة أو خمسة أعمدة بيانية تمثل الأداء المالي الحالي.</p>
                <canvas id="statisticsChart" style="max-height: 420px;"></canvas>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                    <h4 style="margin: 0 0 10px 0; color: #0d47a1;">إجمالي المبيعات</h4>
                    <p style="margin: 0; font-size: 24px; font-weight: bold;">12,450,000 دج</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                    <h4 style="margin: 0 0 10px 0; color: #1e3799;">التكاليف</h4>
                    <p style="margin: 0; font-size: 24px; font-weight: bold;">7,820,000 دج</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                    <h4 style="margin: 0 0 10px 0; color: #4f46e5;">صافي الربح</h4>
                    <p style="margin: 0; font-size: 24px; font-weight: bold;">4,630,000 دج</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                    <h4 style="margin: 0 0 10px 0; color: #2563eb;">النفقات التشغيلية</h4>
                    <p style="margin: 0; font-size: 24px; font-weight: bold;">2,120,000 دج</p>
                </div>
                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.08);">
                    <h4 style="margin: 0 0 10px 0; color: #7c3aed;">الأرباح قبل الضرائب</h4>
                    <p style="margin: 0; font-size: 24px; font-weight: bold;">4,850,000 دج</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('analysis-content').innerHTML = content;

    const ctx = document.getElementById('statisticsChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['المبيعات', 'التكاليف', 'صافي الربح', 'النفقات', 'قبل الضرائب'],
                datasets: [{
                    label: 'القيمة بالدينار الجزائري',
                    data: [12450000, 7820000, 4630000, 2120000, 4850000],
                    backgroundColor: ['#0d47a1', '#1e3799', '#4f46e5', '#2563eb', '#7c3aed'],
                    borderColor: ['#0b3b7f', '#182f6c', '#3c3ab8', '#1b4daf', '#5a32c1'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' دج';
                            }
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} دج`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function closeModal() {
    document.getElementById('supplier-modal').style.display = 'none';
}

function editSupplier(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-phone').value = supplier.phone;
        document.getElementById('supplier-product').value = supplier.product;
        document.getElementById('supplier-location').value = supplier.location;
        showAddSupplierForm();
        // Change button to update
        const addBtn = document.querySelector('#add-supplier-form button:first-of-type');
        addBtn.textContent = 'تحديث';
        addBtn.onclick = () => updateSupplier(id);
    }
}

function updateSupplier(id) {
    const name = document.getElementById('supplier-name').value.trim();
    const phone = document.getElementById('supplier-phone').value.trim();
    const product = document.getElementById('supplier-product').value.trim();
    const location = document.getElementById('supplier-location').value.trim();

    if (!name || !phone || !product || !location) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        supplier.name = name;
        supplier.phone = phone;
        supplier.product = product;
        supplier.location = location;
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        loadSuppliers();
        hideAddSupplierForm();
        // Reset button
        const addBtn = document.querySelector('#add-supplier-form button:first-of-type');
        addBtn.textContent = 'إضافة';
        addBtn.onclick = addSupplier;
        alert('تم تحديث المورد بنجاح');
    }
}

function filterSuppliers() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const tbody = document.querySelector('.suppliers-table tbody');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.cells[4].textContent;
        const matchesQuery = text.includes(query);
        const matchesStatus = !statusFilter || status === statusFilter;
        row.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });
}

function filterByStatus() {
    filterSuppliers(); // Reuse the same function
}

function viewLatestSupplier() {
    if (suppliers.length > 0) {
        viewSupplierDetails(suppliers[suppliers.length - 1].id);
    }
}

