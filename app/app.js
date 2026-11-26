// --- 1. DONNÉES INITIALES DU CATALOGUE ---
let books = [
    {
        id: 1,
        title: "Dune — Tome I",
        author: "Frank Herbert",
        category: "Science-Fiction",
        year: 1965,
        status: "available",
        coverGradient: "from-amber-600 via-orange-700 to-midnight-900",
        icon: "sun",
        isbn: "978-2266320481",
        pages: 720,
        summary: "Sur la planète désertique d'Arrakis, source unique de l'Épice, le jeune Paul Atréides se retrouve au cœur d'un affrontement politique et mystique qui changera le destin de l'univers."
    },
    {
        id: 2,
        title: "Les Misérables",
        author: "Victor Hugo",
        category: "Roman",
        year: 1862,
        status: "available",
        coverGradient: "from-midnight-800 via-slate-800 to-amber-900",
        icon: "feather",
        isbn: "978-2253096337",
        pages: 1248,
        summary: "Fresque sociale monumentale du XIXe siècle suivant la rédemption de Jean Valjean, ancien forçat poursuivi sans relâche par l'inspecteur Javert à travers la France."
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Informatique",
        year: 2008,
        status: "borrowed",
        coverGradient: "from-blue-700 via-indigo-800 to-midnight-950",
        icon: "code-2",
        isbn: "978-0132350884",
        pages: 464,
        summary: "Guide de référence incontournable pour écrire un code lisible, maintenable et élégant. Principes SOLID, nommage, refactoring et bonnes pratiques d'architecture logicielle."
    },
    {
        id: 4,
        title: "Sapiens : Une brève histoire de l'humanité",
        author: "Yuval Noah Harari",
        category: "Histoire",
        year: 2011,
        status: "available",
        coverGradient: "from-emerald-700 via-teal-800 to-midnight-900",
        icon: "globe",
        isbn: "978-2226257017",
        pages: 512,
        summary: "Comment Homo sapiens a-t-il réussi à dominer la planète ? Une exploration captivante des révolutions cognitive, agricole et scientifique de notre espèce."
    },
    {
        id: 5,
        title: "Atomes & Habitudes (Atomic Habits)",
        author: "James Clear",
        category: "Développement personnel",
        year: 2018,
        status: "available",
        coverGradient: "from-amber-500 via-yellow-700 to-stone-900",
        icon: "zap",
        isbn: "978-2035982902",
        pages: 320,
        summary: "Une méthode concrète et scientifiquement prouvée pour bâtir de bonnes habitudes, briser les mauvaises et maîtriser les micro-changements qui mènent à des résultats remarquables."
    },
    {
        id: 6,
        title: "Fondation",
        author: "Isaac Asimov",
        category: "Science-Fiction",
        year: 1951,
        status: "available",
        coverGradient: "from-indigo-700 via-purple-900 to-midnight-950",
        icon: "orbit",
        isbn: "978-2070360536",
        pages: 288,
        summary: "Grâce à la psychohistoire, Hari Seldon prédit la chute inéluctable de l'Empire Galactique et crée la Fondation afin de préserver le savoir humain."
    },
    {
        id: 7,
        title: "Une si longue lettre",
        author: "Mariama Bâ",
        category: "Roman",
        year: 1979,
        status: "available",
        coverGradient: "from-rose-700 via-amber-800 to-midnight-900",
        icon: "book-heart",
        isbn: "978-2842612894",
        pages: 168,
        summary: "Chef-d'œuvre de la littérature africaine francophone où Ramatoulaye confie à son amie d'enfance ses joies, ses douleurs et sa vision de la condition féminine."
    },
    {
        id: 8,
        title: "Architecture des Systèmes Modernes",
        author: "Martin Kleppmann",
        category: "Informatique",
        year: 2017,
        status: "available",
        coverGradient: "from-cyan-700 via-blue-900 to-midnight-950",
        icon: "cpu",
        isbn: "978-1449373320",
        pages: 616,
        summary: "Plongée au cœur des bases de données distribuées, du traitement de flux en temps réel et des architectures scalables et résilientes."
    },
    {
        id: 9,
        title: "L'Art de la Guerre",
        author: "Sun Tzu",
        category: "Histoire",
        year: 1972,
        status: "borrowed",
        coverGradient: "from-red-800 via-stone-800 to-midnight-950",
        icon: "compass",
        isbn: "978-2081246263",
        pages: 192,
        summary: "Traité de stratégie militaire chinois millénaire dont les enseignements sur l'anticipation, l'adaptabilité et la psychologie restent d'une actualité saisissante."
    },
    {
        id: 10,
        title: "Pouvoir Illimité & Focus",
        author: "Cal Newport",
        category: "Développement personnel",
        year: 2016,
        status: "available",
        coverGradient: "from-teal-700 via-emerald-900 to-midnight-950",
        icon: "target",
        isbn: "978-2226393791",
        pages: 336,
        summary: "Apprenez à cultiver la concentration profonde (Deep Work) dans un monde saturé de distractions numériques pour produire un travail de haute valeur."
    }
];

// État applicatif (filtres & liste des emprunts de l'utilisateur)
let currentCategory = "Tous";
let currentSearchQuery = "";
let currentStatusFilter = "all";
// On pré-remplit les emprunts avec les livres initialement empruntés pour démonstration
let userBorrowedIds = books.filter(b => b.status === "borrowed").map(b => b.id);

// --- 2. INITIALISATION AU CHARGEMENT ---
document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    updateStats();
    renderLoansDrawer();
    lucide.createIcons();
});

// --- 3. RENDU DU CATALOGUE ---
function renderBooks() {
    const grid = document.getElementById("books-grid");
    const emptyState = document.getElementById("empty-catalog-state");

    // Filtrage combiné (Catégorie + Recherche texte + Statut)
    const filteredBooks = books.filter(book => {
        const matchCategory = currentCategory === "Tous" || book.category === currentCategory;
        const query = currentSearchQuery.toLowerCase().trim();
        const matchSearch = !query ||
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query);
        const matchStatus = currentStatusFilter === "all" || book.status === currentStatusFilter;

        return matchCategory && matchSearch && matchStatus;
    });

    if (filteredBooks.length === 0) {
        grid.innerHTML = "";
        emptyState.classList.remove("hidden");
        lucide.createIcons();
        return;
    }

    emptyState.classList.add("hidden");
    grid.innerHTML = filteredBooks.map(book => {
        const isAvailable = book.status === "available";
        return `
        <article class="group bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <!-- Couverture stylisée du livre -->
            <div onclick="openBookModal(${book.id})" class="cursor-pointer relative h-52 bg-gradient-to-br ${book.coverGradient} p-6 flex flex-col justify-between text-white overflow-hidden">
                <!-- Motif reliure -->
                <div class="absolute left-0 top-0 bottom-0 w-3 bg-black/25"></div>
                <div class="absolute -right-6 -bottom-6 opacity-15 group-hover:scale-110 transition-transform duration-500">
                    <i data-lucide="${book.icon}" class="w-32 h-32"></i>
                </div>

                <div class="flex items-center justify-between gap-2 relative z-10">
                    <span class="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-xs text-[11px] font-semibold tracking-wide">
                        ${book.category}
                    </span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-amber-400 text-midnight-950'}">
                        <span class="w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-white' : 'bg-midnight-950'}"></span>
                        ${isAvailable ? 'Disponible' : 'Emprunté'}
                    </span>
                </div>

                <div class="relative z-10">
                    <p class="text-xs text-white/75 font-medium">${book.year}</p>
                    <h3 class="font-serif text-xl font-bold leading-snug line-clamp-2 mt-0.5 group-hover:text-amber-300 transition-colors">
                        ${book.title}
                    </h3>
                </div>
            </div>

            <!-- Corps de la carte -->
            <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <p class="text-xs font-semibold text-amber-700 mb-2 flex items-center gap-1.5">
                        <i data-lucide="user" class="w-3.5 h-3.5"></i>
                        <span>${book.author}</span>
                    </p>
                    <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        ${book.summary}
                    </p>
                </div>

                <!-- Actions -->
                <div class="pt-4 mt-4 border-t border-cream-200 flex items-center gap-2">
                    <button onclick="openBookModal(${book.id})" class="flex-1 py-2.5 px-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-midnight-900 font-semibold text-xs transition-colors">
                        Détails
                    </button>
                    ${isAvailable ? `
                        <button onclick="borrowBook(${book.id})" class="flex-1 py-2.5 px-3 rounded-xl bg-midnight-900 hover:bg-midnight-800 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                            <i data-lucide="bookmark-plus" class="w-3.5 h-3.5"></i>
                            <span>Emprunter</span>
                        </button>
                    ` : `
                        <button onclick="returnBook(${book.id})" class="flex-1 py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                            <span>Restituer</span>
                        </button>
                    `}
                </div>
            </div>
        </article>
        `;
    }).join("");

    lucide.createIcons();
}

// --- 4. FILTRAGE & RECHERCHE ---
function setCategory(category) {
    currentCategory = category;
    // Mise à jour visuelle des boutons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        if (btn.dataset.cat === category) {
            btn.className = "filter-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-midnight-900 text-amber-400 shadow-xs";
        } else {
            btn.className = "filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-cream-100 text-midnight-800 hover:bg-cream-200";
        }
    });
    renderBooks();
}

function handleSearchInput(value) {
    currentSearchQuery = value;
    renderBooks();
}

function handleStatusFilter(value) {
    currentStatusFilter = value;
    renderBooks();
}

function triggerHeroSearch() {
    const heroVal = document.getElementById("hero-search-input").value;
    const catalogInput = document.getElementById("catalog-search");
    catalogInput.value = heroVal;
    currentSearchQuery = heroVal;
    renderBooks();
    document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
    currentCategory = "Tous";
    currentSearchQuery = "";
    currentStatusFilter = "all";
    document.getElementById("catalog-search").value = "";
    document.getElementById("hero-search-input").value = "";
    document.getElementById("status-filter").value = "all";
    setCategory("Tous");
}

// --- 5. GESTION DES EMPRUNTS & RETOURS ---
function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.status !== "available") return;

    book.status = "borrowed";
    if (!userBorrowedIds.includes(bookId)) {
        userBorrowedIds.push(bookId);
    }

    refreshUI();
    showToast(`Vous avez emprunté « ${book.title} ». Bonne lecture !`, "success");
}

function returnBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book || book.status !== "borrowed") return;

    book.status = "available";
    userBorrowedIds = userBorrowedIds.filter(id => id !== bookId);

    refreshUI();
    showToast(`Merci ! « ${book.title} » a bien été restitué.`, "info");
}

function refreshUI() {
    renderBooks();
    updateStats();
    renderLoansDrawer();
}

function updateStats() {
    const total = books.length;
    const available = books.filter(b => b.status === "available").length;
    const borrowed = total - available;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-available").textContent = available;
    document.getElementById("stat-borrowed").textContent = borrowed;
    document.getElementById("loans-badge").textContent = userBorrowedIds.length;
}

function renderLoansDrawer() {
    const container = document.getElementById("loans-list");
    const borrowedBooks = books.filter(b => userBorrowedIds.includes(b.id));

    if (borrowedBooks.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="w-14 h-14 rounded-2xl bg-cream-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <i data-lucide="book-open" class="w-7 h-7"></i>
                </div>
                <p class="font-serif font-bold text-midnight-900">Aucun emprunt actif</p>
                <p class="text-xs text-slate-500 mt-1">Parcourez le catalogue pour réserver votre prochain livre.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = borrowedBooks.map(book => `
        <div class="p-4 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-14 rounded-lg bg-gradient-to-br ${book.coverGradient} text-white flex items-center justify-center shrink-0 shadow-xs">
                    <i data-lucide="${book.icon}" class="w-5 h-5"></i>
                </div>
                <div class="min-w-0">
                    <h4 class="font-bold text-sm text-midnight-900 truncate">${book.title}</h4>
                    <p class="text-xs text-slate-500 truncate">${book.author}</p>
                    <span class="inline-block mt-1 text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Retour sous 21 jours
                    </span>
                </div>
            </div>
            <button onclick="returnBook(${book.id})" class="px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-midnight-800 hover:text-rose-700 border border-cream-200 text-xs font-semibold transition-colors shrink-0">
                Retourner
            </button>
        </div>
    `).join("");

    lucide.createIcons();
}

// --- 6. MODALE DÉTAILS D'UN LIVRE ---
function openBookModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const isAvailable = book.status === "available";
    const modal = document.getElementById("book-detail-modal");
    const content = document.getElementById("modal-book-content");

    content.innerHTML = `
        <div class="grid sm:grid-cols-12">
            <!-- Visuel gauche -->
            <div class="sm:col-span-5 bg-gradient-to-br ${book.coverGradient} p-8 text-white flex flex-col justify-between min-h-[220px] relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 opacity-15">
                    <i data-lucide="${book.icon}" class="w-40 h-40"></i>
                </div>
                <span class="inline-block self-start px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
                    ${book.category}
                </span>
                <div class="relative z-10 mt-6">
                    <p class="text-xs text-white/80">Édition ${book.year}</p>
                    <h3 class="font-serif text-2xl font-bold leading-snug mt-1">${book.title}</h3>
                    <p class="text-sm text-amber-300 font-medium mt-2">${book.author}</p>
                </div>
            </div>

            <!-- Informations droite -->
            <div class="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
                            ${isAvailable ? '● Disponible en rayon' : '● Actuellement emprunté'}
                        </span>
                        <button onclick="closeBookModal()" class="p-1.5 rounded-xl text-slate-400 hover:bg-cream-100 hover:text-midnight-900">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Résumé de l'ouvrage</h4>
                    <p class="text-sm text-slate-700 leading-relaxed mb-6">
                        ${book.summary}
                    </p>

                    <div class="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-cream-50 border border-cream-200 text-xs mb-6">
                        <div>
                            <span class="text-slate-400 block">ISBN</span>
                            <span class="font-semibold text-midnight-900">${book.isbn || '978-2070413119'}</span>
                        </div>
                        <div>
                            <span class="text-slate-400 block">Pagination</span>
                            <span class="font-semibold text-midnight-900">${book.pages || 310} pages</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 pt-2">
                    <button onclick="closeBookModal()" class="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-midnight-800 font-semibold text-sm">
                        Fermer
                    </button>
                    ${isAvailable ? `
                        <button onclick="borrowBook(${book.id}); closeBookModal();" class="px-5 py-2.5 rounded-xl bg-midnight-900 hover:bg-midnight-800 text-amber-400 font-bold text-sm shadow flex items-center gap-2">
                            <i data-lucide="bookmark-plus" class="w-4 h-4"></i>
                            <span>Emprunter cet ouvrage</span>
                        </button>
                    ` : `
                        <button onclick="returnBook(${book.id}); closeBookModal();" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-midnight-950 font-bold text-sm shadow flex items-center gap-2">
                            <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                            <span>Enregistrer le retour</span>
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    lucide.createIcons();
}

function closeBookModal() {
    const modal = document.getElementById("book-detail-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// --- 7. MODE GESTIONNAIRE : AJOUT DE LIVRE ---
function openAddBookModal() {
    const modal = document.getElementById("add-book-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeAddBookModal() {
    const modal = document.getElementById("add-book-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function handleAddBookSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("new-book-title").value.trim();
    const author = document.getElementById("new-book-author").value.trim();
    const year = parseInt(document.getElementById("new-book-year").value, 10);
    const category = document.getElementById("new-book-category").value;
    const summary = document.getElementById("new-book-summary").value.trim();

    if (!title || !author || !summary) return;

    const gradients = [
        "from-indigo-700 via-blue-900 to-midnight-950",
        "from-amber-600 via-orange-800 to-midnight-900",
        "from-emerald-700 via-teal-900 to-midnight-950",
        "from-rose-700 via-purple-900 to-midnight-950"
    ];
    const randomGradient = gradients[books.length % gradients.length];

    const newBook = {
        id: Date.now(),
        title,
        author,
        category,
        year: year || 2026,
        status: "available",
        coverGradient: randomGradient,
        icon: "book-open",
        isbn: "978-2" + Math.floor(100000000 + Math.random() * 900000000),
        pages: Math.floor(200 + Math.random() * 350),
        summary
    };

    books.unshift(newBook);
    document.getElementById("add-book-form").reset();
    closeAddBookModal();
    refreshUI();
    showToast(`Ouvrage « ${title} » ajouté au catalogue avec succès !`, "success");
}

// --- 8. FORMULAIRE D'ADHÉSION & CONTACT ---
function handleMembershipSubmit(event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!fullName || !email || !message) {
        showToast("Veuillez remplir tous les champs obligatoires (*).", "error");
        return;
    }

    document.getElementById("membership-form").reset();
    showToast(`Merci ${fullName} ! Votre demande a été transmise à la Bibliothèque Horizon.`, "success");
}

// --- 9. NAVIGATION MOBILE, TIROIR & TOASTS ---
function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
}

function toggleLoansDrawer() {
    const drawer = document.getElementById("loans-drawer");
    const overlay = document.getElementById("loans-drawer-overlay");
    const isClosed = drawer.classList.contains("translate-x-full");

    if (isClosed) {
        drawer.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
    } else {
        drawer.classList.add("translate-x-full");
        overlay.classList.add("hidden");
    }
}

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");

    const colors = {
        success: "bg-midnight-900 text-white border-amber-500",
        info: "bg-midnight-800 text-cream-50 border-blue-400",
        error: "bg-rose-900 text-white border-rose-400"
    };

    const iconName = type === "error" ? "alert-circle" : "check-circle-2";

    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-2xl border-l-4 shadow-2xl text-sm font-medium max-w-sm transition-all duration-300 ${colors[type] || colors.success}`;
    toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-5 h-5 text-amber-400 shrink-0"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}