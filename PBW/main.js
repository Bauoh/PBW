document.addEventListener('DOMContentLoaded', function () {
    // 1. Buat elemen wadah (container/div) dan tabel untuk menampilkan hasil
    const container = document.createElement('div');
    container.style.marginTop = '20px';
    container.style.padding = '15px';
    container.style.border = '1px solid #ccc';
    container.style.backgroundColor = '#f9f9f9';
    container.style.fontFamily = 'Arial, sans-serif';

    const title = document.createElement('h3');
    title.innerText = 'Hasil Data Formulir';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
        <thead>
            <tr style="background-color: #3498db; color: white;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nama Field (name)</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nilai (Value)</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    container.appendChild(table);

    // Masukkan container ke bawah form di dalam dokumen
    const form = document.querySelector('form');
    form.parentNode.insertBefore(container, form.nextSibling);

    // 2. Event listener ketika form disubmit
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah form reload halaman agar data bisa langsung dilihat

        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ''; // Bersihkan data tabel sebelumnya

        // Ambil semua elemen input, select, dan textarea di dalam form
        const elements = form.querySelectorAll('input, select, textarea');

        // Untuk menangani checkbox ganda (hobi[]) agar tidak tercatat duplikat kuncinya
        const processedCheckboxes = new Set();

        elements.forEach(function (el) {
            if (!el.name) abaikan(); // Lewati jika tidak ada atribut name

            let name = el.name;
            let value = '';

            // Tangani berdasarkan tipe elemen
            if (el.type === 'radio') {
                // Ambil nilai dari radio button yang sedang dipilih
                const checkedRadio = form.querySelector(`input[name="${name}"]:checked`);
                value = checkedRadio ? checkedRadio.value : '(Tidak dipilih)';
                
                // Hindari duplikasi baris untuk radio dengan nama yang sama
                if (tbody.querySelector(`tr[data-name="${name}"]`)) return;
            } 
            else if (el.type === 'checkbox') {
                // Hindari duplikasi baris untuk checkbox array (misal: hobi[])
                if (processedCheckboxes.has(name)) return;
                processedCheckboxes.add(name);

                // Ambil semua checkbox yang dicentang dengan nama tersebut
                const checkedBoxes = form.querySelectorAll(`input[name="${name}"]:checked`);
                const values = Array.from(checkedBoxes).map(cb => cb.value);
                value = values.length > 0 ? values.join(', ') : '(Tidak ada)';
            } 
            else if (el.type === 'file') {
                // Ambil nama file yang diunggah
                value = el.files.length > 0 ? el.files[0].name : '(Tidak ada file)';
            } 
            else {
                // Untuk text, email, password, select, textarea, date, color, range, dll.
                value = el.value !== '' ? el.value : '(Kosong)';
            }

            // Tambahkan baris baru ke dalam tabel
            const row = document.createElement('tr');
            row.setAttribute('data-name', name);
            row.innerHTML = `
                <td style="border: 1px solid #ddd; padding: 8px;"><strong>${name}</strong></td>
                <td style="border: 1px solid #ddd; padding: 8px;">${escapeHtml(value)}</td>
            `;
            tbody.appendChild(row);
        });
    });

    // Fungsi bantu untuk keamanan teks (mencegah XSS sederhana)
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});