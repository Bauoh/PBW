document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formPendaftaran");
    const resultContainer = document.getElementById("resultContainer");

    form.addEventListener("submit", function (event) {
        // Mencegah form di-submit secara default/refresh halaman
        event.preventDefault();

        // 1. Ambil nilai dari input HTML
        const nama = document.getElementById("nama").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const tglLahir = document.getElementById("tglLahir").value;
        const jadwal = document.getElementById("jadwal").value;
        const alamat = document.getElementById("alamat").value;

        // 2. Masukkan data ke dalam elemen tabel hasil
        document.getElementById("resNama").innerText = nama;
        document.getElementById("resGender").innerText = gender;
        document.getElementById("resTglLahir").innerText = tglLahir;
        document.getElementById("resJadwal").innerText = jadwal;
        document.getElementById("resAlamat").innerText = alamat;

        // 3. Tampilkan kontainer tabel hasil
        resultContainer.style.display = "block";

        // (Opsional) Alert konfirmasi
        alert("Data formulir berhasil disimpan!");
    });
});