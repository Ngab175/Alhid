# A Tiny World for You 🌷

Website kejutan kecil dengan HTML, CSS, dan JavaScript murni.

## Menjalankan di komputer
1. Ekstrak folder proyek.
2. Buka folder `a-tiny-world-for-you`.
3. Klik dua kali `index.html`, atau jalankan dengan ekstensi Live Server di VS Code.

## Isi website
- Welcome page dengan amplop animasi.
- Surat kecil.
- Mood checker dengan respons berbeda.
- Taman bunga interaktif.
- Mini-game menangkap 10 hati.
- Generator pujian acak.
- Galeri polaroid placeholder.
- Kotak kejutan dan pesan penutup.
- Musik latar sederhana yang bisa dinyalakan atau dimatikan.

## Personalisasi
- Ubah nama sapaan, surat, dan pesan penutup di `index.html`.
- Ubah daftar pesan mood dan pujian di `js/script.js`.
- Ganti emoji pada galeri dengan foto milikmu. Untuk memakai foto, letakkan file di `assets/images/`, lalu ganti elemen `.photo-placeholder` di `index.html` dengan tag `<img src="assets/images/nama-foto.jpg" alt="Deskripsi foto">`.
- Jangan masukkan foto atau kenangan pribadi tanpa izin orang yang ada di foto.

## Deploy ke GitHub Pages
1. Buat repository baru di GitHub.
2. Unggah semua isi folder proyek, termasuk `index.html`, `css`, `js`, dan `assets`.
3. Buka Settings → Pages.
4. Pada Build and deployment, pilih Deploy from a branch.
5. Pilih branch `main` dan folder `/ (root)`, lalu Save.
6. Tunggu proses selesai. GitHub akan menampilkan alamat website.

Tidak membutuhkan backend atau API eksternal. Google Fonts membutuhkan koneksi internet; jika offline, browser memakai font fallback.
